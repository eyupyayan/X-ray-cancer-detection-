🫁 Chest X-Ray Pneumonia Classifier
Dette er et maskinlæringsprosjekt utviklet som en del av faget Deep Learning ved Høgskulen på Vestlandet (HVL). Prosjektet bruker en dyp læringsmodell som vi selv har trent fra bunnen av til å klassifisere røntgenbilder av lunger som enten "Normal" eller "Pneumonia" (lungebetennelse).

Modellen ble trent av et gruppemedlem på et medisinsk datasett og deretter lagret i .h5-format. Dette gjør det mulig å bruke modellen direkte i applikasjonen uten behov for å trene den på nytt hver gang.

📦 Innhold
backend/ – Flask-backend som laster modellen og gjør prediksjoner
frontend/ – React-app hvor brukeren kan laste opp røntgenbilder
xray_classifier_scratch.h5 – Treningsresultat (modell vi selv har trent fra bunnen av)
README.md – Denne filen
📊 Modellinformasjon
Base-arkitektur: Convolutional Neural Network (CNN)
Treningsdata: Chest X-Ray Images (Pneumonia) (Kaggle-link)
Bildeformat: 224x224 px, RGB
Modellformat: Keras .h5
