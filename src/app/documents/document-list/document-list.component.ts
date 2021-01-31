import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css'],
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [
    new Document(
      'CSE 353-01',
      'Computer Graphics',
      'An introduction to computer graphics. Students will be creating c++ applications to implement the standard computer graphic pipeline architecture. Writing vertex and fragment shaders will complete the course.',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
    new Document(
      'CS124',
      'Introduction to Software Development',
      'This course is the first step in the computer science and software engineering major tract. The goal of this course is that each student will be able to solve problems in C++ and have a solid foundation in software development methodology.',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
    new Document(
      'CS165',
      'Object-Oriented Software Development',
      'Software design and development using the object-oriented paradigm, algorithm formulation and object-oriented programming',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
    new Document(
      'CS235',
      'Data Structures',
      'Builds on the foundation of CS 124 and CS 165 to introduce the fundamental concepts of data structures and the algorithms that proceed from them.',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
    new Document(
      'WDD330',
      'Web Frontend Development II',
      'WDD 330 will continue with the topics presented in WDD 230 Web Front-end Development I: Building websites with HTML, CSS and Javascript. This course will have a stronger emphasis on Javascript development and mobile design as students create mobile web applications.',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
    new Document(
      'WDD430',
      'Web Full-Stack Development',
      'This course will teach you how to design and build interactive web based applications using HTML, CSS, JavaScript, and a web development stack.',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
    new Document(
      'MATH113',
      'Calculus II',
      'This course includes the study of techniques of integration, infinite sequences and series, polar coordinates, and parametric curves will be explored.',
      'https://www.byui.edu/catalog#/courses/',
      null
    ),
  ];

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
