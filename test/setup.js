import 'aurelia-polyfills';
import { initialize } from 'aurelia-pal-browser';
import { Container } from 'aurelia-dependency-injection';

initialize();
new Container().makeGlobal();
