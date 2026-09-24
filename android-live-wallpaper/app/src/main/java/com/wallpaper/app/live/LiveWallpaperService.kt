package com.wallpaper.app.live

import android.graphics.*
import android.service.wallpaper.WallpaperService
import kotlin.math.sin

class LiveWallpaperService : WallpaperService() {
    override fun onCreateEngine(): Engine = LiveEngine()

    inner class LiveEngine : Engine() {
        private var visible = false
        private var saver = true
        private var thread: Thread? = null
        private var running = false
        private var phase = 0f

        override fun onVisibilityChanged(visible: Boolean) {
            this.visible = visible
            if (visible) startRendering() else stopRendering()
        }

        override fun onSurfaceCreated(holder: android.view.SurfaceHolder) {
            super.onSurfaceCreated(holder)
            startRendering()
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
                    drawFrame()
                    Thread.sleep(frameMs)
                }
            }.also { it.start() }
        }

        private fun stopRendering() {
            running = false
            thread = null
        }

        private fun drawFrame() {
            val canvas = try { surfaceHolder.lockCanvas() } catch (_: Exception) { null } ?: return
            try {
                val w = canvas.width.toFloat()
                val h = canvas.height.toFloat()
                phase += if (saver) 0.008f else 0.016f
                canvas.drawColor(Color.rgb(7, 9, 13))
                val cx = w * (0.5f + 0.22f * sin(phase))
                val cy = h * (0.45f + 0.16f * sin(phase * 0.73f))
                val radius = h * 0.72f
                val shader = RadialGradient(
                    cx, cy, radius,
                    intArrayOf(Color.rgb(244,114,182), Color.rgb(96,165,250), Color.rgb(7,9,13)),
                    floatArrayOf(0f, 0.45f, 1f),
                    Shader.TileMode.CLAMP
                )
                val paint = Paint(Paint.ANTI_ALIAS_FLAG).apply { this.shader = shader }
                canvas.drawRect(0f, 0f, w, h, paint)
            } finally {
                surfaceHolder.unlockCanvasAndPost(canvas)
            }
        }
    }
}
