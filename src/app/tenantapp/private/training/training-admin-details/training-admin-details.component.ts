// reactive forms: https://www.youtube.com/watch?v=U9Xo0wXZIAg
// declare var require: any

//import { Observable } from "rxjs/observable";
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'
import { Component, OnInit, model } from '@angular/core'
import { FormBuilder, FormGroup, Validators, FormControl, ReactiveFormsModule } from '@angular/forms'
// import { MyErrorStateMatcher } from '@tenantapp/services/validation/myerrorstatematcher'
import { ActivatedRoute, RouterLink } from '@angular/router'
import { Training } from '@src/_model/Training'
import { TrEvent } from '@src/_model/trevent'
import { AppImageComponent } from '@app/shared/components/app-image/app-image.component'
import { CommonModule } from '@angular/common'
import { MaterialModule } from '@src/_module/Material.Module'
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
// import * as $ from 'jquery'
declare var $: any

@Component({
  selector: 'app-training-admin-details',
  standalone: true,
  imports: [RouterLink,ReactiveFormsModule,MaterialModule,CommonModule,AppImageComponent,NgbAlert],//,NgbAlert
  // imports: [MaterialModule,CommonModule],
  templateUrl: './training-admin-details.component.html',
  styleUrl: './training-admin-details.component.scss'
})
export class TrainingAdminDetailsComponent implements OnInit {
  markColor = '#ff9efb'
  normalColor = '#4499ff'
  routeId: Number
  training: Training | undefined
  // training$: Observable<Training> = of(null)
  // file: File
  //  training: Training
  rForm: FormGroup
  // matcher = new MyErrorStateMatcher()
  trainingForm = this.fb.group({
    title: ['',Validators.required],
    secondaryTitle: [''],
    roleId: 1
  })
  isSubmitted = false;
  roles=[
    {id:1, title:'developer'},
    {id:2, title:'qa'},
  ]
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {
    // console.log(
    //   'Constructor. training ' +
    //     require('util').inspect(this.training, false, null)
    // )

    this.rForm = formBuilder.group({
      title: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(20)]),
      ],
      secondaryTitle: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(40)]),
      ],
      shortDescription: [
        null,
        Validators.compose([Validators.required, Validators.maxLength(80)]),
      ],
      longDescription: [null, Validators.compose([Validators.maxLength(280)])],
    })
    this.routeId = Number(this.activatedRoute.snapshot.paramMap.get('id'))
    // console.log('-------- id = ' + this.routeId)
    // this.activatedRoute.queryParams.subscribe(params => {
    //   let id = params['id']
    //   console.log('-------- id = ' + id) // Print the parameter to the console.
    // })
    // this.store.dispatch(new TrainingActions.LoadTraining(this.routeId))
    // this.training$ = this.store.select(fromTrainingReducer.getSelectedTraining)
    // this.training$.subscribe((training: Training) => {
    //   // this.training = training
    //   this.training = training
    //   this.applyFormValues(this.rForm, training)
    //   this.setEvents(this.training.events)

    //   // this.setEvents([
    //   //   {
    //   //     // title: 'This is your',
    //   //     id: 1,
    //   //     start: '2001-01-09T09:00:00',
    //   //     color: '#f9c66a', // override!
    //   //   },
    //   //   {
    //   //     // title: 'Your meeting with john',
    //   //     id: 2,
    //   //     start: '2001-01-11T06:30:00',
    //   //     end: '2001-01-11T14:30:00',
    //   //     color: '#019efb',
    //   //   },
    //   // ])
    //   // this.setEvents([
    //   //   {
    //   //     id: 1,
    //   //     number: 3,
    //   //     start: '2001-01-11T08:30:00.000Z',
    //   //     end: '2001-01-11T14:30:00.000Z',
    //   //     version: 0,
    //   //   },
    //   //   {
    //   //     id: 2,
    //   //     number: 4,
    //   //     start: '2001-01-10T09:00:00.000Z',
    //   //     end: '2001-01-10T14:30:00.000Z',
    //   //     version: 0,
    //   //   },
    //   // ])
    // })
  }

  public hasError = (controlName: string, errorName: string) => {
    // console.log(
    //   'error ' + this.rForm.controls[controlName].hasError(errorName)
    // )
    return this.rForm.controls[controlName].hasError(errorName)
  }

  ngOnInit() {
    
    if( typeof $ === "undefined")
      return;
    this.trainingForm.get('roleId')?.valueChanges.subscribe(
      roleId => {
        console.log('role changed to ', roleId)
      })
    
    // this.setEvents([
    //   {
    //     // title: 'This is your',
    //     id: 1,
    //     start: '2001-01-09T09:00:00',
    //     color: '#f9c66a', // override!
    //   },
    //   {
    //     // title: 'Your meeting with john',
    //     id: 2,
    //     start: '2001-01-11T06:30:00',
    //     end: '2001-01-11T14:30:00',
    //     color: '#019efb',
    //   },
    // ])
    // $('#calendar').fullCalendar({
    //   defaultDate: '2001-01-07',
    //   defaultView: 'agendaWeek',
    //   allDaySlot: false,
    //   contentHeight: 'auto',
    //   // height: 560,
    //   header: {
    //     // left: 'prev,next today',
    //     // center: 'title',
    //     // right: 'month,agendaWeek,agendaDay',
    //     left: '',
    //     center: '',
    //     right: '',
    //   },
    //   // businessHours: [
    //   //   {
    //   //     dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
    //   //     start: '08:00',
    //   //     end: '12:00',
    //   //   },
    //   //   {
    //   //     dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
    //   //     start: '13:00',
    //   //     end: '18:00',
    //   //   },
    //   // ],
    //   columnHeaderHtml: function (date: { day: () => any }) {
    //     let day = date.day()
    //     if (day === 0) return 'Su'
    //     else if (day === 1) return 'Mo'
    //     else if (day === 2) return 'Tu'
    //     else if (day === 3) return 'We'
    //     else if (day === 4) return 'Th'
    //     else if (day === 5) return 'Fr'
    //     else if (day === 6) return 'Sa'
    //     else return ''
    //   },
    //   minTime: '08:00:00',
    //   maxTime: '18:00:00',
    //   // views: {
    //   //   dayGridMonth: {
    //   //     // name of view
    //   //     titleFormat: { year: 'numeric', month: '2-digit', day: '2-digit' },
    //   //     // other view-specific options here
    //   //   },
    //   // },
    //   navLinks: false,
    //   editable: true,
    //   eventLimit: true,
    //   events: [], // request to load current events
    //   eventRender: function (event: { tip: any }, element: { attr: (arg0: string, arg1: any) => void }) {
    //     element.attr('title', event.tip)
    //   },
    //   eventClick: this.eventClick.bind(this),
    // })
  }
  eventClick(calEvent: { id: any; color: string }, jsEvent: any, view: any) {
    console.log(
      'Event Start =' + require('util').inspect(calEvent.id, false, null)
    )
    // for (var i = 0; i < this.training.events.length; i++) {
    //   this.training.events[i].color = this.normalColor
    // }
    if (calEvent.color == this.normalColor) calEvent.color = this.markColor
    else if (calEvent.color == this.markColor) calEvent.color = this.normalColor
    console.log(
      'this.training=' + require('util').inspect(this.training, false, null)
    )
    $('#calendar').fullCalendar('removeEvents', calEvent.id)
    $('#calendar').fullCalendar('renderEvent', calEvent, 'stick')

    // this.store.dispatch(new TrainingActions.DeleteEvent(calEvent))
    // for (var i = 0; i < this.training.events.length; i++) {
    //   if (this.training.events[i].id == calEvent.id) {
    //     this.training.events[i].color = '#ff9efb'
    //     $('#calendar').fullCalendar('removeEvents', calEvent.id)
    //     $('#calendar').fullCalendar(
    //       'renderEvent',
    //       this.training.events[i],
    //       'stick'
    //     )
    //   }
    // }
  }
  onSubmit() {
    console.log('submitted form=', this.trainingForm.value,this.trainingForm.invalid)
    this.isSubmitted=true;
    // console.log('value=' + require('util').inspect(value, false, null))
    // var events = $('#calendar').fullCalendar('clientEvents')
    // console.log(
    //   'get events=' + require('util').inspect(events[0].start, false, null)
    // )
    // this.training.events = []
    // for (var i = 0; i < events.length; i++) {
    //   var start = new Date(events[i].start._d)
    //   var end: Date
    //   if (events[i].end != null) {
    //     end = new Date(events[i].end._d)
    //   }
    //   var id: number = events[i].id
    //   var number = events[i].number
    //   var version = events[i].version
    //   // this.training.events.push({ id, start, end, number, version })
    // }
    // console.log(
    //   'submit this.training.events=' +
    //     require('util').inspect(this.training.events, false, null)
    // )
    // let tr = { ...this.training, ...value }
    // console.log(
    //   'TrainingAdminAppComponent save submit  =' +
    //     require('util').inspect(tr, false, null)
    // )
    // this.store.dispatch(
    //   // new TrainingActions.SaveTraining({ id: this.training.id, ...value }, this.file)
    //   new TrainingActions.SaveTraining(tr, this.file)
    // )
  }
  validateTitle(){
    // return this.trainingForm.get('title')?.invalid && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
    return this.trainingForm.get('title')?.hasError('required') && (this.trainingForm.get('title')?.dirty || this.trainingForm.get('title')?.touched || this.isSubmitted)
  }
  addEvent() {
    $('#calendar').fullCalendar('removeEvents', 0)
    var newEvent = {
      id: 0,
      title: 'NEW EVENT',
      start: '2001-01-07T08:00:00',
      end: '2001-01-07T10:00:00',
    }
    $('#calendar').fullCalendar('renderEvent', newEvent, 'stick')

    var events = $('#calendar').fullCalendar('clientEvents')
    console.log(
      'get events=' + require('util').inspect(events[0].start, false, null)
    )
    // for (var i = 0; i < events.length; i++) {
    //   if (events[i].id==0) {
    //   }
    // }
    // this.training.events = []
    // this.store.dispatch(
    //   // new TrainingActions.SaveTraining({ id: this.training.id, ...value }, this.file)
    //   new TrainingActions.SaveTraining(this.training, this.file)
    // )
  }
  removeEvents() {
    var events = $('#calendar').fullCalendar('clientEvents')
    for (var i = 0; i < events.length; i++) {
      if (events[i].color == this.markColor) {
        console.log(
          ' remove events.id=' +
            require('util').inspect(events[i].id, false, null)
        )
        $('#calendar').fullCalendar('removeEvents', events[i].id)
      }
      // else this.training.events[i].color = this.normalColor
    }

    // $('#calendar').fullCalendar('removeEvents', 0)
  }
  private applyFormValues(group: FormControl<any> & FormGroup<any>, formValues: { [x: string]: any }) {
    Object.keys(formValues).forEach((key) => {
      let formControl = <FormControl>group.controls[key]
      if (!formControl) return
      if (formControl instanceof FormGroup) {
        this.applyFormValues(formControl, formValues[key])
      } else {
        formControl.setValue(formValues[key])
      }
    })
  }
  onFilesAdded(event: { target: { files: any[] } }) {
    // this.file = event.target.files[0]
    // console.log(
    //   'event.target.files[0]=' +
    //     require('util').inspect(this.file.name, false, null)
    // )
  }

  setEvents(events: TrEvent[]) {
    // if (events instanceof Array) {
    // console.log(
    //   'Set it now. events=' + require('util').inspect(events, false, null)
    // )
    // setTimeout(() => {
    if (events)
      for (var i = 0; i < events.length; i++) {
        events[i].color = this.normalColor
      }

    $('#calendar').fullCalendar('removeEvents')
    $('#calendar').fullCalendar('addEventSource', events)
    $('#calendar').fullCalendar('rerenderEvents')
    // })
    // } //End if instance of
  }
}
