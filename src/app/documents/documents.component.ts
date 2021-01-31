import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cms-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css'],
})
export class DocumentsComponent implements OnInit {
  @Input() selectedDocument: Document;

  constructor() {}

  ngOnInit(): void {}
}
