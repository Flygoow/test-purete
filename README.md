## [Jouer en ligne](http://test-purete.boudah.pl)

Faire une version plus complète et plus actuelle du célèbre test de pureté de
[Griffor](http://test.griffor.com/). Objectif atteint en 3h de travail et moins
de 15 Ko dans un unique fichier HTML (jouable hors-ligne). L’accent a été mis
sur la simplicité et la légèreté du projet, et on peut compléter facilement le
jeu ou en faire des variantes.

### Sous le capot

Un script shell utilise le modèle 
[`/html/index.htm`](https://github.com/Talenka/test-purete/blob/master/html/index.htm) 
pour construire la page 
[`/index.htm`](https://github.com/Talenka/test-purete/blob/master/index.htm). 
Le style [`/css/style.css`](https://github.com/Talenka/test-purete/blob/master/css/style.css) 
est minifié avant d'être incorporé à l'index. Pour le javascript nous utilisons 
le [Google Closure compiler](https://developers.google.com/closure/compiler/) 
qui regroupe, minifie et optimise les fichiers du dossier 
[`/js`](https://github.com/Talenka/test-purete/tree/master/js).