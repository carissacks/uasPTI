import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { QuestionDataService } from '../questiondata.service';
import { User } from '../user';
import { UserdataService } from '../userdata.service';
import { first } from 'rxjs/operators';
import { Question } from '../question';
// import { randomBytes } from 'crypto';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})

export class QuizComponent implements OnInit {
  
  public users: User[] = [];
  public soal: Array<Question>= [];
  public soals: Array<Question>= [];
  public showSidebar: boolean= true;
  public goToQuestion: number;
  public idx: number;
  public isFirst: boolean= false;
  public carouselProp={
    "carousel-item": true,
    "active": this.isFirst
  }
  @Input() public ans: Array<boolean>= [];

  constructor(
    private data: QuestionDataService, 
    private authService: AuthService, 
    private router: Router,
    private userdataService: UserdataService  
  ) { }  

  ngOnInit() {
    // this.data.getQuestions().subscribe(data => {
    //   this.rawQuestion= data;
    //   console.log(this.rawQuestion[0].question);
    //   this.randomQuestion();
    //   console.log("a");
    // })

    this.soal= this.data.getQuestions();
    console.log(this.soal);
    
    this.userdataService.getUser()
      .pipe(first())
      .subscribe(users => {
        this.users = users;
    })

  



    // this.data.getQuestions().subscribe(data => {
    //   this.soal = data
    // });
    // this.soal= this.data.getQuestion();
    // this.data.getData()
    //   .map((question: Array<any>) =>{
    //     let result: Array<any>= [];
    //     if(question){
    //       question.forEach((erg) => {
    //         result.push(new Question(erg.id, erg.question, erg.choices,));
    //       });
    //     }
    //     return result;
    //   });
  }

  // random(){
  //   return Math.floor((Math.random() * 15));
  // }
   
  getNumberQuestion(numb){
    $('#carousel').carousel(numb);
  }

  changeSidebar(show){
    console.log('Aku ga kuat :((');
    this.showSidebar= show;
    console.log(show);
    console.log(this.questionNum);
  }

  addAns(idx, jawaban){
    this.ans[idx] = jawaban;
    console.log('No.'+idx+' = '+this.ans[idx]);
  }

  // randomQuestion(){
  //   let i= 0;
  //   while(i<this.rawQuestion.length){
  //     let a= this.random();
  //     console.log(a);
  //     if (this.rawQuestion[a].visited==false){
  //       this.soal.push(new Question (this.rawQuestion[a].id, this.rawQuestion[a].question, this.rawQuestion[a].choices));
  //       i++;
  //     }
  //   }
  //   console.log(this.soal);
  // }
}
  
// }
