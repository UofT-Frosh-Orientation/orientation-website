KONAMI CODE AUDIO
=================

Drop your sound file in THIS folder and name it exactly:

    audio.mp3

It will be served at the URL "/audio.mp3" and plays automatically when
someone enters the Konami code (Up Up Down Down Left Right Left Right B A)
on the "Coming Soon" page.

Notes:
- .mp3 is expected by the code. To use a different format (e.g. .ogg/.wav),
  change the path in ComingSoon.jsx (search for `new Audio('/audio.mp3')`).
- If the file is missing, nothing breaks — the code just plays no sound.
- Browsers block audio until the user has interacted with the page; since the
  egg requires key presses, that condition is already met.

You can delete this README once the audio is in place.
