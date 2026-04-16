# FORMS 



Install bootstrap

npm install bootstrap --save

You need to import that css file then. It's in modules, dist. 

In project in style.css file in 'app' you need to type in

@import "bootstrap/dist/css/bootstrap.css";



body {

padding: 10px;

} 

Contact us component

<h1>Contact us</h1>

&#x09;<form>

&#x09;	<div class="form-group">

&#x09;		<label for="email" class="form-label"> Email </label>

&#x09;		<input type="text" class="form-control" id="email">

&#x09;	</div>

&#x09;	<div class="form-group">

&#x09;		<label for="comment" class="form-label"> COmment </label>

&#x09;		<input type="text" class="form-control" id="comment">

&#x09;	</div>

&#x09;	<button class="btn btn-primary">Submit</button>

&#x09;</form>



He just copied from the bootstrap website



2 classes required to do forms in angular

FormControl

FormGroup

The textboxes of the form above are formcontrols. Every component should have corresponding form control. Deals with handling the content in that text box, drop down, checkbox. 

Formgroup. It groups together a number of formcontrol classes. Email and comment are form control elements, collectively theres a form group class that wraps around them



In angular, two ways you can handle html forms

1\. Template-driven approach

2\. Reactive approach

Previous videos it was all template driven. Reactive cleaner, easier to understand. 



Import formgroup and formcontrol in contact componenet.

Because of reactive approach, also import ReactiveFormsModule and then include it in imports array

Inside class, instantiate instance of them.

contactForm = new FormGroup({ email: new FormControl('');

comment: new FormControl(''); })

The formgroup GROUPS those form controls together

Bind the form group here to form component in html.

In html form:

<h1>Contact us</h1>

&#x09;<form \[formGroup]="contactForm"> ##this is from ts file

&#x09;	<div class="form-group">

&#x09;		<label for="email" class="form-label"> Email </label>

&#x09;		<input type="text" formControlName="email" class="form-control" id="email">

&#x09;	</div>

&#x09;	<div class="form-group">

&#x09;		<label for="comment" class="form-label"> COmment </label>

&#x09;		<input type="text" formControlName="comment" class="form-control" id="comment">

&#x09;	</div>

&#x09;	<button class="btn btn-primary">Submit</button>

&#x09;</form>

in same file doing some interpolation:

email= {{ contactForm.value.email}}

comment= {{ contactForm.value.comment}}

If you type into text boxes now in browser, it should appear below



TO be able to take the values and do something: 

<button (click)="submit()" class="btn btn-primary">Submit</button>



in ts file: 



new function below contact form bit



submit(){

alert(this.contactForm.value.email);}



# HTTP service 



Players componenet

Data WAS coming from within players service componenet. Service provided player componenet with data. We set up a players array of json objects. Now we want to retrieve it from rest api server with http protocol. 

Angular is front end. Rest API is backend. 

Component -> service -> backend

PlayersComponent -> PlayersService -> RestAPI

Every componenet that need data should communicate with a service. Shouldn't be directly dealing with the backend, should be an intermediary. 

Most front ends communicate with backend using HTTP protocol. HttpClient class. Have to config as dependency injection. App.config.ts file.

inside providers array: provideHttpClient(withFetch())

In playersService:

constructor(private http: HttpClient) {}

Dep inj via constructor. 



url = `http://localhost:3000/players/`;



update get players function

return this.http.get(this.url);



We already created a player interface. We need to use that in get function.

.get<T>() is an option. If you know the datatype or want to strongly type. Data i'm getting back will be array of player interface objects.

You'll need to add 'Observable'



Remove hardcoded



In player component:



modify getting players.



this.playerService.getPlayers().subscribe(

response => {this.players = response; });



subscribe deals with background async calls

whatever response comes back, put it into players



# POSTING



In players component:

<button (click)="addPlayer()">Add player</button>

<p>{{ newPlayer | json }}</p>



In player componenent ts file:



newPlayer: Player = { "id": 0, "name": "Lewandowski" }; ## 0 is standard. Server will figure out a correct ID

A new player you're trying to send to server

It's an instance of the player interface



constructor(){

this.playerService.getPlayers().subscribe(

response => { this.players = response;

console.log(response);});}





addPlayer() {

&#x09;this.playerService.addPlayer(this.newPlayer).subscribe( response => {

console.log(response)});

}



You're passing a copy of the new player json object to the service



service ts file:



addPLayer(player: PLayer){

return this.http.post<Player>(this.url, player);}



getPlayers() : Observable<Player\[]>{

return this.http.get<Player\[]>(this.url);}



# NAV BAR

from bootstrap



app.routes.ts

might be there already

exporting a routes array. Will eventually contain routes



In app config .ts, include provideRouter(routes) in providers



create nav component

paste in bootstrap 4 nav bar from w3 schools. 

Can likely just paste in react one



You'll need to import new componenets into app.component.ts, and put them in imports



in export part of app.routes.ts:

\[ { path: '', component: HomeComponent, title: 'HomePage' },

{ path: 'players, component: PlayersComponent, title: 'Players Page'},

{ path: 'contact, component: contactComponent, title: 'Contact Page'}



]

also import those components



Back in app.routes.ts:

you'll need a routerLink="/" in each <a>



In app.component.ts: this is where you import all components.

You'll need to import RouterLink and RouterOutlet



You'll also need to import them in nav.component.ts. In imports array



in nav.component.html:



<router-outlet></router-outlet>



At bottom of file. Acts as a delimited. Everything above this is the component. So don't put anything below



# ROUTE PARAMS

player.ts interface was expanded to include full name and dob

player service new function get player

getPLayer(id: number) : Observable<Player>{

}



for loop is displaying names currently

modify 

<li>

<a routerLink="/player/{{player.id}}">{{PLayer.name}}

Will give error. Haven't imported router link. Did it for nav. Have to also do it for players component, in array too.



in app.routes.ts

add a new path

{ path: 'player/:playerID', component: PlayerComponent, title: 'Player'}

There's already a component for displaying playerSSSS

You now need a component that displays A player

import that component into app.routes

In this new single player component:

oh my god just copy from the video

Stuff with activatedroute

ngOnInit. a bit like a constructor

