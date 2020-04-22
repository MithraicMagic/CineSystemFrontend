pipeline {
  agent any
    
  tools {nodejs "ReactApp-Fun"}
    
  stages {
        
    stage('Cloning Git') {
      steps {
        git 'https://github.com/MithraicMagic/CineSystemFrontend'
      }
    }
        
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