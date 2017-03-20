
const assert = require('assert');
import {Kolor} from '..'

describe('Kolor', () => {
  it('should create Red by RGB', () => {
    assert.equal(new Kolor(1,0,0).toCSSHex(), '#FF0000');
  });
  it('should create Red by HSV', () => {
    assert.equal(new Kolor({h:0,s:1,v:1}).toCSSHex(), '#FF0000');
  });
  it('should create Half Saturation', () => {
    assert.equal(new Kolor({h:0,s:0.5,v:1}).toCSSHex(), '#FF8080');
  });
  it('should create Half Value', () => {
    assert.equal(new Kolor({h:0,s:1,v:0.5}).toCSSHex(), '#800000');
  });
  it('should create Half Saturation from RGB', () => {
    assert.equal(new Kolor([1,0,0]).setSaturation(0.5).toCSSHex(), '#FF8080');
  });
  it('should create Red by RGB half alpha', () => {
    let css = new Kolor(1,0,0,0.5).toCSS();
    assert(/rgba\(255,0,0,0\.5\d*\)/.test(css));
  });
  it('should create Red by RGB half alpha normalized', () => {
    let [r,g,b,a] = new Kolor(1,0,0,0.5).RGBA();
    assert(Math.abs(r-1.0) < 0.01);
    assert(Math.abs(g-0.0) < 0.01);
    assert(Math.abs(b-0.0) < 0.01);
    assert(Math.abs(a-0.5) < 0.01);
  });
  it('should create Green by HSV', () => {
    assert.equal(new Kolor({h:120,s:1,v:1}).toCSSHex(), '#00FF00');
  });
});
