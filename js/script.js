/**
 * Test de pureté (test-purete.boudah.pl)
 *
 * Créé par Boudah Talenka (boudah.pl)
 * et publié sous licence GNU General Public License.
 */
'use strict';


/**
 * Compteur de point pour chaque catégorie de question.
 * @type {Object.<string, number>}
 */
var scores = {
  'sexe': 0,
  'alcool': 0,
  'drogue': 0,
  'hygiene': 0,
  'morale': 0,
  'kharma': 0
};


/**
 * Coefficient pour chaque catégorie qui permet de normalisé les points (en
 * fixant le maximum)
 * @type {Object.<string, number>}
 */
const coefs = {
  'sexe': 1.96,
  'alcool': 2.78,
  'drogue': 3.44,
  'hygiene': 3.22,
  'morale': 1.85,
  'kharma': 0.5
};


/**
 * Noms et position des niveaux de pureté (attention, les noms sont associés aux
 * classes CSS). Le nombre correspond au seuil de points dans une catégorie pour
 * activer le niveau.
 *
 * @type {Object.<string, number>}
 */
const niveaux = {
  'divin': 20,
  'saint': 10,
  'pur': 0,
  'normal': -10,
  'immoral': -15,
  'impur': -20,
  'indecent': -25,
  'malsain': -30,
  'ignoble': -35,
  'vicieux': -40,
  'infame': -45,
  'deprave': -50,
  'dangereux': -61,
  'inhumain': -72,
  'demon': -85,
  'diabolique': -200
};


/**
 * L'élément HTML qui va contenir les questions/réponses
 * @type {Element}
 */
var conteneur;


/**
 * Liste des questions
 * @type {Array.<{categorie: string,
 *                texte: string,
 *                choix: Object.<string, number>}>}
 */
const questions = [
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà ri du malheur de quelqu’un ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez vous déjà ri d’une personne mentalement ' +
        'ou physiquement handicapée ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà embrassé quelqu’un ?',
    choix: {'oui': 0, 'non': 1}
  },
  {
    categorie: 'sexe',
    texte: 'Vous-êtes vous déjà masturbé ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Jusqu’à l’orgasme ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Vous est-il arrivé de ne pas vous laver ?',
    choix: {
      '4 jours ou +': -6,
      '3 jours': -4,
      '2 jours': -2,
      '+ de 24h': 0,
      'je me lave tous les jours': 5
    }
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà bu de l’alcool ?',
    choix: {'oui': -1, 'non': 2}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà été ivre ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà participé à des jeux à boire ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà vomi à cause de l’alcool ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà vomi sur vous ou sur quelqu’un d’autre ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Etes-vous déjà tombé(e) parce que vous étiez trop ivre ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà vomi de la bile ou du sang à cause de l’alcool ?',
    choix: {'oui': -3, 'non': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà drogué vos parents ?',
    choix: {'régulièrement': -5, 'quelque fois': -2, 'jamais': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà parlé de vos pratiques sexuelles au boulot ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Vous êtes vous déjà fait sortir d’un bar' +
        ' ou d’une boîte de force ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà participé à un barathon ? ' +
        '(tous les bars d’une ville ou d’une rue)',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'En moyenne, combien de fois buvez-vous par semaine',
    choix: {
      'presque tous les jours': -8,
      '4 fois': -5,
      '3 fois': -3,
      '2 fois': -2,
      'Une fois ou moins souvent': -1,
      'jamais': 0
    }
  },
  {
    categorie: 'alcool',
    texte: 'Vous êtes-vous déjà endormi(e) ou évanoui(e) ' +
        'dans un bar ou une boîte ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà fait un coma éthylique ?',
    choix: {'oui': -5, 'non': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà fumé une cigarette ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà fumé un joint ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà coulé une douille ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà bu dès le matin ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà pris de la drogue dès le matin ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Quelle a été votre plus longue période bourré(e) ?',
    choix: {
      '48h ou +': -4,
      '24h durant': -4,
      'toute une nuit': -2,
      '4h ou moins': -1,
      'je ne bois jamais': 0
    }
  },
  {
    categorie: 'morale',
    texte: 'Possédez-vous une bible ou un autre ' +
        'livre saint (coran, torah, ...) ?',
    choix: {'j’en ai plusieurs': 4, 'oui': 2, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà été à l’église volontairement ' +
        '(ou dans un autre lieux saint) ?',
    choix: {'souvent': 8, 'quelquefois': 2, 'jamais': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà essayer une drogue dure (cocaine, héroine, ...) ?',
    choix: {'plusieurs': -8, 'oui': -4, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà fait de la prison ?',
    choix: {'+ de 6 mois': -8, 'Moins de 6 mois': -4, 'jamais': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà blessé volontairement quelqu’un ?',
    choix: {
      'Plusieurs fois': -8,
      'oui': -4,
      'non': 0
    }
  },
  {
    categorie: 'drogue',
    texte: 'Consommez-vous des drogues régulièrement ?',
    choix: {
      'presque tous les jours': -8,
      '4 fois': -5,
      '3 fois': -3,
      '2 fois': -2,
      'Une fois ou moins souvent': -1,
      'jamais': 0
    }
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà vendu de la drogue ?',
    choix: {'oui': -3, 'non': 0}
  },
  {
    categorie: 'drogue',
    texte: 'Avez-vous déjà vendu de la drogue ' +
        'pour financer votre propre consommation ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu un rendez-vous amoureux ?',
    choix: {'oui': 5, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà pris un bain ou une douche ' +
        'avec un membre du sexe opposé ?',
    choix: {'oui': 1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà payé pour le sexe ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà profité de quelqu’un pendant qu’il/elle était ' +
        'ivre, drogué(e), ou momentanément handicapé(e) ?',
    choix: {'oui': -3, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà soulé ou drogué quelqu’un ' +
        'pour en abuser sexuellement et réussi ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà été impliqué(e) dans une fellation' +
        ' ou un cunnilingus ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Jusqu’à l’orgasme ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu un rapport anal ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà fait un 69 ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà eu une MST (maladie sexuellement transmissible) ?',
    choix: {'oui': -5, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà transmis une MST ?',
    choix: {'oui': -5, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Volontairement ?',
    choix: {'oui': -10, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'sans utiliser de moyen de contraception ?',
    choix: {'oui': 0, 'non': 1}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà subi ou été à l’origine d’un avortement ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'avec plus d’une personne en même temps ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'avec plus de deux personnes dans la même semaine ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles dans un lieu public ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des brûlures de tapis (brûlures dues aux ' +
        'frottements sur un tapis plutôt rugueux) ' +
        'lors d’une relation sexuelle ?',
    choix: {'oui': -1, 'non': 0}},
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des rapports homosexuels ' +
        '(ou contraires à votre appartenance sexuelle) ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des expériences sado-masochistes ' +
        'ou pratiqué le bondage ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà utilisé des sex toys ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Vous êtes-vous déjà endormi(e) ou évanoui(e) ' +
        'pendant l’acte sexuel ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà été responsable de la perte de la virginité de ' +
        'quelqu’un, et si oui, de combien de personnes ?',
    choix: {
      '3 ou +': -1,
      '2 personnes': -1,
      'Une personne': -1,
      'non': 0
    }
  },
  {
    categorie: 'sexe',
    texte: 'Avez vous déjà répondu à un appel pendant un acte sexuel ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà acheté quelque chose dans un sex-shop ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà léché un oeil, un orteil, ou une oreille ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'avec quelqu’un de votre famille ?',
    choix: {'oui': -4, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous hésité avant de répondre à la question précédente ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà dormi dans les toilettes ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous vous-même été volontaire pour dormir à cet endroit ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Est-ce que la zoophilie, la nécrophilie ou ' +
        'la pédophilie vous attire ou vous excite ?',
    choix: {'oui': -5, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu un coup d’une nuit ? ' +
        '(une histoire d’un soir avec relation sexuelle)',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà eu un coup d’une nuit, et quitté ' +
        'votre partenaire sans même lui dire aurevoir ?',
    choix: {'oui': -5, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles avec plus ' +
        'd’une personne de la même famille ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles avec une personne qui ' +
        'était déjà engagée dans une relation avec quelqu’un d’autre ?',
    choix: {'oui': -3, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles avec un(e) ami(e) ' +
        'de votre partenaire officiel(le) ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles avec quelqu’un qui ' +
        'était beaucoup plus vieux ou plus jeune que vous ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous hésité avant de répondre à la question précédente ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles contre de l’argent ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà mangé votre vomi ou celui de quelqu’un d’autre ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà mis des aliments dans votre ' +
        'nez juste pour rigoler ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà participé à une douche dorée ' +
        '(uriner sur quelqu’un d’autre ou se faire uriner dessus ' +
        'par quelqu’un d’autre) ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà été voyeur(euse) ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Combien de fois par semaine regardez-vous des films ' +
        'ou des images pornographique ?',
    choix: {
      '3 fois ou +': -3,
      '2 fois': -2,
      'Une fois ou moins souvent': -1,
      'jamais': 0
    }
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà simulé un orgasme ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà posé un lapin à quelqu’un ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Etes-vous déjà sorti(e) avec quelqu’un juste pour le sexe ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles sur le pouce ' +
        '(entre deux cours, dans la rue, le tout dans l’urgence, ' +
        'sans préliminaires ou presque) ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà travaillé pour une oeuvre charitative ?',
    choix: {'oui': 8, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez vous déjà tricher pendant un examens ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez vous déjà fait boire votre urine à quelqu’un d’autre ?',
    choix: {'oui': -3, 'Oui, avec du jus de fruit': -5, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez vous déjà détruit un bien public ?',
    choix: {'oui': -2, 'Ça m’arrive souvent': -3, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez vous déjà volé un(e) ami(e) ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà volé dans un magasin/supermarché ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'alcool',
    texte: 'Avez-vous déjà volé de l’alcool (y compris dans un bar) ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Vous êtes-vous déjà uriné dessus quand vous êtiez ivre ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles pour gagner un pari ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà exhibé vos parties génitales en public ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'pour avoir un travail ou une promotion ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous déjà été infidèle ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'avec le/la partenaire d’un(e) de vos ami(e)s ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous déjà vomi dans un lieu public ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Vous êtes-vous déjà réveillé(e) en vous demandant où vous êtiez ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Vous êtes-vous déjà réveillé(e) en vous demandant où vous êtiez ' +
        'et qui était la personne à côté de vous ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Vous êtes-vous déjà posé des questions sur la vie ' +
        'sexuelle des personnages de dessins-animés ?',
    choix: {'oui': -1, 'non': 1}
  },
  {
    categorie: 'hygiene',
    texte: 'Avez-vous un tatouage ?',
    choix: {'oui': -1, 'non': 0}
  },
  {
    categorie: 'sexe',
    texte: 'Avez-vous déjà eu des relations sexuelles ' +
        'que vous regrettez maintenant ?',
    choix: {'oui': -1, 'non': 1}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous effectué un des actes de ce test ' +
        'exprès pour améliorer votre score ?',
    choix: {'oui': -2, 'non': 0}
  },
  {
    categorie: 'morale',
    texte: 'Avez-vous répondu honnêtement aux question ?',
    choix: {'oui': 1, 'non': -1}
  }
];


/**
 * Numéro de la question courante
 * @type {number}
 */
var questionCourante = 0;


/**
 * Ouvre une fenêtre pour envoyer les résultats par mail
 */
function afficherEnvoiResultats() {

  /** @type {string} */
  var resultat = '';

  for (var categorie in scores) {
    resultat += categorie + ' : ' + scores[categorie] + '\n';
  }

  // On ouvre une popup pour envoyer un mail. Normalement soit cela ouvre le
  // logiciel de messagerie de l'utilisateur, soit la messagerie web (gmail...)
  // Avec un sujet et un corps de mail pré-rempli.
  window.open('mailto:' +
      prompt('Quelle est votre adresse email ?') +
      '?subject=Test%20de%20purete&body=' +
      escape('Voici le resultat de votre test de purete :\n\n' + resultat +
             '\n\n' + document.location));
}


/**
 * Incrémente le compteur associé à la réponse de l'utilisateur
 * @param {Event} e La réponse choisie.
 */
function compterPoint(e) {

  /** @type {string} Réponse choisie à la question */
  const reponse = String(e.target.innerHTML);

  /** @type {number} Combien de points rapporte la question */
  const points = questions[questionCourante].choix[reponse];

  // On incrémente le kharma
  scores['kharma'] += points * coefs['kharma'];

  // On incrémente le score de la catégorie correpondante à la question courante
  scores[questions[questionCourante].categorie] +=
      points * coefs[questions[questionCourante].categorie];

  /** @type {string} Nom du niveau atteint (pour chaque catégorie) */
  var r;

  /** @type {string} Contenu HTML de la liste des scores */
  var html;

  // On parcourt les scores de chaque catégorie
  for (var n in scores) {
    r = '?';

    // On détermine le nom du niveau atteint dans chaque catégorie
    for (var v in niveaux) {
      if (scores[n] >= niveaux[v]) {
        r = v;
        break;
      }
    }

    html = '';

    for (var v in niveaux) {
      html += '<b class="' + v + ((r == v) ? ' k' : '') + '">' + v + '</b>';
    }

    fillNode(getId('b'), html);

    getId(n).innerHTML = n + tag('b', Math.round(scores[n]) + '<br>' + r);

    getId(n).className = document.body.className = r;
  }

  // Si l'on n'a pas atteint la dernière question, on affiche la suivante
  if (questionCourante < questions.length - 1) {
    questionCourante++;
    afficherQuestion();

  // Si le questionnaire est fini, on affiche le résultat et on propose l'envoi
  // des résultats par email.
  } else {

    /** @type {string} Niveau final en kharma */
    const pk = getId('kharma').getElementsByTagName('b').item(0)
                   .innerHTML.split('<br>')[1];

    conteneur.innerHTML = '<p><big><big>' +
                          'C’est fini : Vous êtes <b>' + pk + '</b> ' +
                          '(' + scores['kharma'] + ' points)' +
                          '</big></big></p>' +
                          button('send', 'Recevoir mon résultat par mail');

    getId('send').onclick = afficherEnvoiResultats;
  }
}


/**
 * Affiche la question suivante
 */
function afficherQuestion() {

  // On affiche la question
  fillNode(conteneur, tag('p', questions[questionCourante].texte));

  // On affiche la liste des choix possibles
  for (var r in questions[questionCourante].choix) {
    fillNode(appendNode(conteneur, 'button'), r)
        .addEventListener('click', compterPoint);
  }
}


/**
 * Affiche la liste des questions dans un tableau
 */
function afficherListeQuestions() {

  /** @type {string} */
  var html = '<table border=1>' + tag('tr',
                                      tag('th', 'Type') +
                                      tag('th', 'Question') +
                                      tag('th', 'Choix (points)'));

  /** @type {string} Liste des choix d'une question */
  var o;

  /** @type {{categorie: string, texte: string, choix: Object}} */
  var question;

  for (var q = 0; q < questions.length; q++) {
    o = '';
    question = questions[q];

    for (var r in question.choix) o += r + ' (' + question.choix[r] + '), ';

    html += tag('tr',
                tag('td', question.categorie) +
                '<td align=left>' + question.texte + '</td>' +
                tag('td', o));
  }

  fillNode(conteneur, html + '</table>');
}


/** Initialisation du questionnaire */
function demarrage() {

  /** @type {string} Tableau HTML des scores */
  var tableauScores = '';

  for (var n in scores) tableauScores += tag('li', '', n);

  fillNode(create('body'),
           tag('h1', '<a href=.>TEST DE PURETÉ</a>') +
           tag('ul', tableauScores) +
           tag('div',
               '<img src=favicon.png width=57 height=57>' +
               '<p>Ce jeu d’un goût douteux vous en apprendra ' +
               'beaucoup sur vous-même…</p>' + button('Commencer') +
               tag('footer',
                   tag('a', 'Liste des questions', 'liste') + '. ' +
                   'Inspiré du <a href="http://test.griffor.com">' +
                   'griffor</a>, créé par <a href=//boudah.pl>Boudah</a> ' +
                   'de l’association <a href=//talenka.org>Talenka</a>'), 'j') +
                   tag('nav', '', 'b'));

  conteneur = getId('j');

  getId('Commencer').addEventListener('click', afficherQuestion);
  getId('liste').addEventListener('click', afficherListeQuestions);
}


// Quand la page est complètement chargée, on démarre
window.addEventListener('load', demarrage);
