pipeline {
  agent any
    
  tools {nodejs "ReactApp-Fun"}
    
  stages {        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }
     
    stage('Run') {
      steps {
         sh 'npm start'
      }
    }      
  }
}