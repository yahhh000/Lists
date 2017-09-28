import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { List } from 'app/shared/domain/list';
import { Router } from '@angular/router';
import { Checklist } from 'app/shared/domain/list-types/checklist';


@Component({
  selector: 'app-new-list',
  templateUrl: './new-list.component.html',
  styleUrls: ['./new-list.component.scss']
})
export class NewListComponent implements OnInit {

  lists: FirebaseListObservable<List[]>;
  types: FirebaseListObservable<any[]>;

  newList: List = new List();

  constructor(private db: AngularFireDatabase, private router: Router) { }

  ngOnInit() {
    this.types = this.db.list('/types');
    this.lists = this.db.list('/lists');
  }

  onCreateList(){
    this.lists.push(this.newList).then((list) => {      
      switch (this.newList.type)
      {
        case "Checklist" :
          this.createChecklist(list.key);
          break;      
      }
  
      this.router.navigate(['/list', list.key, this.newList.type]);
    });    
  }

  createChecklist(key){
    const newChecklist = new Checklist();
    newChecklist.uid = "Japapjejdsjf";

    const checklists = this.db.list('/checklists');
    checklists.update(key, newChecklist);
  }

}
