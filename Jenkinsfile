pipeline {
  agent any

  stages {

    stage('Checkout Code') {
      steps {
        git branch: 'main', url: 'https://github.com/tanmay999/PlaywrightWeb'
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }

    stage('Install Playwright Browsers') {
      steps {
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        sh 'npx playwright test'
      }
    }
  }

  post {
  always {
    archiveArtifacts artifacts: 'playwright-report/**'

    publishHTML([
      reportDir: 'playwright-report',
      reportFiles: 'index.html',
      reportName: 'Playwright Report',
      keepAll: true,
      alwaysLinkToLastBuild: true,
    useWrapperFileDirectly: true  
    ])
  }
}
}

