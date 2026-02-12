# 💌 Love Story Project

A beautiful, interactive, and romantic web experience designed for a special someone.

## 🚀 How to Run

1.  **Open the Folder**: precise location is `c:\Users\DELL\Downloads\men3em`.
2.  **Launch**: Double-click on `index.html` to open it in your web browser (Chrome, Edge, or Firefox recommended).
    *   *Note*: Interactions like playing audio might require a user gesture (clicking the envelope) to work due to browser autoplay policies. The code handles this!

## 📸 Customization (Adding Your Photos)

Currently, the project uses cute emojis as placeholders for memories. To add your own photos:

1.  **Gather Photos**: Select roughly 6 of your favorite photos.
2.  **Rename & Place**:
    *   Rename them to: `img0.jpg`, `img1.jpeg`, `img2.jpeg`, `img3.jpeg`, `img4.jpeg`, `img5.jpeg`. (Note the extensions!)
    *   Place them in the same folder as `index.html`.
3.  **Update Code**:
    *   Open `index.html` in a text editor (like Notepad).
    *   Search for "Screen 8: Memories Swipe".
    *   **Uncomment** the image lines.
        *   Change: `<!-- <img src="img0.jpg" alt="Memory 1"> -->`
        *   To: `<img src="img0.jpg" alt="Memory 1">`
    *   Optionally, remove the `<div>` with the emoji above it if you want only the photo.

## 🎵 Media Files

The audio and video files are located in the `media/` folder.
- `music.mp4`: Background music.
- `final_music.mp4`: Music for the cinematic ending.
- `reply_me_love.mp4` & `love_me.mp4`: Video stickers.

## ✨ Features

- **Interactive Envelope**: Click to open your letter.
- **Love Timeline**: Scroll through your key dates.
- **Heart Meter**: Drag the heart to fill it up with love!
- **Swipe Gallery**: Touch-enabled photo gallery.
- **Cinematic Ending**: A beautiful floating hearts animation.


## 🚀 Deploying to GitHub

I have included a script to make deployment easy!

1.  **Right-click** on `deploy.ps1`.
2.  Select **"Run with PowerShell"**.
3.  Follow the on-screen instructions.

Once the script finishes:
1.  Go to your repository settings on GitHub: **Settings > Pages**.
2.  Under **Source**, select **Date from a branch**.
3.  Select **main** branch and **/ (root)** folder.
4.  Click **Save**.
5.  Your live link will appear at the top of the page!

