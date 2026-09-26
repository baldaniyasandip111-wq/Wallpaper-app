package com.wallpaper.app.live

import android.graphics.*
import android.service.wallpaper.WallpaperService
import kotlin.math.cos
import kotlin.math.sin

class LiveWallpaperService : WallpaperService() {
    override fun onCreateEngine(): Engine = LiveEngine()

    inner class LiveEngine : Engine() {
        private var visible = false
        private var saver = true
        private var thread: Thread? = null
        @Volatile private var running = false
        private var phase = 0f
        private var sceneTime = 0f

        override fun onVisibilityChanged(visible: Boolean) {
            this.visible = visible
            if (visible) startRendering() else stopRendering()
        }

        override fun onSurfaceCreated(holder: android.view.SurfaceHolder) {
            super.onSurfaceCreated(holder)
            if (visible) startRendering()
        }

        override fun onSurfaceDestroyed(holder: android.view.SurfaceHolder) {
            stopRendering()
            super.onSurfaceDestroyed(holder)
        }

        private fun startRendering() {
            if (running) return
            running = true
            thread = Thread {
                val frameMs = if (saver) 67L else 33L
                while (running && visible) {
                    val started = System.nanoTime()
                    drawFrame()
                    sceneTime += frameMs / 1000f
                    val elapsedMs = (System.nanoTime() - started) / 1_000_000L
                    Thread.sleep((frameMs - elapsedMs).coerceAtLeast(8L))
                }
            }.also { it.start() }
        }

        private fun stopRendering() {
            running = false
            thread?.interrupt()
            thread = null
        }

        private fun drawFrame() {
            val canvas = try {
                surfaceHolder.lockCanvas()
            } catch (_: Exception) {
                null
            } ?: return

            try {
                val w = canvas.width.toFloat()
                val h = canvas.height.toFloat()
                phase = (phase + if (saver) 0.010f else 0.020f) % (Math.PI.toFloat() * 2f)
                val scene = ((sceneTime / 20f).toInt() % 3)

                canvas.drawColor(Color.rgb(4, 6, 12))

                when (scene) {
                    0 -> drawAurora(canvas, w, h)
                    1 -> drawNebula(canvas, w, h)
                    else -> drawOcean(canvas, w, h)
                }

                drawSoftVignette(canvas, w, h)
            } finally {
                surfaceHolder.unlockCanvasAndPost(canvas)
            }
        }

        private fun drawAurora(canvas: Canvas, w: Float, h: Float) {
            val cx = w * (0.50f + 0.18f * sin(phase))
            val cy = h * (0.38f + 0.10f * cos(phase * 0.7f))
            val radius = h * 0.82f
            val shader = RadialGradient(
                cx, cy, radius,
                intArrayOf(
                    Color.rgb(74, 222, 128),
                    Color.rgb(34, 211, 238),
                    Color.rgb(59, 130, 246),
                    Color.rgb(4, 6, 12)
                ),
                floatArrayOf(0f, 0.30f, 0.62f, 1f),
                Shader.TileMode.CLAMP
            )
            canvas.drawRect(0f, 0f, w, h, Paint(Paint.ANTI_ALIAS_FLAG).apply { this.shader = shader })

            val wave = Paint(Paint.ANTI_ALIAS_FLAG).apply {
                style = Paint.Style.STROKE
                strokeWidth = h * 0.012f
                alpha = 150
            }
            val path = Path()
            path.moveTo(0f, h * 0.54f)
            for (x in 0..w.toInt() step 18) {
                val xf = x.toFloat()
                val y = h * 0.54f + sin(xf / w * 8f + phase) * h * 0.08f
                path.lineTo(xf, y)
            }
            canvas.drawPath(path, wave)
        }

        private fun drawNebula(canvas: Canvas, w: Float, h: Float) {
            val base = Paint(Paint.ANTI_ALIAS_FLAG).apply {
                shader = LinearGradient(
                    0f, 0f, w, h,
                    Color.rgb(28, 16, 58),
                    Color.rgb(5, 8, 24),
                    Shader.TileMode.CLAMP
                )
            }
            canvas.drawRect(0f, 0f, w, h, base)

            val blobs = arrayOf(
                floatArrayOf(0.28f, 0.35f, 0.42f),
                floatArrayOf(0.72f, 0.58f, 0.50f),
                floatArrayOf(0.48f, 0.72f, 0.34f)
            )
            blobs.forEachIndexed { index, blob ->
                val drift = sin(phase * (0.65f + index * 0.16f)) * w * 0.08f
                val shader = RadialGradient(
                    w * blob[0] + drift,
                    h * blob[1],
                    h * blob[2],
                    intArrayOf(
                        if (index == 1) Color.rgb(244, 114, 182) else Color.rgb(129, 140, 248),
                        Color.rgb(59, 130, 246),
                        Color.TRANSPARENT
                    ),
                    floatArrayOf(0f, 0.45f, 1f),
                    Shader.TileMode.CLAMP
                )
                canvas.drawRect(0f, 0f, w, h, Paint(Paint.ANTI_ALIAS_FLAG).apply {
                    this.shader = shader
                    alpha = 190
                })
            }

            val stars = Paint(Paint.ANTI_ALIAS_FLAG)
            for (i in 0 until 24) {
                val x = ((i * 97) % 100) / 100f * w
                val y = ((i * 53) % 100) / 100f * h
                val twinkle = 90 + (sin(phase * 1.4f + i) * 70).toInt()
                stars.alpha = twinkle.coerceIn(25, 170)
                canvas.drawCircle(x, y, if (saver) 1.2f else 1.8f, stars)
            }
        }

        private fun drawOcean(canvas: Canvas, w: Float, h: Float) {
            val shader = LinearGradient(
                0f, 0f, 0f, h,
                Color.rgb(8, 47, 73),
                Color.rgb(2, 12, 24),
                Shader.TileMode.CLAMP
            )
            canvas.drawRect(0f, 0f, w, h, Paint(Paint.ANTI_ALIAS_FLAG).apply { this.shader = shader })

            val wave = Paint(Paint.ANTI_ALIAS_FLAG).apply {
                style = Paint.Style.STROKE
                strokeWidth = h * 0.009f
                alpha = 135
            }
            for (row in 0..4) {
                val path = Path()
                val yBase = h * (0.50f + row * 0.09f)
                path.moveTo(0f, yBase)
                for (x in 0..w.toInt() step 16) {
                    val xf = x.toFloat()
                    val y = yBase + sin(xf / w * 9f + phase * (1f + row * 0.08f)) * h * 0.035f
                    path.lineTo(xf, y)
                }
                canvas.drawPath(path, wave)
            }
        }

        private fun drawSoftVignette(canvas: Canvas, w: Float, h: Float) {
            val vignette = RadialGradient(
                w / 2f, h / 2f, h * 0.78f,
                Color.TRANSPARENT,
                Color.argb(105, 0, 0, 0),
                Shader.TileMode.CLAMP
            )
            canvas.drawRect(
                0f, 0f, w, h,
                Paint(Paint.ANTI_ALIAS_FLAG).apply { shader = vignette }
            )
        }
    }
}
