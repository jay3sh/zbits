
class Kolor {

  /**
   * @example
   * // Following ways are supported to construct Kolor object
   * new Kolor(); // Creates Black color with alpha = 1.0
   * new Kolor(r,g,b,a); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
   * new Kolor([r,g,b,a]); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
   * new Kolor({r,g,b,a}); // each of r,g,b,a should be in 0.0 to 1.0, otherwise undefined behavior
   * new Kolor({h,s,v,a}); // each of h,s,v,a should be in 0.0 to 1.0, otherwise undefined behavior
   */
  constructor() {
    if(arguments.length === 0) {
      this.rgb = [0,0,0];
      this.a = 1.0;
    } else {
      if(Array.isArray(arguments[0])) { // Assume - new Kolor([r,g,b,a])
        let c = arguments[0];
        this.rgb = [c[0],c[1],c[2]];
        if(c[3] === undefined || c[3] === null) {
          this.a = 1.0;
        } else {
          this.a = c[3];
        }
      } else if(arguments.length > 1) { // Assume - new Kolor(r,g,b,a)
        this.rgb = [arguments[0], arguments[1], arguments[2]];
        if(arguments[3] === undefined || arguments[3] === null) {
          this.a = 1.0;
        } else {
          this.a = arguments[3];
        }
      } else {
        let c = arguments[0];
        if(c instanceof Kolor) {
          this.rgb = c.RGB();
          this.a = c.a;
        } else if(c.hasOwnProperty('r')) {
          // Assume - new Kolor({r:<number>,g:<number>,b:<number>,a:<number>})
          this.rgb = [c.r,c.g,c.b];
          if(c.a === undefined || c.a === null) {
            this.a = 1.0;
          } else {
            this.a = c.a;
          }
        } else if(c.hasOwnProperty('h')) {
          // Assume - new Kolor({h:<number>,s:<number>,v:<number>,a:<number>})
          this.hsv = [c.h,c.s,c.v];
          this.a = c.a;
          if(c.a === undefined || c.a === null) {
            this.a = 1.0;
          } else {
            this.a = c.a;
          }
        }
      }
    }
  }

  /**
   * Returns RGB value
   * @returns {Number[]} Each of RGB values is in range 0.0 to 1.0
   */
  RGB() {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    return this.rgb.slice();
  }

  /**
   * Returns HSV value
   * @returns {Number[]} Each of HSV values is in range 0.0 to 1.0
   */
  HSV() {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    return this.hsv.slice();
  }

  /**
   * Returns CSS string for this color value
   * @param {Number} [bytes=2] Number of bytes to use (default 2)
   * @returns {string}
   */
  toCSS(bytes=2) {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    if (this.a >= 1.0 ) return this.toCSSHex(bytes);
    let red = this.rgb[0];
    let green = this.rgb[1];
    let blue = this.rgb[2];
    let alpha = this.a;
    let max = 255;
    let components = [
      'rgba(',
      Math.max(0, Math.min(max, Math.round(red * max))), ',',
      Math.max(0, Math.min(max, Math.round(green * max))), ',',
      Math.max(0, Math.min(max, Math.round(blue * max))), ',',
      Math.max(0, Math.min(1.0, alpha)).toFixed(3),
      ')'
    ];
    return components.join('');
  }

  /**
   * Returns CSS string of format `#xxx` for this color value
   * The returned value format doesn't support alpha, hence it's ignored
   * @param {Number} [bytes=2] Number of bytes to use (default 2)
   * @returns {string}
   */
  toCSSHex(bytes=2) {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    let red = this.rgb[0];
    let green = this.rgb[1];
    let blue = this.rgb[2];
    bytes = bytes || 2;
    let max = Math.pow(16, bytes) - 1;
    let css = [
      "#",
      pad(Math.round(red*max).toString(16).toUpperCase(), bytes),
      pad(Math.round(green*max).toString(16).toUpperCase(), bytes),
      pad(Math.round(blue*max).toString(16).toUpperCase(), bytes)
    ];
    return css.join('');
  }

  /**
   * Get Alpha
   * @returns {Number}
   */
  alpha() {
    return this.a;
  }

  /**
   * Set Alpha
   * @param {!Number} a
   * @returns {Kolor} this instance
   */
  setAlpha(a) {
    this.a = a;
    return this;
  }

  /**
   * Get Hue
   * @returns {Number}
   */
  hue() {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    return this.hsv[0];
  }

  /**
   * Set Hue
   * @param {!Number} h
   * @returns {Kolor} this instance
   */
  setHue(h) {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    this.hsv[0] = h;
    this.rgb = null; // to force RGB recalculation
    return this;
  }

  /**
   * Get Saturation
   * @returns {Number}
   */
  saturation() {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    return this.hsv[1];
  }

  /**
   * Set Saturation
   * @param {!Number} s
   * @returns {Kolor} this instance
   */
  setSaturation(s) {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    this.hsv[1] = s;
    this.rgb = null; // to force RGB recalculation
    return this;
  }

  /**
   * Get Value
   * @returns {Number}
   */
  value() {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    return this.hsv[2];
  }

  /**
   * Set Value
   * @param {!Number} v
   * @returns {Kolor} this instance
   */
  setValue(v) {
    if(!this.hsv) {
      this.hsv = rgb2hsv(this.rgb);
    }
    this.hsv[2] = v;
    this.rgb = null; // to force RGB recalculation
    return this;
  }

  /**
   * Get Red
   * @returns {Number}
   */
  red() {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    return this.rgb[0];
  }

  /**
   * Set Red
   * @param {!Number} r
   * @returns {Kolor} this instance
   */
  setRed(r) {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    this.rgb[0] = r;
    this.hsv = null; // to force HSV recalculation
    return this;
  }

  /**
   * Get Green
   * @returns {Number}
   */
  green() {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    return this.rgb[1];
  }

  /**
   * Set Green
   * @param {!Number} g
   * @returns {Kolor} this instance
   */
  setGreen(g) {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    this.rgb[1] = g;
    this.hsv = null; // to force HSV recalculation
    return this;
  }

  /**
   * Get Blue
   * @returns {Number}
   */
  blue() {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    return this.rgb[2];
  }

  /**
   * Set Blue
   * @param {!Number} b
   * @returns {Kolor} this instance
   */
  setBlue(b) {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    this.rgb[2] = b;
    this.hsv = null; // to force HSV recalculation
    return this;
  }

  /**
   * Returns RGBA value
   * @returns {Number[]}
   */
  RGBA() {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    return [
      this.rgb[0],
      this.rgb[1],
      this.rgb[2],
      this.a
    ];
  }

  /**
   * Clones this instance
   * @returns {Kolor}
   */
  clone() {
    return Kolor.fromMemento(this.toMemento());
  }

  /**
   * Generate Memento
   * @returns {Object} Memento
   */
  toMemento() {
    if(!this.rgb) {
      this.rgb = hsv2rgb(this.hsv);
    }
    return [this.rgb[0], this.rgb[1], this.rgb[2], this.a];
  }

  /**
   * To String
   * @returns {string}
   */
  toString() {
    let r = this.red();
    let g = this.green();
    let b = this.blue();
    let a = this.alpha();
    return `rgba(${parseInt(255*r)},${parseInt(255*g)},${parseInt(255*b)},${a})`;
  }

  /**
   * Revive Kolor instance from memento
   * @param {!Object} m
   * @returns {Kolor}
   */
  static fromMemento(m) {
    return new Kolor(m);
  }

  /**
   * Generate random color
   * @returns {Kolor}
   */
  static random() {
    return new Kolor([
      Math.random(),
      Math.random(),
      Math.random(),
      1.0
    ]);
  }
}

/* takes a value, converts to string if need be, then pads it
 * to a minimum length.
 */
function pad(val, len) {
  val = val.toString();
  let padded = [];

  for(let i=0, j=Math.max(len-val.length, 0); i<j; i++) {
    padded.push('0');
  }

  padded.push(val);
  return padded.join('');
}

function hsv2rgb(hsv) {

  let hue = hsv[0];
  let saturation = hsv[1];
  let value = hsv[2];

  hue %= 360;
  saturation = Math.min(Math.max(0, saturation), 1);
  value = Math.min(1, Math.max(0, value));

  let i;
  let f, p, q, t;

  let red, green, blue;

  if(saturation === 0) {
    // achromatic (grey)
    return [value, value, value];
  }

  let h = hue / 60;			// sector 0 to 5
  i = Math.floor(h);
  f = h - i;			// fractional part of h
  p = value * (1-saturation);
  q = value * (1-saturation*f);
  t = value * (1-saturation*(1-f));

  switch(i) {
    case 0:
      red = value;
      green = t;
      blue = p;
      break;
    case 1:
      red = q;
      green = value;
      blue = p;
      break;
    case 2:
      red = p;
      green = value;
      blue = t;
      break;
    case 3:
      red = p;
      green = q;
      blue = value;
      break;
    case 4:
      red = t;
      green = p;
      blue = value;
      break;
    default:		// case 5:
      red = value;
      green = p;
      blue = q;
      break;
  }
  return [red, green, blue];
}

function rgb2hsv(rgb) {
  let red = rgb[0];
  let green = rgb[1];
  let blue = rgb[2];

  let min, max, delta;

  let hue, saturation, value;

  min = Math.min(red, green, blue);
  max = Math.max(red, green, blue);
  value = max; // v

  delta = max - min;

  if(delta == 0) { // white, grey, black
    hue = saturation = 0;
  } else { // chroma
    saturation = delta / max;
    if(red == max) {
      hue = (green-blue)/delta; // between yellow & magenta
    } else if(green == max) {
      hue = 2 + (blue - red)/delta; // between cyan & yellow
    } else {
      hue = 4 + (red-green)/delta; // between magenta & cyan
    }
    hue = ((hue * 60) + 360) % 360; // degrees
  }
  return [hue, saturation, value];
}

Kolor.WHITE = new Kolor([1,1,1,1]);
Kolor.BLACK = new Kolor([0,0,0,1]);
Kolor.RED = new Kolor([1,0,0,1]);
Kolor.GREEN = new Kolor([0,1,0,1]);
Kolor.BLUE = new Kolor([0,0,1,1]);

export default Kolor;
