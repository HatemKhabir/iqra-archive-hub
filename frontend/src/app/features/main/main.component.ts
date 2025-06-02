import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl } from '@angular/forms';


import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule } from '@angular/forms';

// Angular Material imports
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

// PDF Viewer
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';

// Define the structure of the file data
interface FileData {
  _id: string;
  name: string;
  contentType: string;
  data: string; // Base64 encoded string
  createdAt: string;
}
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    NgxExtendedPdfViewerModule,
  ]
})
export class MainComponent implements OnInit {
  @ViewChild('pdfViewer') pdfViewer!: ElementRef;
  
  filesList: FileData[] = [];
  selectedFile: FileData | null = null;
  pdfSrc: string | null = null;
  isLoading: boolean = false;
  translationLoading: boolean = false;
  selectedLang?: { code: string, name: string } ;
  selectedLanguage: string = '';
  selectedCountry?:{ code: string, name: string };
  // Available languages for translation
  selectedMosque: string = '';
  

  mosques = [
    'Al-Aqsa Mosque',
    'Great Mosque of Mecca',
   'Prophet\'s Mosque',
    'Sultan Ahmed Mosque',
    'Sheikh Zayed Grand Mosque'
  ];
  countries=[
    { code: 'gb', name: 'United Kingdom' },
    { code: 'es', name: 'Spain' },
    { code: 'fr', name: 'France' },
    { code: 'de', name: 'Germany' },
    { code: 'it', name: 'Italy' },
    { code: 'cn', name: 'China' },
    { code: 'sa', name: 'Saudi Arabia' }
  ]
  languages = [
    { code: 'gb', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'cn', name: 'Chinese' },
    { code: 'sa', name: 'Arabic' }
  ];
  
  languageControl = new FormControl('');
  translatedText: string | null = null;
  
  constructor(private http: HttpClient) {}
  
  ngOnInit() {
    this.loadFiles();
    
    // Listen for language changes
    this.languageControl.valueChanges.subscribe(language => {
      if (this.selectedFile && language) {
        this.translateDocument(language);
      }
    });
  }
  
  loadFiles() {
   
  }
  
  selectFile(file: FileData) {
    this.selectedFile = file;
    
    // Create a data URL for the PDF
    if (file.contentType === 'application/pdf') {
      this.pdfSrc = `data:${file.contentType};base64,${file.data}`;
      // Reset translation when a new file is selected
      this.translatedText = null;
      
      // Translate to current language
      const currentLang = this.languageControl.value;
      if (currentLang) {
        this.translateDocument(currentLang);
      }
    }
  }
  
  getSelectedLanguageName() {
    this.selectedLang = this.languages.find(lang => lang.code === this.languageControl.value);
    return this.selectedLang ? this.selectedLang.name : 'Select Language';
  }
  
  translateDocument(targetLanguage: string) {
    if (!this.selectedFile) return;
    
    this.translationLoading = true;
    
    // In a real app, you would send the file ID and target language to your backend
    this.http.post<{ translatedText: string }>('/api/translate', {
      fileId: this.selectedFile._id,
      targetLanguage: targetLanguage
    }).subscribe({
      next: (response) => {
        this.translatedText = response.translatedText;
        this.translationLoading = false;
      },
      error: (error) => {
        console.error('Error translating document:', error);
        this.translationLoading = false;
        // For demo purposes, simulate a translation
        setTimeout(() => {
          this.translatedText = `This is a simulated translation of "${this.selectedFile?.name}" to ${
            this.languages.find(l => l.code === targetLanguage)?.name
          }. In a real application, this would be actual translated content from a translation API.`;
          this.translationLoading = false;
        }, 1500);
      }
    });
  }
}