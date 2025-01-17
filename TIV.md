# Compile

https://github.com/radare/tiv

```sh
make

brew install libjpeg
brew install jpeg
gcc stiv-jpeg.c -o stiv-jpeg -I/opt/homebrew/opt/jpeg/include -L/opt/homebrew/opt/jpeg/lib -ljpeg


./stiv-jpeg img/Constellation_1.jpeg 50 256
```