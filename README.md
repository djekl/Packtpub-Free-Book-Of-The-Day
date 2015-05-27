# Packtpub-Free-Book-Of-The-Day
Simply logs into Packtpub and adds the free book to your account

---

How to use
---
Simply either run the following command
```
casperjs --ignore-ssl-errors=true --ssl-protocol=any --cookies-file=/tmp/packtpub_free_book_cookies.txt packtpub_free_book.js
```

or even add it to your crontab, or other shedual task manager

---

##Note
To use this you need to edit in your username/password into the javascript file (lines #1 and #2)
