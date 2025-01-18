# Compile

https://github.com/radare/tiv

```sh
make

export LDFLAGS="-L/usr/local/opt/jpeg/lib"
export CPPFLAGS="-I/usr/local/opt/jpeg/include"
export PKG_CONFIG_PATH="/usr/local/opt/jpeg/lib/pkgconfig"
gcc stiv-jpeg.c -o stiv-jpeg -I/usr/local/opt/jpeg/include -L/usr/local/opt/jpeg/lib -ljpeg

./stiv-jpeg img/Constellation_1.jpeg 50 256


```