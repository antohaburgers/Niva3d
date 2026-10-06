export const OBSTACLE_CONFIG={chance:.45,minimumStart:40,clearLanding:36,samplingStep:.30,detailRadius:3,types:{
 MUD_PATCH:{height:-.07,radius:.64,longRadius:3.2,surfaceType:'MUD',mudDepth:.60},
 PIT:{height:-.23,radius:.95,longRadius:1.1},
 POTHOLE:{height:-.16,radius:.64,longRadius:.80},
 ROCK:{height:.56,radius:.72,longRadius:.82,surfaceType:'ROCK'},
 SHORT_RUT:{height:-.13,radius:.42,longRadius:3.1},
 DITCH:{height:-.20,radius:1.60,longRadius:.62},
 BUMP:{height:.32,radius:1.1,longRadius:1.6},
 SOFT_PATCH:{height:-.035,radius:1.1,longRadius:2.7,surfaceType:'SOFT_DIRT'}
}};
export const HILL_CONFIG={light:[12,16,20],hard:[25,28,30],extreme:[35,37,39],descent:[22,27,30],extremeDescent:35,extremeChance:.13};
export function obstacleWeight(o,u,lateral,length){return Math.exp(-.5*(((u-o.u)*length/(o.longRadius||o.radius))**2+((lateral-o.lateral)/o.radius)**2));}
// Cosine ramps give a specified maximum grade, with horizontal entry and exit tangents.
export function hillElevation(distance,hill){const x=distance-hill.start,L=hill.span,r=hill.ramp,e=hill.exitRamp||r,g=Math.tan(hill.angle*Math.PI/180)*hill.sign;if(x<=0)return 0;if(x>=L)return g*(L-(r+e)/2);if(x<r)return g*(x/2-r*Math.sin(Math.PI*x/r)/(2*Math.PI));if(x<=L-e)return g*(x-r/2);const t=x-(L-e);return g*(L-e-r/2+t/2+e*Math.sin(Math.PI*t/e)/(2*Math.PI));}
