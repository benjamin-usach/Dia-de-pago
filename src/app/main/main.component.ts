import { Component, OnInit, ViewChild } from '@angular/core';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';
import {interval} from 'rxjs';

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
  audio = new Audio('../../assets/lights.mp3');
  playing = false;

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

  debug(){
    if(!this.playing){
      this.audio.play();
      this.playing = true;
    }
    else{
      this.audio.pause();
      this.playing = false;
    }
  }

}
