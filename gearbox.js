// Speed-led HIGH automatic, RPM/load-led LOW. All speeds in km/h.
export const GEARBOX_CONFIG={upSpeed:[25,40,60,85],downSpeed:[20,36,55,80],shiftDuration:.15,upCooldown:.40,downCooldown:.20,kickdownRPM:2100,kickdownThrottle:.8,kickdownSpeedMargin:.95,loadThreshold:.75,lowUpRPM:[2800,3700],lowDownRPM:1550,highFadeStart:115,highFadeEnd:145,lowFadeStart:48,lowFadeEnd:68};
export function chooseShift(state,c){const tune=c.gearbox,g=state.currentGear,speed=state.vehicleSpeed;if(g<1||state.shiftRemaining>0)return null;const nextRPM=state.currentRPM*(g>1?c.gearRatios[g-2]/c.gearRatios[g-1]:1),low=state.transferRange==='L';
 if(low){const up=tune.lowUpRPM[0]+(tune.lowUpRPM[1]-tune.lowUpRPM[0])*state.throttle;if(g>1&&state.currentRPM<tune.lowDownRPM+(state.load>tune.loadThreshold?300:0)&&nextRPM<c.redlineRPM-500)return{gear:g-1,event:'DOWNSHIFT'};if(g<5&&state.currentRPM>up&&state.load<.95&&speed>3)return{gear:g+1,event:'UPSHIFT'};return null;}
 if(g>1&&speed<tune.downSpeed[g-2])return{gear:g-1,event:'DOWNSHIFT'};
 if(g>1&&state.throttle>tune.kickdownThrottle&&state.currentRPM<tune.kickdownRPM&&speed<tune.upSpeed[g-2]*tune.kickdownSpeedMargin&&nextRPM<c.redlineRPM-500)return{gear:g-1,event:'KICKDOWN'};
 if(g>1&&state.load>tune.loadThreshold&&state.throttle>.65&&state.longitudinalAcceleration<.25&&state.currentRPM<1900&&speed<tune.upSpeed[g-2]*tune.kickdownSpeedMargin&&nextRPM<c.redlineRPM-500)return{gear:g-1,event:'DOWNSHIFT'};
 if(g<5&&speed>=tune.upSpeed[g-1])return{gear:g+1,event:'UPSHIFT'};return null;
}
export function speedTorqueFactor(speed,range,tune=GEARBOX_CONFIG){const a=range==='L'?tune.lowFadeStart:tune.highFadeStart,b=range==='L'?tune.lowFadeEnd:tune.highFadeEnd,t=Math.max(0,Math.min(1,(Math.abs(speed)-a)/(b-a)));return 1-t*t;}
