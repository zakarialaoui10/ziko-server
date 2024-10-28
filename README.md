<!-- use template / deprecated--> 
# ziko-lottie   
Lottie player element for zikojs
# Install
```bash 
 npm i ziko-lottie
```
# Usage
 ## Node 
 ```js
  // main.js
  import {App} from "ziko"
  import ZikoLottie from "ziko-lottie";
  const Lottie=ZikoLottie("https://assets1.lottiefiles.com/private_files/lf30_q2okh8lh.json").size("220px","200px")
  Lottie.onPtrEnter(e=>e.target.pause())
  Lottie.onPtrLeave(e=>e.target.play())
  App(
    Lottie
  ).vertical(0,0)
 ```
## Browser
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>zikojs</title>
</head>
<body>
    <script src="https://cdn.jsdelivr.net/npm/ziko@latest/dist/ziko.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/ziko-lottie@latest/dist/ziko-lottie.js"></script>
    <script>
    const Lottie=ZikoLottie("https://assets1.lottiefiles.com/private_files/lf30_q2okh8lh.json")
            .size("220px","200px")
            .onPtrEnter(e=>e.target.play())
            .onPtrLeave(e=>e.target.pause())
    Ziko.App(
     Lottie
   ).vertical(0,0).style({
     width:"90vw",
     height:"90vh",
     margin:"auto",
   })
    </script>
</body>
</html>
```

