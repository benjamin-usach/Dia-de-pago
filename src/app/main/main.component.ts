import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import {interval} from 'rxjs';
import Fireworks from 'fireworks-js';

const CountdownTimeUnits: Array<[string, number]> = [
  ['Y', 1000 * 60 * 60 * 24 * 365], // years
  ['M', 1000 * 60 * 60 * 24 * 30], // months
  ['D', 1000 * 60 * 60 * 24], // days
  ['H', 1000 * 60 * 60], // hours
  ['m', 1000 * 60], // minutes
  ['s', 1000], // seconds
  ['S', 1], // million seconds
];

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  today = new Date();
  lastDayOfMonth = new Date(this.today.getFullYear(), this.today.getMonth()+1, 0);
  timeleft: any;
  daysLeft: any;
  sub: any;
  audio = new Audio('../../assets/newyear.mp3');
  playing = false;
  fireworks: any;

  config: CountdownConfig = {
    leftTime: 0,
    formatDate: ({ date, formatStr }) => {
      let duration = Number(date || 0);

      return CountdownTimeUnits.reduce((current, [name, unit]) => {
        if (current.indexOf(name) !== -1) {
          const v = Math.floor(duration / unit);
          duration -= v * unit;
          return current.replace(new RegExp(`${name}+`, 'g'), (match: string) => {
            return v.toString().padStart(match.length, '0');
          });
        }
        return current;
      }, 'DD:HH:mm:ss');
    },
  };

  constructor() { }

  ngOnInit(): void {
    this.daysLeft = this.lastDayOfMonth.getDate() - this.today.getDate()
    console.log(this.today);
    console.log(this.lastDayOfMonth);
    console.log(this.lastDayOfMonth.getDate());
    console.log(this.today.getDate());
    this.timeleft = (this.lastDayOfMonth.getTime()/1000) - (this.today.getTime()/1000);
    this.config.leftTime = this.timeleft;
    console.log(this.timeleft);
    this.updateDate();

  }

  updateDate(){
    this.sub = interval(500)
    .subscribe((val) => {
      this.today = new Date();

    });
  }

  debug(container: HTMLCanvasElement){
    this.startFireworks(container);
    if(!this.playing){
      this.audio.play();
      this.playing = true;
      this.fireworks.start();
    }
    else{
      this.audio.pause();
      this.playing = false;
      this.fireworks.stop();
    }
  }

  startFireworks(container: HTMLCanvasElement){
    this.fireworks = new Fireworks(container, {
      autoresize: true,
      opacity: 0.5,
      acceleration: 1.05,
      friction: 0.97,
      gravity: 1.5,
      particles: 50,
      traceLength: 3,
      traceSpeed: 10,
      explosion: 5,
      intensity: 30,
      flickering: 50,
      lineStyle: 'round',
      hue: {
        min: 0,
        max: 360
      },
      delay: {
        min: 30,
        max: 60
      },
      rocketsPoint: {
        min: 50,
        max: 50
      },
      lineWidth: {
        explosion: {
          min: 1,
          max: 3
        },
        trace: {
          min: 1,
          max: 2
        }
      },
      brightness: {
        min: 50,
        max: 80
      },
      decay: {
        min: 0.015,
        max: 0.03
      },
      mouse: {
        click: false,
        move: false,
        max: 1
      }
    });
  }

}
