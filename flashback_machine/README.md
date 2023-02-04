# Flashback Machine

This is a fun little UI that upon click presents a message randomly picked from the entire chat history between me and Anna accompanied by some funny faces and fancy colors.

The chat history can be obtained using the "Tdesktop" telegram app. (See [here](https://www.reddit.com/r/Telegram/comments/lzmqhy/comment/gq34ai8/?utm_source=share&utm_medium=web2x&context=3).) It produces a single JSON file with all the messages.

Since I don't want to share our entire chat history with the World the data are encrypted using password-derived key and only then checked into git. The decryption happens client side. This allows the page to be hosted purely statically.

The export produced by Telegram can be encrypted using `encrypt_export.js` like so:
```
node encrypt_export.js <path to the exported JSON file> <output file> <password to derive the key from>
```

Note that the page expect the encrypted file to be put into this directory as `messages.json.encrypted`. Also note that the encryption pipeline includes a compression step that happens *before* encryption. Compressing the encrypted data (eg. automatically by the server) would have very negligible (if any) effect. Lastly, note that the `package.json` is there only to satisfy node to be able to use ESModules in the encrypt utility script.
