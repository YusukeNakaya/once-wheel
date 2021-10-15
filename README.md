# once-wheel

Detect a wheel event only once.

## Installation

### npm

```
$ npm install once-wheel
```

### unpkg

```html
<script src="https://unpkg.com/once-wheel" type="text/javascript"></script>
```

## Usage

```javascript
onceWheel(scrollDownHandler, scrollUpHandler)

function scrollDownHandler() {
  console.log('down!')
}

function scrollUpHandler() {
  console.log('Up!')
}
```

## License

MIT
