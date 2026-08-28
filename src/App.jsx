import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  LayoutGrid,
  BookOpen,
  ClipboardList,
  FileText,
  TrendingUp,
  Network,
  Scale,
  Target,
  Shield,
  Activity,
  Moon,
  Sun,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Check,
  Users,
  LogOut,
  RotateCcw,
  Volume2,
  Menu,
  X,
  Calendar,
  MessageCircle,
  Search,
} from "lucide-react";

/* ----------------------------- THEME ----------------------------- */

const LIGHT = {
  bg: "#EDEEE9",
  card: "#FFFFFF",
  navy: "#131D30",
  gold: "#B08A34",
  goldSoft: "#DDC98E",
  red: "#8F2D26",
  green: "#2F6E3C",
  ink: "#1A1E27",
  slate: "#5C6474",
  line: "#DDDCD4",
  sidebar: "#131D30",
};

const DARK = {
  bg: "#0D1320",
  card: "#161F33",
  navy: "#0A1120",
  gold: "#D6B871",
  goldSoft: "#8A7645",
  red: "#C0564A",
  green: "#5DA36A",
  ink: "#EDEEF2",
  slate: "#9AA3B5",
  line: "#2A3552",
  sidebar: "#0A1120",
};

/* ----------------------------- DATA ----------------------------- */

const NAV_SECTIONS = [
  {
    label: "Révision",
    items: [
      { id: "dashboard", label: "Tableau de service", icon: LayoutGrid },
      { id: "fiches", label: "Fiches synthèse", icon: FileText },
      { id: "articles", label: "Articles de loi", icon: Scale },
    ],
  },
  {
    label: "Entraînement",
    items: [
      { id: "examens", label: "Examens blancs", icon: ClipboardList },
      { id: "pv", label: "Entraînement PV", icon: FileText },
      { id: "exemple-pv", label: "Exemple PV", icon: FileText },
    ],
  },
  {
    label: "Suivi",
    items: [
      { id: "support", label: "Support", icon: MessageCircle },
    ],
  },
];

const MATIERES = [
  { nom: "Droit pénal général", couleur: "red", fiches: 28 },
  { nom: "Droit pénal spécial", couleur: "gold", fiches: 29 },
  { nom: "Procédure pénale", couleur: "navy", fiches: 10 },
  { nom: "Institution et valeurs", couleur: "gold", fiches: 8 },
  { nom: "Déontologie & discipline", couleur: "gold", fiches: 8 },
  { nom: "Technique & sécurité en intervention", couleur: "red", fiches: 13 },
  { nom: "Secourisme (SST)", couleur: "gold", fiches: 11 },
  { nom: "Circulation & sécurité routière", couleur: "navy", fiches: 7 },
];

const DOC_DPG_DPS_AVANCE = {
  titre: "D.P.S. / D.P.G. (socle avancé)",
  sections: [
    {
      numero: 1,
      titre: "Généralités",
      fiches: [
        {
          titre: "Le droit pénal — les grands principes",
          reference: "Art. 111-3, 121-1, 112-1 du Code pénal — Art. 8 DDHC",
          definition: "Le droit pénal organise la répression des faits portant atteinte à la paix publique ; les actes répréhensibles sont appelés infractions. Il est traditionnellement considéré comme une discipline mixte, relevant à la fois du droit privé et du droit public.",
          plan: [
            { niveau: "I", titre: "La légalité des infractions et des peines", texte: "Proclamé par l'**article 8 de la Déclaration des droits de l'homme et du citoyen** et repris par l'**article 111-3 du code pénal**, ce principe établit qu'il n'y a **ni infraction, ni peine sans loi préexistante**. Aucun fait ne peut faire l'objet de poursuites s'il n'a pas été expressément prévu par un texte." },
            { niveau: "II", titre: "La personnalité des peines", texte: "Ce principe oblige le juge à ne sanctionner que **l'auteur, le co-auteur ou le complice** d'une infraction. L'article 121-1 du code pénal dispose : « Nul n'est responsable pénalement que de son propre fait. »" },
            { niveau: "III", titre: "L'individualisation (ou personnalisation) de la peine", texte: "Elle est réalisée par la possibilité pour le juge de **moduler la peine** ou de choisir celle qui est la mieux adaptée à la **personnalité du condamné**." },
            { niveau: "IV", titre: "La non-rétroactivité de la loi pénale", texte: "En matière pénale, le principe est la non-rétroactivité de la loi. L'article 112-1 C.P. précise : « Sont seuls punissables les faits constitutifs d'une infraction à la date à laquelle ils ont été commis. » En conséquence, si une infraction est commise et qu'une loi nouvelle en modifie les conditions de répression, cette loi nouvelle **ne pourra pas s'appliquer** et la loi ancienne continuera à jouer. **Exception** : ce principe est limité aux hypothèses où la loi est plus sévère — les lois pénales plus douces peuvent être appliquées à des faits antérieurs, lorsqu'aucune condamnation définitive n'a encore été prononcée." },
          ],
        },
        {
          titre: "Les immunités et les inviolabilités",
          reference: "Art. 29 conv. Vienne — Art. 311-12 C.P.",
          plan: [
            { niveau: "I", titre: "Les immunités diplomatiques et consulaires", texte: "Le droit international garantit aux diplomates et aux consuls le bénéfice de certaines immunités, et restreint les compétences normalement reconnues à l'État d'accueil. Le diplomate représente à titre permanent un État auprès d'un autre État ou d'une organisation internationale ; le consul protège ses compatriotes à l'étranger.", enfants: [
              { niveau: "A", titre: "Inviolabilité de la personne", texte: "Accordée aux diplomates et aux consuls généraux (art. 29 conv. Vienne). L'agent diplomatique **ne peut être soumis à aucune forme d'arrestation ou de détention** ni à aucune atteinte à la liberté et à la dignité. Les membres de sa famille et les domestiques officiels bénéficient des mêmes droits (sauf s'ils sont ressortissants de l'État accréditaire). Sauf convention expresse, le personnel des consulats et les organisations internationales **ne bénéficient pas** de l'immunité en cas de crime grave." },
              { niveau: "B", titre: "Inviolabilité des locaux diplomatiques et consulaires", texte: "Le siège de la mission bénéficie de l'immunité. Les agents de l'État d'accueil (policier, huissier...) ne peuvent y pénétrer qu'avec le **consentement ou la demande écrite** du chef de mission. **Aucune perquisition** sans son accord. S'étend aux archives, à la correspondance officielle, au domicile privé et aux biens du diplomate — impossibilité de perquisition, réquisition, saisie ou mesure d'exécution." },
            ]},
            { niveau: "II", titre: "Les immunités parlementaires", texte: "Ensemble de règles destinées à garantir l'indépendance des parlementaires, qui doivent pouvoir exercer leur mandat sans redouter des actions judiciaires limitant leur liberté de parole. On distingue deux catégories : l'irresponsabilité et l'inviolabilité.", enfants: [
              { niveau: "A", titre: "L'irresponsabilité parlementaire", texte: "Soustrait les parlementaires à toute poursuite pénale ou civile pour les **actes liés à la fonction** (interventions et votes en séance/commissions, rapports, avis, questions, missions confiées par les instances parlementaires). Elle **ne peut être levée par aucune procédure** : elle est **permanente** (s'applique même entre les sessions) et **perpétuelle** (s'oppose aux poursuites même après la fin du mandat). Les actes **non liés** à la fonction (propos en réunion électorale, cérémonie officielle, manifestation d'un parti...) ne sont **pas couverts**." },
              { niveau: "B", titre: "L'inviolabilité parlementaire", texte: "Évite que l'exercice du mandat ne soit entravé par des poursuites visant des actes de simple citoyen. L'engagement de poursuites **n'est soumis à aucune autorisation particulière**, dès lors qu'il ne comporte pas de mesure privative/restrictive de liberté (les poursuites peuvent être suspendues le temps de la session). Pour toute **arrestation** ou mesure privative de liberté, l'autorité judiciaire doit obtenir l'**autorisation du Bureau** de l'assemblée. **En cas de crime ou délit flagrant**, cette autorisation n'est pas requise : le parlementaire peut être arrêté et placé en garde à vue." },
            ]},
            { niveau: "III", titre: "L'immunité familiale", reference: "Art. 311-12 C.P.", texte: "Ne peut donner lieu à des poursuites pénales le vol commis au préjudice :", points: ["D'un **ascendant** (père, mère, grands-parents, aïeux).", "D'un **descendant** (enfants, petits-enfants, arrière-petits-enfants).", "Du **conjoint marié** uniquement — les époux séparés de corps ou autorisés à résider séparément n'en bénéficient pas."], enfants: [
              { titre: "L'immunité familiale ne s'applique pas", points: ["Lorsque la chose soustraite est un objet/document indispensable à la vie quotidienne : pièce d'identité, titre de séjour, moyen de paiement, moyen de télécommunication.", "Lorsque l'auteur est le tuteur, curateur, mandataire spécial (sauvegarde de justice), personne habilitée (habilitation familiale) ou mandataire (mandat de protection future) de la victime — y compris s'il est aussi son ascendant/descendant/conjoint."] },
              { titre: "Extension", texte: "S'applique de la même façon en cas d'**extorsion, de chantage, d'escroquerie et d'abus de confiance**." },
            ]},
          ],
        },
        {
          titre: "La responsabilité pénale : les causes d'irresponsabilité ou d'atténuation",
          reference: "Art. 122-1 à 122-9 du Code pénal",
          definition: "Nul n'est responsable que de son propre fait (art. 121-1 C.P.). La responsabilité n'est pas un élément de l'infraction : elle en est l'effet et la conséquence juridique. Dans certaines situations, un individu ayant commis une infraction n'en sera pas jugé responsable, en raison de circonstances particulières prévues par le code pénal.",
          plan: [
            { niveau: "I", titre: "La minorité", reference: "Art. 122-8 C.P.", texte: "Les mineurs capables de discernement sont pénalement responsables (art. L.11-1 C.J.P.M.), en tenant compte de l'atténuation liée à leur âge. Les mineurs de **moins de 13 ans** bénéficient d'une **présomption de non-discernement** ; ceux de **13 ans et plus** sont présumés capables de discernement. Le mineur doit avoir **compris et voulu** son acte et être apte à comprendre la procédure — appréciation du **magistrat**, non de l'enquêteur.", points: ["La présomption de non-discernement n'interdit pas l'audition (libre pour <13 ans, ou retenue pour 10-13 ans).", "Jusqu'à 13 ans : seulement des mesures éducatives (avertissement judiciaire, mesure éducative judiciaire).", "Seul le mineur de plus de 10 ans peut faire l'objet de mesures éducatives judiciaires imposant une obligation/interdiction.", "Après 13 ans : mesures éducatives et, si les circonstances l'exigent, des peines diminuées.", "La réponse pénale doit comporter une dimension éducative (accompagnement, formation, suivi médical/psychologique)."] },
            { niveau: "II", titre: "L'atteinte d'un trouble psychique ou neuropsychique", reference: "Art. 122-1 C.P.", texte: "Deux manifestations possibles au moment des faits :", points: ["Le trouble ayant **aboli** le discernement ou le contrôle des actes (perte **totale**) → entraîne l'**irresponsabilité pénale**.", "Le trouble ayant seulement **altéré** le discernement ou entravé le contrôle des actes → n'exclut pas la sanction, mais la responsabilité **peut être atténuée** par la juridiction."], enfants: [
              { titre: "Exception", texte: "La responsabilité peut néanmoins être retenue lorsque l'abolition/altération temporaire résulte de la **consommation volontaire de substances psychoactives**, dans un temps très voisin de l'action, dans le but de commettre un crime/délit ou d'en faciliter la commission (art. 122-1-1 et 122-1-2 C.P.)." },
            ]},
            { niveau: "III", titre: "La contrainte", reference: "Art. 122-2 C.P.", texte: "Physique ou morale, la contrainte est une **force irrésistible** qui, agissant sur la volonté, supprime la liberté de décision et force à commettre un acte qu'on n'aurait pas fait dans des circonstances normales. Elle **anéantit la responsabilité**.", points: ["**Contrainte physique** : force matérielle, irrésistible et imprévisible, obligeant à accomplir un acte défendu ou à ne pas accomplir un acte obligatoire.", "**Contrainte morale** : crainte inspirée à une personne, agissant sur sa volonté avec une force irrésistible."] },
            { niveau: "IV", titre: "L'erreur de droit", reference: "Art. 122-3 C.P.", texte: "Reconnue lorsque l'auteur justifie avoir commis une erreur sur le droit, qu'il **n'était pas en mesure d'éviter**, et en raison de laquelle il a cru pouvoir légitimement accomplir l'acte. Ex : information erronée fournie par l'administration interrogée préalablement, ou défaut de publication du texte normatif." },
            { niveau: "V", titre: "Les faits justificatifs", enfants: [
              { niveau: "A", titre: "L'acte prescrit ou autorisé par des dispositions législatives et réglementaires", texte: "Art. 122-4 al.1 C.P. Ex : le médecin à qui la loi impose de déclarer certaines maladies contagieuses n'est pas punissable de violation du secret professionnel." },
              { niveau: "B", titre: "L'acte légal commandé par l'autorité légitime", texte: "Art. 122-4 al.2 C.P. Ex : en maintien de l'ordre, l'usage de la force par les policiers pour repousser des manifestants n'est pas constitutif de « violences par agents de la force publique » si l'interdiction est légale et l'ordre donné par l'autorité légitime. **Il n'y a pas de justification lorsque l'ordre est manifestement illégal.**" },
              { niveau: "C", titre: "La légitime défense", texte: "Art. 122-5 et 122-6 C.P. — abordée dans une fiche spécifique (voir « Légitime défense » et « Usage des armes »)." },
              { niveau: "D", titre: "L'état de nécessité", reference: "Art. 122-7 C.P.", texte: "Vise les situations où une personne commet volontairement une infraction pour éviter à elle-même ou à autrui un mal grave ou imminent. Ex : le pompier qui pénètre dans le jardin d'autrui par bris de clôture pour combattre plus efficacement l'incendie voisin.", points: ["**Conditions** : un danger actuel ou imminent menaçant une personne/bien ; la nécessité de commettre l'infraction pour le sauvegarder ; des moyens non disproportionnés par rapport à la gravité de la menace.", "**Effets** : entraîne l'absence de toute responsabilité pénale (pas de faute pénale, pas de sanction). Au plan civil, l'auteur peut devoir indemniser la victime. En cas de pénétration dans une habitation par un pompier/policier, la responsabilité sera administrative en cas de bris de porte par nécessité."] },
              { niveau: "E", titre: "Le lanceur d'alerte", reference: "Art. 122-9 C.P.", texte: "N'est pas pénalement responsable la personne qui porte atteinte à un secret protégé par la loi, dès lors que la divulgation est **nécessaire et proportionnée** à la sauvegarde des intérêts en cause — ni celle qui soustrait/détourne/recèle les documents contenant les informations, dans les conditions de l'art. 122-9 al.1.", points: ["**Définition** : personne physique qui révèle/signale, de manière **désintéressée et de bonne foi**, un crime/délit, une violation grave d'un engagement international/de la loi/du règlement, ou une menace grave pour l'intérêt général (loi du 9/12/2016).", "**Exclusions** : secret de la défense nationale, secret médical, secret avocat-client — un dépassement peut exposer à des sanctions (ex : dénonciation calomnieuse, art. 226-10 C.P.).", "**Procédure** : alerte adressée au supérieur hiérarchique/employeur d'abord ; à défaut de diligence dans un délai raisonnable, à l'autorité judiciaire/administrative/ordre professionnel ; le Défenseur des droits peut orienter tout signalement."] },
            ]},
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "Les compétences des acteurs de la police judiciaire",
      fiches: [
        {
          titre: "Compétences des O.P.J.",
          reference: "Art. 12 à 19, 78-3 du Code de procédure pénale",
          plan: [
            { niveau: "I", titre: "La compétence territoriale des O.P.J.", enfants: [
              { niveau: "A", titre: "La compétence ordinaire", reference: "Art. 18 al.1 et A34 C.P.P.", texte: "Les O.P.J. sont compétents dans les limites territoriales où ils exercent leurs fonctions habituelles. Le ressort varie selon le service : ensemble du territoire national, une ou plusieurs zones de défense, ou l'ensemble d'un département/collectivité d'outre-mer." },
              { niveau: "B", titre: "L'extension de compétence", reference: "Art. 18 al.3 C.P.P.", texte: "Les O.P.J. peuvent se transporter sur toute l'étendue du territoire national pour poursuivre leurs investigations (auditions, perquisitions, saisies), après avoir **informé** le procureur ou le juge d'instruction saisi — **aucune autorisation expresse** n'est nécessaire. Ils doivent être assistés d'un O.P.J. territorialement compétent si ce magistrat le décide. Possible **quel que soit le cadre d'enquête**. L'information n'est **pas nécessaire** dans un ressort limitrophe (Paris + Hauts-de-Seine + Seine-Saint-Denis + Val-de-Marne = un seul département à cette fin)." },
            ]},
            { niveau: "II", titre: "Les attributions des O.P.J.", texte: "Chargés de constater les infractions, d'en rassembler les preuves et d'en rechercher les auteurs tant qu'une information n'est pas ouverte. Placés sous la direction du procureur, ils lui rendent compte sans délai et transmettent leurs PV dès la clôture des opérations.", enfants: [
              { niveau: "A", titre: "La réception des plaintes et dénonciations", reference: "Art. 17 C.P.P.", texte: "Tout dépôt de plainte fait l'objet d'un PV et donne lieu à un **récépissé** et au formulaire d'information des droits des victimes (copie du PV remise sur demande). Les O.P.J. sont secondés par les A.P.J. et A.P.J.A., qui portent immédiatement les crimes/délits constatés à leur connaissance." },
              { niveau: "B", titre: "La recherche des infractions", texte: "Devoir d'agir spontanément pour rechercher crimes, délits et contraventions, en appréciant les moyens et méthodes dans le cadre des lois et règlements." },
              { niveau: "C", titre: "La constatation des infractions", reference: "Art. 14 C.P.P.", texte: "Constater les infractions, en rassembler les preuves, en rechercher les auteurs tant qu'une information n'est pas ouverte." },
            ]},
            { niveau: "III", titre: "Les pouvoirs des O.P.J.", enfants: [
              { niveau: "A", titre: "La réquisition de la force publique", reference: "Art. 17 C.P.P.", texte: "L'O.P.J. peut requérir directement la force publique." },
              { niveau: "B", titre: "La vérification d'identité et de situation", texte: "Le **contrôle** d'identité peut être fait par un A.P.J. sur ordre de l'O.P.J. ; la **vérification** d'identité est de la **seule compétence de l'O.P.J.** (art. 78-3 C.P.P.) — un A.P.J. peut néanmoins notifier les droits à la personne retenue. La vérification de situation liée au terrorisme relève aussi de l'O.P.J. (art. 78-3-1 C.P.P.)." },
              { niveau: "C", titre: "La vérification du droit au séjour", texte: "L'O.P.J. est seul compétent pour décider, sous contrôle du procureur, d'une retenue pour vérification du droit de circulation/séjour (art. L.813-1 à L.813-4 CESEDA)." },
              { niveau: "D", titre: "La garde à vue", texte: "Décidée d'office par un O.P.J., ou sur instruction du procureur (flagrance : art. 63 ; préliminaire : art. 77) ou du juge d'instruction (commission rogatoire : art. 154). Mesure sous le contrôle des magistrats." },
              { niveau: "E", titre: "La perquisition et la fouille intégrale", texte: "En flagrance ou commission rogatoire, l'O.P.J. peut l'imposer (hors préliminaire, où elle se fait avec l'accord de la personne). Pour un crime/délit puni ≥3 ans en préliminaire, possible sans assentiment durant les heures légales, sur autorisation du JLD à la requête du procureur (art. 76 al.4). Les A.P.J. assistent l'O.P.J. La **fouille intégrale** (art. 63-7) est assimilée à une perquisition, mais sans obligation de respecter les heures légales." },
              { niveau: "F", titre: "Les saisies", texte: "En flagrance/commission rogatoire, l'O.P.J. procède aux saisies (scellés), y compris sur des objets appréhendés provisoirement par les A.P.J. En préliminaire, seulement avec l'**assentiment exprès** (sauf exceptions art. 76 al.4).", points: ["Pour les enquêtes de violences, l'O.P.J. peut saisir d'initiative ou sur instruction du procureur les armes détenues ou accessibles par le suspect, quel que soit le lieu."] },
              { niveau: "G", titre: "Les prélèvements externes", texte: "Sur toute personne susceptible de fournir des renseignements (témoin) ou soupçonnée : prise d'empreintes, spécimen d'écriture, prélèvement buccal (non assimilé à un prélèvement interne). Seuls les prélèvements des personnes soupçonnées peuvent être intégrés au **F.N.A.E.G.**" },
            ]},
          ],
        },
        {
          titre: "Compétences des A.P.J. et A.P.J.A.",
          reference: "Art. 20 et 21 du Code de procédure pénale",
          definition: "La police judiciaire est composée des O.P.J., des A.P.J. et A.P.J.A., des assistants d'enquête et des fonctionnaires auxquels sont attribuées certaines fonctions de police judiciaire.",
          plan: [
            { niveau: "I", titre: "La compétence territoriale des A.P.J. et A.P.J.A.", texte: "Compétents dans les limites où ils exercent leurs fonctions habituelles, ou dans celles où l'O.P.J. auprès duquel ils sont mis à disposition exerce les siennes. Lorsqu'ils secondent un O.P.J., compétence dans les limites où celui-ci exerce ses attributions (art. 18 C.P.P.)." },
            { niveau: "II", titre: "Les attributions judiciaires", enfants: [
              { niveau: "A", titre: "Les agents de police judiciaire (A.P.J.)", reference: "Art. 20 C.P.P.", texte: "Secondent les O.P.J. dans l'exercice de leurs fonctions. **N'ont pas la qualité pour décider des mesures de garde à vue.**", enfants: [
                { niveau: "1", titre: "En enquête de flagrant délit", texte: "Constatent crimes/délits/contraventions et en dressent PV. Sur ordre de l'O.P.J., entendent les personnes utiles et reçoivent leurs déclarations par PV. Sous contrôle de l'O.P.J., peuvent procéder à certaines réquisitions." },
                { niveau: "2", titre: "En enquête préliminaire", texte: "D'office ou sur instructions du procureur/chefs hiérarchiques. Peuvent effectuer presque tous les actes sous contrôle de l'O.P.J. (art. 75). **Perquisitions et saisies** possibles seulement avec l'**assentiment exprès** (art. 76). Peuvent procéder à certaines réquisitions et prélèvements externes sous contrôle." },
                { niveau: "3", titre: "En commission rogatoire", texte: "Sous contrôle d'un O.P.J., peuvent procéder à certaines réquisitions (avec autorisation expresse du juge d'instruction dans certains cas) et retranscrire interceptions/sonorisations utiles." },
                { niveau: "4", titre: "En cas de mort ou blessures graves de cause inconnue ou suspecte", texte: "Sous contrôle de l'O.P.J., se rendent sur les lieux, procèdent aux premières constatations/actes d'enquête, avisent immédiatement le procureur." },
                { niveau: "5", titre: "En cas de disparitions inquiétantes", texte: "Sous contrôle de l'O.P.J. et sur instructions du procureur, peuvent procéder à certains actes d'enquête." },
                { niveau: "6", titre: "Contrôles et vérification d'identité", texte: "Sur ordre et sous responsabilité de l'O.P.J., procèdent à des contrôles d'identité (art. 78-2). Sous contrôle de l'O.P.J., peuvent notifier les droits à une personne retenue pour vérification d'identité (art. 78-3)." },
                { niveau: "7", titre: "Contrôle de situation des étrangers", texte: "Sous contrôle de l'O.P.J., peuvent notifier les droits, motifs de placement et durée maximale de la mesure (art. L.813-5 CESEDA)." },
              ]},
              { niveau: "B", titre: "Les agents de police judiciaire adjoints (A.P.J.A.)", reference: "Art. 21 C.P.P.", texte: "Fonctions judiciaires **moins étendues** que les A.P.J. Secondent O.P.J. et A.P.J. ; rendent compte à leurs supérieurs de tous crimes/délits/contraventions ; constatent les infractions et recueillent les renseignements utiles.", enfants: [
                { niveau: "1", titre: "En flagrant délit", points: ["Ils appréhendent l'auteur.", "Effectuent sur lui une **palpation de sécurité**.", "Portent secours à la victime.", "Conservent les traces et indices.", "Avisent l'O.P.J.", "Conduisent l'auteur devant l'O.P.J. en usant de la force si nécessaire.", "Rédigent un rapport d'intervention."] },
                { niveau: "2", titre: "Constatation des contraventions routières", texte: "Constatent par PV les contraventions routières listées aux art. R.130-1-1, R.130-1-2 et R.130-2 C.R." },
                { niveau: "3", titre: "Constatation de l'outrage sexiste et sexuel", texte: "Constatent par PV la contravention (art. R.625-8-3 C.P.) et le délit (art. 222-33-1-1 C.P.)." },
              ]},
            ]},
            { titre: "Condition de validité des PV des A.P.J.A.", texte: "Doivent être **assermentés** pour que leurs procès-verbaux fassent foi jusqu'à preuve contraire (art. L.130-7 C.R. et art. 537 C.P.P.)." },
          ],
        },
        {
          titre: "Compétences des assistants d'enquête",
          reference: "Art. 21-3 et R.15-17-2 à R.15-17-5 du Code de procédure pénale",
          definition: "Certains militaires du corps de soutien de la gendarmerie, personnels administratifs de catégorie B et A.P.J.A. de la police/gendarmerie peuvent occuper les fonctions d'assistants d'enquête, après une formation certifiée par examen (art. R.15-17-2 C.P.P.).",
          plan: [
            { niveau: "I", titre: "La compétence des assistants d'enquête", texte: "Chargés de seconder les O.P.J. et A.P.J. dans l'accomplissement de certaines formalités procédurales. Ne peuvent agir qu'après avoir **prêté serment** devant le tribunal judiciaire de leur ressort. Tenus au **secret professionnel** (art. 11 et R.15-17-4). Agissent uniquement sur **demande expresse et sous contrôle** de l'O.P.J., ou de l'A.P.J. compétent (art. R.15-17-5). En cas de difficulté, doivent aviser immédiatement l'O.P.J. ou l'A.P.J. compétent." },
            { niveau: "II", titre: "Les attributions judiciaires des assistants d'enquête", reference: "Art. 21-3 et R.15-17-5 C.P.P.", points: ["Convoquer toute personne devant être entendue par un O.P.J./A.P.J., et contacter l'interprète nécessaire.", "Notifier leurs droits aux victimes (art. 10-2 C.P.P.).", "Procéder aux réquisitions des art. 60, 60-3, 77-1, 99-5 C.P.P., ainsi que 60-1/77-1-1 pour les enregistrements de vidéoprotection (avec autorisation préalable si prévue).", "Informer de la garde à vue, par téléphone, un proche/l'employeur/les autorités consulaires (art. 63-2 C.P.P.).", "Procéder aux diligences relatives à l'examen médical du gardé à vue (art. 63-3 C.P.P.).", "Informer l'avocat désigné/commis d'office de la nature et date présumée de l'infraction (art. 63-3-1 C.P.P.).", "Procéder aux convocations en justice de l'art. 390-1 C.P.P.", "Établir le PV des actes précités (nom, qualité, demande, nom/qualité de l'O.P.J./A.P.J. sous l'autorité duquel ils agissent — art. R.15-17-5/I).", "Procéder aux transcriptions d'enregistrements identifiés comme nécessaires par l'OPJ uniquement (art. 100-5 et 706-95-18 C.P.P.), à sa demande expresse et sous son contrôle de fidélité (art. R.15-17-5/II)."] },
          ],
        },
        {
          titre: "Le procureur de la République",
          reference: "Art. 12, 39-3, 40, 41, 42, 54, 68, 75-1 du Code de procédure pénale",
          definition: "Dans ses missions de police judiciaire, le gardien de la paix est susceptible d'agir conformément aux instructions du procureur, sous couvert de la voie hiérarchique. Il existe un procureur auprès de chaque tribunal judiciaire, assisté d'un procureur adjoint et de substituts — l'ensemble constitue « le parquet ».",
          plan: [
            { niveau: "I", titre: "Le procureur dirige l'action de la police judiciaire", texte: "Dirige l'activité des OPJ/APJ dans le ressort de son tribunal (art. 12, 39-3, 41 C.P.P.). Adresse des instructions générales/particulières, contrôle la légalité des moyens, la proportionnalité des actes, l'orientation et la qualité de l'enquête. Veille à ce que les investigations soient à charge et à décharge. Peut requérir tout O.P.J. sur le territoire national. Reçoit plaintes/dénonciations et apprécie la suite (art. 40). A le droit de requérir directement la force publique (art. 42). **N'est pas O.P.J. mais en a tous les pouvoirs et prérogatives.**", enfants: [
              { niveau: "A", titre: "Pouvoirs dans le cas des délits ou crimes flagrants", texte: "Rôle surtout de direction et de coordination des O.P.J./A.P.J. de son ressort, avec possibilité de dessaisir un O.P.J. au profit d'un autre. Informé par tous les PV (art. 19) ; en cas de crime flagrant, doit être avisé **immédiatement** par l'O.P.J., avant même son transport sur les lieux (art. 54). Peut se rendre sur place, dessaisir les O.P.J. de plein droit et accomplir personnellement les actes, ou leur prescrire de poursuivre les opérations (art. 68)." },
              { niveau: "B", titre: "Pouvoirs en enquête préliminaire", texte: "Reçoit les plaintes/dénonciations, directement ou par PV des O.P.J./A.P.J. Sur instruction de procéder à une enquête préliminaire, fixe le délai (art. 75-1 al.1). Si l'enquête est menée d'office, les O.P.J. lui rendent compte au-delà de 6 mois (art. 75-1 al.2).", points: ["Durée de droit commun : **2 ans** depuis le 1er acte de contrainte (audition libre, garde à vue, perquisition), quel que soit le cadre — appréciée individuellement pour chaque personne mise en cause.", "Le procureur peut prolonger d'**1 an supplémentaire** (autorisation écrite et motivée, versée en procédure).", "À titre exceptionnel, après une 1re prolongation, prolongation possible d'1 an renouvelable une fois → durée maximale de l'enquête préliminaire de droit commun : **5 ans**."] },
            ]},
            { titre: "Le contrôle de la garde à vue", texte: "Dans les deux cadres (préliminaire ou flagrance), le procureur exerce un contrôle et une surveillance des O.P.J., notamment sur les atteintes aux libertés individuelles. Il **contrôle les mesures de garde à vue** (art. 41 al.4), visite les locaux chaque fois qu'il l'estime nécessaire et **au moins une fois par an**, peut contrôler le registre ou se déplacer au commissariat. Avisé par l'O.P.J. de chaque placement, il décide des prolongations éventuelles et peut désigner d'office un médecin (art. 63-3 al.2)." },
            { niveau: "II", titre: "L'exercice de l'action publique", texte: "Dès qu'il est en possession des éléments nécessaires, le procureur « apprécie la suite à donner » (art. 40 al.1), selon la gravité des faits :", points: ["**Classer sans suite** la procédure (infraction non constituée, non imputable, ou preuve insuffisante) — non susceptible de recours, mais peut être remis en cause si des éléments nouveaux apparaissent. Les plaignants/victimes sont avisées (art. 40-2 al.2) et informées qu'elles peuvent demander une copie du dossier (art. D.15-3-2).", "**Mettre en œuvre une procédure alternative aux poursuites** (art. 41-1) : rappel à la loi (avertissement pénal probatoire), orientation vers une structure sanitaire/sociale/professionnelle, régularisation de situation, réparation du dommage, médiation auteur-victime (sauf violences conjugales, où elle est impossible), obligation de résider hors du domicile familial (violences conjugales/intrafamiliales), interdiction de paraître (≤6 mois) dans certains lieux, interdiction d'entrer en relation avec la victime/co-auteurs, contribution citoyenne auprès d'une association d'aide aux victimes."] },
          ],
        },
        {
          titre: "Le juge d'instruction",
          reference: "Art. 49, 51, 68, 92 à 154 du Code de procédure pénale",
          definition: "Le juge d'instruction est un magistrat que le gardien de la paix rencontre notamment lors de transferts ou d'exécution de mandats. Choisi parmi les juges du tribunal judiciaire, nommé pour 3 ans renouvelables par décret sur avis du CSM.",
          plan: [
            { titre: "Sa mission", texte: "Chargé d'instruire les dossiers confiés, il informe **à charge et à décharge**, seule position compatible avec la présomption d'innocence dont bénéficie la personne mise en examen. Il réunit et apprécie les preuves. Il lui est **interdit de participer au jugement** des affaires dans lesquelles il a accompli un acte d'information, à peine de nullité (art. 49), pour garantir l'impartialité de la juridiction de jugement." },
            { niveau: "I", titre: "Saisine", texte: "Le juge d'instruction **ne peut instruire de sa propre initiative** (art. 51). Il doit être saisi :", enfants: [
              { niveau: "A", titre: "Par un réquisitoire aux fins d'informer du procureur", points: ["Dans les cas où l'instruction préparatoire est obligatoirement prévue par le législateur.", "Lorsque le procureur ne possède pas les éléments nécessaires à la saisine du tribunal pour une poursuite engagée."] },
              { niveau: "B", titre: "Par une plainte avec constitution de partie civile", points: ["Lorsque la personne a subi un préjudice moral/matériel et réclame des dommages et intérêts.", "Lorsque le procureur a classé l'affaire et que la victime, s'estimant lésée, désire quand même que son affaire soit jugée."] },
            ]},
            { niveau: "II", titre: "Les pouvoirs propres du juge d'instruction", texte: "Pour arriver à la manifestation de la vérité, il dispose de moyens de coercition : mandats de comparution/d'amener (présentation de la personne), d'arrêt (rechercher/arrêter), de recherche (rechercher une personne soupçonnée). Il peut saisir le JLD pour un mandat de dépôt (détention provisoire), ou utiliser le contrôle judiciaire. Il recourt à divers procédés de preuve, directement ou avec le concours d'auxiliaires.", enfants: [
              { niveau: "A", titre: "Les pouvoirs propres du juge d'instruction", points: ["Transports sur les lieux (art. 92 C.P.P.).", "Perquisitions et saisies (art. 92 à 99 C.P.P.).", "Auditions de témoins et témoins assistés (art. 101 à 113-8 C.P.P.).", "Interrogatoires et confrontations (art. 114 à 121 C.P.P.)."] },
              { niveau: "B", titre: "Les pouvoirs exercés par l'intermédiaire d'auxiliaires : la commission rogatoire", texte: "S'il ne peut agir lui-même, il délègue à des OPJ, ou requiert un autre juge de son tribunal ou d'un autre ressort (art. 151).", enfants: [
                { niveau: "1", titre: "Le délégué est un magistrat", texte: "Peut accomplir tous les pouvoirs du juge d'instruction, dans les limites fixées sur la commission rogatoire." },
                { niveau: "2", titre: "Le délégué est un officier de police judiciaire", texte: "Procède aux actes prescrits, mais :", points: ["Les personnes non soupçonnées ne peuvent être retenues que le temps nécessaire à leur déposition (art. 153 al.1).", "Il **ne peut jamais** procéder aux interrogatoires et confrontations des personnes mises en examen (art. 152)."] },
              ]},
            ]},
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "Les atteintes aux biens",
      fiches: [
        {
          titre: "L'extorsion",
          reference: "Art. 312-1 à 312-7 du Code pénal",
          definition: "L'extorsion est le fait d'obtenir, par violence, menace de violences ou contrainte, soit une signature, un engagement ou une renonciation, soit la révélation d'un secret, soit la remise de fonds, de valeurs ou d'un bien quelconque.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 312-1 du code pénal définit et réprime l'extorsion." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Moyens mis en œuvre", points: ["**Des violences** : tous procédés de contrainte physique (coups et blessures, brimades...).", "**Des menaces de violences** : toute menace, quelle qu'en soit la forme, dès lors qu'elle a permis la remise.", "**Une contrainte morale** : toute contrainte déterminant la remise (menaces sur la situation matérielle, abus de faiblesse d'une personne vulnérable)."] },
                { niveau: "2", titre: "Une remise par la victime", texte: "La victime joue un rôle actif : contrairement au vol, elle **se dessaisit elle-même** des biens extorqués, en raison des violences ou menaces. Peut être une personne physique ou morale." },
                { niveau: "3", titre: "L'objet de la remise", points: ["Une **signature** (testament, attestation de moralité, diplôme...).", "Un **engagement ou une renonciation**, écrit ou verbal (contrats, reçus, quittances...).", "La **révélation d'un secret** (vie privée, professionnel, correspondances, affaires).", "Une **remise de fonds, de valeurs ou d'un bien quelconque** : valeurs mobilières, effets de commerce, instruments de paiement, ou tout objet ayant une valeur marchande."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "La conscience d'obtenir par la force, la violence ou la contrainte ce qui n'aurait pu être obtenu par un accord librement consenti. **Le mobile est indifférent.**" },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**312-1 C.P. : 7 ans - 100 000 €.**" },
              { titre: "Infraction aggravée (délits)", points: ["Précédée/accompagnée/suivie de violences avec ITT ≤ 8 jours.", "Victime à la vulnérabilité apparente/connue (âge, maladie, infirmité, grossesse).", "Auteur au visage volontairement dissimulé.", "Commise aux abords d'un établissement scolaire → **312-2 C.P. : 10 ans - 150 000 €.**"] },
              { titre: "Infraction aggravée (crimes)", points: ["Violences avec ITT > 8 jours → **312-3 : 15 ans - 150 000 €.**", "Violences avec mutilation ou infirmité permanente → **312-4 : 20 ans - 150 000 €.**", "Usage/menace d'arme ou port prohibé → **312-5 : 30 ans - 150 000 €.**", "En bande organisée → **312-6 al.1 : 20 ans** ; avec mutilation → **al.2 : 30 ans** ; avec arme → **al.3 : réclusion à perpétuité.**", "Violences ayant entraîné la mort, tortures ou actes de barbarie → **312-7 : réclusion à perpétuité et 150 000 €.**"] },
            ]},
            { titre: "Tentative, complicité, immunité familiale", texte: "**Tentative : OUI. Complicité : OUI. Immunité familiale : OUI** (mêmes conditions que le vol). Circonstance aggravante discriminatoire possible (art. 132-76/132-77 C.P.)." },
          ],
        },
        {
          titre: "L'escroquerie",
          reference: "Art. 313-1 et 313-2 du Code pénal",
          definition: "L'escroquerie est le fait, soit par l'usage d'un faux nom ou d'une fausse qualité, soit par l'abus d'une qualité vraie, soit par l'emploi de manœuvres frauduleuses, de tromper une personne et de la déterminer, à son préjudice ou à celui d'un tiers, à remettre des fonds, à fournir un service, ou à consentir un acte opérant obligation ou décharge.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 313-1 du code pénal définit et réprime l'escroquerie." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un moyen de tromperie", points: ["**Usage d'un faux nom** : se désigner par un nom patronymique qui n'est pas le sien.", "**Usage d'une fausse qualité** : état civil, titres universitaires/électifs/religieux, profession ou situation.", "**Abus d'une qualité vraie** : l'escroc abuse d'une qualité réelle inspirant confiance pour donner crédit à ses mensonges.", "**Manœuvres frauduleuses** : comportement actif corroborant les mensonges (faux document, mise en scène, intervention d'un tiers)."] },
                { niveau: "2", titre: "Une remise", points: ["Remise de fonds, valeurs ou biens quelconques.", "Fourniture d'un service (travaux, enseignement, transport...).", "Consentement à un acte opérant obligation ou décharge (promesse de vente, contrat de location/prêt...)."] },
                { niveau: "3", titre: "Au préjudice d'une victime", texte: "Le préjudice est **indispensable** à l'existence de l'infraction (subi par la victime ou un tiers). L'infraction **subsiste même si le préjudice a été réparé.**" },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Infraction **intentionnelle**, ce qui exclut l'imprudence. L'auteur doit avoir conscience d'utiliser des moyens frauduleux, agir de **mauvaise foi**, et tromper volontairement dans le but d'obtenir la remise." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**313-1 C.P. : 5 ans - 375 000 €.**" },
              { titre: "Infraction aggravée", points: ["Par un dépositaire de l'autorité publique dans l'exercice de ses fonctions, ou usurpant cette qualité.", "Par appel au public pour l'émission de titres ou la collecte de fonds humanitaires/sociaux.", "Au préjudice d'une personne vulnérable (âge, maladie, infirmité, grossesse) ou en sujétion psychologique/physique.", "Au préjudice d'une personne publique/organisme social pour une allocation/un avantage indu → **313-2 : 7 ans - 750 000 €.**", "Commise en bande organisée → **10 ans - 1 000 000 €.**"] },
            ]},
            { titre: "Tentative, complicité, immunité familiale", texte: "**Tentative : OUI. Complicité : OUI. Immunité familiale : OUI** (mêmes conditions que le vol)." },
          ],
        },
        {
          titre: "L'abus de confiance",
          reference: "Art. 314-1 à 314-3 du Code pénal",
          definition: "L'abus de confiance est le fait par une personne de détourner, au préjudice d'autrui, des fonds, valeurs ou biens quelconques qui lui ont été remis et qu'elle a acceptés à charge de les rendre, de les représenter ou d'en faire un usage déterminé.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 314-1 du code pénal définit et réprime l'abus de confiance." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Une remise préalable de la chose", texte: "Doit être **volontaire** et **acceptée**, à charge de rendre/représenter/faire un usage déterminé. Peut porter sur des fonds, des valeurs (bijoux, actions...) ou un bien quelconque (carte bancaire, véhicule...)." },
                { niveau: "2", titre: "Un acte matériel de détournement", texte: "Caractérisé par la **non-restitution**, une **transgression de l'affectation** prévue, ou la **disparition** de la chose. Le détenteur se comporte comme s'il en était propriétaire ; le propriétaire légitime ne peut plus exercer ses droits." },
                { niveau: "3", titre: "Au préjudice d'autrui", texte: "Le préjudice peut être **réel** ou **éventuel**. Exemples : revendre pour son compte le téléviseur loué au lieu de le restituer ; vendre pour son compte le bijou confié en vue d'une vente ; acheter des effets avec de l'argent confié pour un autre usage." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Existe seulement si le détournement a été commis avec une **intention frauduleuse** de s'approprier la chose : connaissance de l'obligation de restituer/représenter/affecter, et conscience d'y déroger." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**314-1 C.P. : 5 ans - 375 000 €.**" },
              { titre: "Infraction aggravée", points: ["En bande organisée → **314-1-1 : 7 ans - 750 000 €.**", "Par appel public à l'épargne, ou par un professionnel habituel des opérations sur biens de tiers, ou au préjudice d'une association humanitaire ou d'une victime vulnérable → **314-2 : 7 ans - 750 000 €.**", "Par un mandataire de justice ou officier public/ministériel dans l'exercice de ses fonctions → **314-3 : 10 ans - 1 500 000 €.**"] },
            ]},
            { titre: "Tentative, complicité, immunité familiale", texte: "**Tentative : OUI. Complicité : OUI. Immunité familiale : OUI** (mêmes conditions que le vol)." },
          ],
        },
        {
          titre: "La filouterie",
          reference: "Art. 313-5 du Code pénal",
          definition: "La filouterie est le fait par une personne qui sait être dans l'impossibilité absolue de payer, ou qui est déterminée à ne pas payer, de bénéficier de l'un des 4 services prévus par la loi.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 313-5 du code pénal définit et réprime la filouterie." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "L'impossibilité absolue de payer ou le refus de payer", points: ["**Impossibilité absolue** : aucun moyen de paiement, aucune ressource permettant d'honorer la dette.", "**Détermination à ne pas payer** : l'auteur est solvable mais refuse (ex : il prend la fuite au moment de payer)."] },
                { niveau: "2", titre: "Une remise — 4 cas prévus par la loi", points: ["**Boissons ou aliments** dans un établissement en faisant sa vocation principale : la commande suffit, la consommation effective n'est pas nécessaire.", "**Chambre d'hôtel** effectivement occupée (une réservation seule ne suffit pas), pour une durée **≤ 10 jours** (au-delà, litige civil).", "**Carburant/lubrifiant**, rempli par un employé de station-service (si l'auteur se sert lui-même, c'est un vol).", "**Transport en taxi ou voiture de place** (les transports en commun — train, tram, métro, bus — sont exclus)."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Infraction **intentionnelle** : l'auteur doit avoir conscience d'être dans l'impossibilité de payer, ou la volonté de ne pas payer. **N'est pas punissable** celui qui a oublié son moyen de paiement ou perdu son portefeuille de bonne foi." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**313-5 C.P. : 6 mois - 7 500 €**, amende forfaitaire délictuelle possible." },
              { titre: "Infraction aggravée", texte: "**Aucune circonstance aggravante.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Le recel",
          reference: "Art. 321-1, 321-2 et 321-4 du Code pénal",
          definition: "Le recel est le fait de dissimuler, de détenir ou de transmettre une chose, ou de faire office d'intermédiaire afin de la transmettre, en sachant qu'elle provient d'un crime ou d'un délit. Constitue également un recel le fait de bénéficier, par tout moyen et en connaissance de cause, du produit d'un crime ou d'un délit.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 321-1 du code pénal prévoit et réprime le recel." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte matériel de recel", points: ["**Dissimuler, détenir, transmettre** : camoufler (peu importe le moyen), avoir à sa disposition (infraction continue), ou céder/remettre la chose.", "**Faire office d'intermédiaire** pour la transmettre : mettre en relation plusieurs personnes ou choses.", "**Tirer profit** de l'infraction d'origine, par tout moyen (ex : passager sachant l'origine frauduleuse du véhicule utilisé)."] },
                { niveau: "2", titre: "L'objet du recel", texte: "Le recel est un **délit de conséquence**.", points: ["**Une chose** : meubles, œuvres d'art, bijoux, argent, énergie, secret de fabrication...", "**Provenant d'une infraction antérieure** qualifiée crime ou délit.", "**Commise par un tiers** : « on ne peut pas être voleur et receleur de la même chose »."] },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["**Connaissance de l'acte matériel** du recel : pas de recel si on détient sans le savoir.", "**Connaissance de l'origine frauduleuse** de la chose, au moment où on la reçoit/transmet/en tire profit."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**321-1 C.P. : 5 ans - 375 000 €.**" },
              { titre: "Infraction aggravée", texte: "De façon habituelle, en utilisant les facilités d'une activité professionnelle, ou en bande organisée → **321-2 : 10 ans - 750 000 €.** Selon l'infraction d'origine (peine supérieure, ou circonstances aggravantes connues du receleur) → **321-4 : peine attachée à l'infraction d'origine.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON** (sauf recel aggravé « crime », où elle est punissable, art. 121-4 C.P.). **Complicité : OUI.**" },
          ],
        },
        {
          titre: "L'abstention volontaire de combattre un sinistre",
          reference: "Art. 223-7 du Code pénal",
          definition: "Le fait pour quiconque de s'abstenir volontairement de prendre ou de provoquer les mesures permettant, sans risque pour lui ou pour des tiers, de combattre un sinistre de nature à créer un danger, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 223-7 du code pénal prévoit et réprime l'abstention volontaire de combattre un sinistre." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un sinistre", texte: "Événement susceptible de se propager : incendie, inondation, explosion, écroulement d'immeuble... (origine accidentelle, naturelle ou criminelle)." },
                { niveau: "2", titre: "De nature à créer un danger pour les personnes", texte: "Le danger doit menacer la sécurité des personnes." },
                { niveau: "3", titre: "Une abstention d'agir", texte: "La lutte contre le sinistre doit être possible et **sans risque** pour l'intéressé ou les tiers. Les mesures peuvent consister en une action personnelle ou le recours à un tiers." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["**Conscience/connaissance** du sinistre et de sa dangerosité.", "**Volonté de ne pas agir** : refus volontaire de prendre ou de provoquer les mesures."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**223-7 C.P. : 2 ans - 30 000 €.**" },
              { titre: "Infraction aggravée", texte: "**Aucune circonstance aggravante spécifique.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "Les atteintes aux personnes",
      fiches: [
        {
          titre: "Les atteintes involontaires à la vie et à l'intégrité",
          reference: "Art. 221-6, 222-19, 222-20, R.622-1, R.625-2/3 du Code pénal",
          definition: "Le fait de causer à autrui, par maladresse, imprudence, inattention, négligence ou manquement à une obligation de sécurité ou de prudence imposée par la loi ou le règlement, la mort ou une atteinte à l'intégrité (avec ou sans ITT), constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'art. 221-6 C.P. définit et réprime les atteintes involontaires à la vie. Les art. 222-19 (ITT > 3 mois) et 222-20 (ITT ≤ 3 mois) répriment celles à l'intégrité. Les art. R.625-2, R.625-3 et R.622-1 définissent les atteintes contraventionnelles." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Une faute", points: ["**Maladresse** : manque d'adresse/dextérité manuelle ou intellectuelle (ex : ouvrier qui laisse échapper un outil ; erreur d'un architecte ou d'un médecin).", "**Imprudence** : prise de risques excessifs (vitesse excessive), défaut de précautions, non-respect d'un règlement intérieur.", "**Inattention** : attitude distraite, étourdie (ex : chirurgien oubliant une compresse).", "**Négligence** : faute d'abstention/omission, paresse ou incompétence (ex : vendeur ne prévenant pas des dangers d'un produit).", "**Manquement à une obligation de sécurité** prévue par la loi ou le règlement (texte, décret, arrêté).", "**Violation manifestement délibérée** : faute de mise en danger délibérée — obligation particulière, connue de l'auteur, qu'il choisit délibérément de ne pas respecter."] },
                { niveau: "2", titre: "Un lien de causalité", texte: "La faute doit être à l'origine du dommage. La causalité n'a pas à être immédiate ; le fait peut engendrer un dommage qui s'aggrave par la suite. Le lien peut être **direct ou indirect**." },
                { niveau: "3", titre: "Un dommage", texte: "Sur une personne humaine et vivante :", points: ["La **mort**, ou", "Une **atteinte à l'intégrité physique ou psychique** (avec ou sans ITT)."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Aucune intention coupable requise : l'auteur adopte un comportement **insouciant**. En cas de violation délibérée, il a **conscience du risque** tout en espérant que le résultat ne se produise pas." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Sans ITT (contraventions)", points: ["Infraction simple → **R.622-1 : 2e classe - 150 €.**", "Par violation manifestement délibérée → **R.625-3 : 5e classe - 1 500 €.**"] },
              { titre: "ITT ≤ 3 mois", points: ["Contravention simple → **R.625-2 : 5e classe - 1 500 €.**", "Délit par violation délibérée → **222-20 : 1 an - 15 000 €.**", "En accident de la circulation → **222-20-1 : 2 ans - 30 000 €.**", "Par agression d'un chien → **2 ans - 30 000 €**, aggravé à **3 ans - 45 000 €** (1 circonstance) ou **5 ans - 75 000 €** (2+, art. 222-20-2 : détention illicite, ivresse/stupéfiants du détenteur, non-respect des mesures municipales, absence de permis de détention, défaut de vaccination, chien catégorisé non muselé, mauvais traitements)."] },
              { titre: "ITT > 3 mois", points: ["Délit simple → **222-19 al.1 : 2 ans - 30 000 €.**", "Par violation délibérée → **222-19 al.2 : 3 ans - 45 000 €.**", "En accident de la circulation → **222-19-1 : 3 ans - 45 000 €.**", "Par agression d'un chien → **3 ans - 45 000 €**, aggravé à **5 ans - 75 000 €** (1 circonstance) ou **7 ans - 100 000 €** (2+, art. 222-19-2)."] },
              { titre: "Homicide involontaire", points: ["Simple → **221-6 al.1 : 3 ans - 45 000 €.**", "Par violation délibérée → **221-6 al.2 : 5 ans - 75 000 €.**", "En accident de la circulation → **221-6-1 : 5 ans - 75 000 €.**", "Par agression d'un chien → **5 ans - 75 000 €**, aggravé à **7 ans - 100 000 €** (1 circonstance) ou **10 ans - 150 000 €** (2+, art. 221-6-2)."] },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : NON.** Nota : l'homicide routier et les blessures routières sont étudiés dans une fiche distincte." },
          ],
        },
        {
          titre: "L'homicide routier et les blessures routières involontaires",
          reference: "Art. 221-18 à 221-20 du Code pénal",
          definition: "L'homicide routier et les blessures routières sont des atteintes involontaires à la vie et à l'intégrité de la personne commises lors de la conduite d'un véhicule terrestre à moteur.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'art. 221-18 C.P. définit et réprime l'homicide routier. Les art. 221-19 et 221-20 répriment les blessures routières (ITT > 3 mois et ≤ 3 mois)." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un conducteur de véhicule terrestre à moteur", texte: "**Le véhicule** : tourisme, utilitaires, 2/3-roues motorisées, quads, transports collectifs motorisés (exclus : vélos, trottinettes non motorisées, trains, tramways, drones). **Le conducteur** : personne ayant la maîtrise effective du véhicule." },
                { niveau: "2", titre: "Un acte fautif accompagné d'un comportement dangereux", points: ["1° Violation manifestement délibérée d'une obligation autre que celles listées ci-dessous.", "2° État d'ivresse manifeste, empire d'un état alcoolique, ou refus de vérifications alcool.", "3° Usage de stupéfiants (analyse sanguine/salivaire) ou refus de vérifications.", "4° Consommation volontaire détournée/excessive d'une substance psychoactive.", "5° Absence de permis valide (non titulaire, annulé, invalidé, suspendu ou retenu).", "6° Excès de vitesse ≥ 30 km/h.", "7° Ne pas s'être arrêté après l'accident (délit de fuite) ou défaut de porter secours.", "8° Usage du téléphone tenu en main ou dispositif audio à l'oreille.", "9° Refus d'obtempérer à une sommation de s'arrêter (exclu pour les blessures ITT ≤3 mois).", "10° Rodéo motorisé (art. L.236-1 C.R.)."] },
                { niveau: "3", titre: "Un lien de causalité", texte: "Direct ou indirect entre la faute et le dommage." },
                { niveau: "4", titre: "Un dommage", texte: "La **mort**, ou une **incapacité totale de travail**." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Aucune intention coupable requise. En cas de violation délibérée, l'auteur a conscience du risque en espérant que le résultat ne survienne pas." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Homicide routier", texte: "1 circonstance → **221-18 al.1 : 7 ans - 100 000 €.** 2 circonstances ou plus → **221-18 dernier alinéa : 10 ans - 150 000 €.**" },
              { titre: "Blessures routières ITT > 3 mois", texte: "1 circonstance → **221-19 al.1 : 5 ans - 75 000 €.** 2 circonstances ou plus → **221-19 dernier alinéa : 7 ans - 100 000 €.**" },
              { titre: "Blessures routières ITT ≤ 3 mois", texte: "1 circonstance (hors refus d'obtempérer) → **221-20 al.1 : 3 ans - 45 000 €.** 2 circonstances ou plus → **221-20 dernier alinéa : 5 ans - 75 000 €.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Les menaces contre les personnes",
          reference: "Art. R.623-1, 222-17, 222-18 du Code pénal",
          definition: "La menace de commettre soit des violences, soit un crime ou un délit contre les personnes, lorsqu'elle est réitérée ou matérialisée, constitue une infraction. La menace avec ordre de remplir une condition en est une autre forme.",
          plan: [
            { niveau: "I", titre: "Les menaces sans condition", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Art. R.623-1 C.P. (menaces de violences) et art. 222-17 C.P. (menaces de crime ou délit contre les personnes)." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Une menace", texte: "Annoncer un mal, par la parole ou le comportement, de nature à inspirer la crainte : violences (R.623-1, contravention, tentative non réprimée) ou crime/délit contre les personnes (222-17, tentative punissable)." },
                { niveau: "2", titre: "Dirigée contre une personne", texte: "Une ou plusieurs personnes précises, directement ou par transmission à un tiers." },
                { niveau: "3", titre: "Exprimée par un moyen déterminé", points: ["**Réitérée** : répétée à l'égard de la même personne, aucun délai minimum exigé.", "**Matérialisée** : par un écrit (manuscrit, imprimé, télex...), une image suggestive (dessin, photo, symbole), ou tout autre objet (figurine transpercée, cercueil...)."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Conscience d'exercer une **pression** sur la victime." },
            ]},
            { niveau: "II", titre: "Les menaces avec ordre de remplir une condition", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Art. 222-18 C.P." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Menace de tout crime ou délit contre les personnes", texte: "Y compris ceux dont la tentative n'est pas punissable." },
                { niveau: "2", titre: "Dirigée contre une personne", texte: "Une ou plusieurs personnes précises." },
                { niveau: "3", titre: "Exprimée par un moyen indéterminé", texte: "« Quelque moyen que ce soit », **sans besoin de réitération**." },
                { niveau: "4", titre: "Avec ordre de remplir une condition", texte: "Injonction contraignant la victime à faire, ne pas faire, ou s'abstenir, pour éviter d'être victime des faits promis." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Conscience d'exercer une pression sur la victime,", "**pour la contraindre** à faire ou ne pas faire un acte déterminé."] },
            ]},
            { niveau: "III", titre: "La répression et les aggravations", enfants: [
              { titre: "Menaces sans condition", points: ["Menace de violences → **R.623-1 : 3e classe - 450 €.**", "Menace de crime/délit → **222-17 al.1 : 6 mois - 7 500 €.**", "Si menace de mort → **222-17 al.2 : 3 ans - 45 000 €.**", "Si commise par conjoint/concubin/PACS → **222-18-3 : 5 ans - 75 000 €.**"] },
              { titre: "Menaces avec ordre de remplir une condition", points: ["Infraction simple → **222-18 al.1 : 3 ans - 45 000 €.**", "Si menace de mort → **222-18 al.2 : 5 ans - 75 000 €.**", "Si commise par conjoint/concubin/PACS → **222-18-3 : 7 ans - 100 000 €.**"] },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.** Nota : les menaces envers un dépositaire de l'autorité publique relèvent du chapitre « Atteintes à l'autorité de l'État »." },
          ],
        },
        {
          titre: "L'entrave volontaire à l'arrivée des secours",
          reference: "Art. 223-5 du Code pénal",
          definition: "Le fait d'entraver volontairement l'arrivée de secours destinés à faire échapper une personne à un péril imminent ou à combattre un sinistre présentant un danger pour la sécurité des personnes, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 223-5 du code pénal prévoit et réprime l'entrave volontaire à l'arrivée des secours." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Une situation de péril imminent ou de sinistre", texte: "Le péril doit être imminent, nécessitant une intervention immédiate." },
                { niveau: "2", titre: "Présentant un danger pour la sécurité des personnes", texte: "État dangereux faisant craindre la perte de la vie ou des atteintes corporelles graves (incendie, tremblement de terre, inondation...)." },
                { niveau: "3", titre: "Une entrave", points: ["Obstacles matériels.", "Violences exercées contre les sauveteurs.", "Dégradations apportées sur les véhicules des sauveteurs.", "Diffusion de fausses informations."] },
                { niveau: "4", titre: "À l'arrivée des secours", texte: "Tous les secours privés et publics sont visés : sapeurs-pompiers, police, gendarmerie, médecins, ambulances." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Connaissance/conscience d'un péril imminent ou d'un sinistre dangereux,", "et volonté d'avoir **délibérément** entravé l'arrivée des secours."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**223-5 C.P. : 7 ans - 100 000 €.**" },
              { titre: "Infraction aggravée", texte: "**Aucune circonstance aggravante.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Le non-obstacle à la commission d'un crime ou d'un délit",
          reference: "Art. 223-6 al.1 et al.3 du Code pénal",
          definition: "Quiconque, pouvant empêcher par son action immédiate, sans risque pour lui ou pour les tiers, soit un crime, soit un délit contre l'intégrité corporelle d'une personne, s'abstient volontairement de le faire, commet une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 223-6 al.1 du code pénal prévoit et réprime le non-obstacle à la commission d'un crime ou d'un délit." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Imminence d'un crime ou d'un délit contre l'intégrité corporelle", texte: "L'infraction est en cours d'exécution ou va se commettre de manière certaine." },
                { niveau: "2", titre: "Une absence d'intervention", texte: "Avant le début ou la complète consommation de l'infraction. Intervention personnelle ou par un tiers (dénonciation). Obligation de **moyen**, non de résultat." },
                { niveau: "3", titre: "Sans risque pour soi-même ou les tiers", texte: "L'obligation d'agir ne concerne que celui qui peut le faire sans risque." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Conscience de l'imminence d'une infraction,", "et volonté de ne pas l'empêcher."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**223-6 al.1 : 5 ans - 75 000 €.**" },
              { titre: "Infraction aggravée", texte: "Commis sur un mineur de 15 ans → **223-6 al.3 : 7 ans - 100 000 €.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "La non-assistance à personne en péril",
          reference: "Art. 223-6 al.2 et al.3 du Code pénal",
          definition: "Quiconque s'abstient volontairement de porter à une personne en péril l'assistance que, sans risque pour lui ou pour les tiers, il pouvait lui prêter, soit par son action personnelle, soit en provoquant un secours, commet une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'art. 223-6 al.2 du code pénal prévoit la non-assistance à personne en péril, l'art. 223-6 al.1 la réprime." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Imminence d'un péril", texte: "Le péril doit être actuel, exiger une assistance immédiate, être constaté et non supposé." },
                { niveau: "2", titre: "La nature du péril", texte: "« Un état dangereux ou une situation critique qui fait craindre de graves conséquences... soit de perdre la vie, soit des atteintes corporelles graves » (Trib. Corr. Rouen 09/07/1995). L'origine importe peu : victime d'une infraction, en danger par sa propre imprudence, ou même auteur d'une infraction mis en péril par celle-ci (ex : un cambrioleur blessé doit être secouru)." },
                { niveau: "3", titre: "Une absence d'assistance", texte: "Intervention personnelle ou recours à un tiers, la meilleure forme devant être privilégiée. Obligation de **moyens**, non de résultat." },
                { niveau: "4", titre: "Sans risque pour soi-même ou pour autrui", texte: "L'obligation ne concerne que celui qui peut agir sans risque." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Conscience/connaissance du péril imminent,", "et volonté de ne pas agir — l'infraction est le **refus** de porter assistance, pas une simple négligence."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**223-6 al.2 : 5 ans - 75 000 €.**" },
              { titre: "Infraction aggravée", texte: "Commis sur un mineur de 15 ans → **223-6 al.3 : 7 ans - 100 000 €.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Les appels téléphoniques et envois de messages malveillants ou agressions sonores",
          reference: "Art. 222-16 du Code pénal",
          definition: "Les appels téléphoniques malveillants réitérés, les envois réitérés de messages malveillants émis par voie électronique, ou les agressions sonores en vue de troubler la tranquillité d'autrui, sont des infractions.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-16 du code pénal prévoit et réprime ces faits." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Appels, messages ou agressions sonores", points: ["**Appels téléphoniques** : fixe, mobile, répondeur, boîte vocale.", "**Messages électroniques** : SMS, MMS, courriers électroniques.", "**Agressions sonores** : bruit d'une certaine importance (télévision, musique...)."] },
                { niveau: "2", titre: "Un caractère malveillant", texte: "Volonté de nuire, déduite du contenu du message ou de la multiplication des appels. **Aucune ITT** n'est requise." },
                { niveau: "3", titre: "Une réitération (sauf agressions sonores)", texte: "Plusieurs appels/messages nécessaires. **Pas de condition de réitération** pour les agressions sonores." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "**Malveillance** pour les appels/messages réitérés. **Volonté de troubler la tranquillité d'autrui**, seul élément intentionnel pour les agressions sonores." },
            ]},
            { titre: "Attention à la confusion", texte: "Ne pas confondre avec les contraventions de 3e classe relatives aux bruits et tapages (art. R.623-2 C.P. ou R.1337-7 C.S.P.)." },
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**222-16 C.P. : 1 an - 15 000 €.**" },
              { titre: "Infraction aggravée", texte: "Commise par le conjoint, concubin ou partenaire PACS → **3 ans - 45 000 €.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Le risque causé à autrui (mise en danger d'autrui)",
          reference: "Art. 223-1 du Code pénal",
          definition: "Le fait d'exposer directement autrui à un risque immédiat de mort ou de blessures de nature à entraîner une mutilation ou une infirmité permanente, par la violation manifestement délibérée d'une obligation particulière de prudence ou de sécurité imposée par la loi ou le règlement, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 223-1 du code pénal prévoit et réprime les risques causés à autrui." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Une obligation particulière de prudence ou de sécurité", texte: "Doit être **imposée par la loi ou le règlement** (texte réglementaire à caractère général — un règlement intérieur d'entreprise ou un arrêté préfectoral déclarant un immeuble insalubre n'est pas visé), et **particulière** (ex : la limitation à 130 km/h sur autoroute est particulière ; l'obligation générale de rester maître de sa vitesse ne l'est pas)." },
                { niveau: "2", titre: "Exposition directe au risque", points: ["**Un risque de mort, de mutilation ou d'infirmité permanente** : péril physique d'une extrême gravité, individuel ou collectif.", "**Un risque direct et immédiat** : le comportement dangereux doit être la seule cause du risque."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "**Violation manifestement délibérée** : une faute intentionnelle, qui ne peut résulter d'une inattention ou d'une maladresse. Exemples : dépasser au sommet d'une côte sans visibilité ; franchir un feu rouge sans visibilité ; priver délibérément un ouvrier de harnais en hauteur." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**223-1 C.P. : 1 an - 15 000 €.**" },
              { titre: "Infraction aggravée", texte: "**Aucune circonstance aggravante.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "Les délits routiers",
      fiches: [
        {
          titre: "Le rodéo motorisé",
          reference: "Art. L.236-1 du Code de la route",
          definition: "Le fait d'adopter, au moyen d'un véhicule terrestre à moteur, une conduite répétant de façon intentionnelle des manœuvres constituant des violations d'obligations particulières de sécurité ou de prudence du code de la route, dans des conditions qui compromettent la sécurité des usagers ou qui troublent la tranquillité publique, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article L.236-1 du code de la route définit et réprime le rodéo motorisé." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "La conduite d'un véhicule terrestre à moteur", texte: "Tous véhicules visés (motocyclettes, cyclomoteurs), y compris ceux dont la circulation n'est pas autorisée (mini-motos, mini-quads)." },
                { niveau: "2", titre: "Des manœuvres répétées", texte: "Plusieurs infractions au code de la route (ex : non-respect de plusieurs feux rouges). Constatables sur voie publique et lieux privés ouverts au public (parking, voie de lotissement...). **Une manœuvre unique ne suffit pas.**" },
                { niveau: "3", titre: "Constituant des violations d'obligations de sécurité", texte: "Les obligations doivent être prévues par des dispositions législatives ou réglementaires du code de la route." },
                { niveau: "4", titre: "Un danger pour les usagers ou un trouble à la tranquillité publique", texte: "Danger caractérisé (véhicule en sens inverse, piéton proche) — il n'est pas exigé qu'un risque immédiat de mort/blessure ait été directement causé. Ou trouble à la tranquillité (moteur à régime excessif, avertisseur abusif, entrave à la circulation)." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Violation manifestement délibérée et répétée d'obligations particulières de sécurité,", "conscience de compromettre la sécurité des usagers ou de troubler la tranquillité publique."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**L.236-1/I C.R. : 1 an - 15 000 €.**" },
              { titre: "Infraction aggravée", points: ["En réunion → **L.236-1/II : 2 ans - 30 000 €.**", "Stupéfiants (usage ou refus de vérification), état alcoolique (contraventionnel/délictuel) ou refus de vérification, absence de permis → **L.236-1/III : 3 ans - 45 000 €.**", "Cumul d'au moins 2 des 3 circonstances précédentes → **L.236-1/IV : 5 ans - 75 000 €.**"] },
            ]},
            { titre: "Mesures complémentaires", texte: "**Confiscation obligatoire** du véhicule (propriétaire ou libre disposition, art. L.236-3 C.R.). **Immobilisation éventuelle** (L.325-1 à L.325-3 C.R.)." },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "L'incitation, l'organisation et la promotion des rodéos motorisés",
          reference: "Art. L.236-2 du Code de la route",
          definition: "Le fait d'inciter directement une personne à participer à un rodéo motorisé, d'organiser un rassemblement destiné à cette pratique, ou d'en faire par tout moyen la promotion, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article L.236-2 du code de la route prévoit et réprime l'incitation, l'organisation et la promotion du rodéo motorisé." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Inciter directement une personne à participer", texte: "L'incitation est une provocation directe à commettre les faits." },
                { niveau: "2", titre: "Organiser un rassemblement", texte: "Destiné à permettre la commission d'un rodéo motorisé en réunion." },
                { niveau: "3", titre: "Faire la promotion, par tout moyen", texte: "Faire apparaître ce comportement sous un jour favorable, notamment via les réseaux sociaux." },
                { niveau: "4", titre: "Même sans effet", texte: "Ces infractions sont caractérisées même si le rodéo n'a pas eu lieu : ce sont des **infractions formelles**." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Volonté d'inciter, d'organiser ou de faire la promotion d'un rodéo motorisé." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**L.236-2 C.R. : 2 ans - 30 000 €.**" },
              { titre: "Infraction aggravée", texte: "**Aucune circonstance aggravante.**" },
            ]},
            { titre: "Mesures complémentaires", texte: "**Confiscation obligatoire** du véhicule (art. L.236-3 C.R.). **Immobilisation éventuelle** (L.325-1 à L.325-3 C.R.)." },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Le délit de fuite",
          reference: "Art. 434-10 du Code pénal — Art. L.231-1 et R.231-1 du Code de la route",
          definition: "Le fait, pour tout conducteur d'un véhicule ou engin terrestre, fluvial ou maritime, sachant qu'il vient de causer ou d'occasionner un accident, de ne pas s'arrêter et de tenter ainsi d'échapper à la responsabilité pénale ou civile qu'il peut avoir encourue, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Les articles 434-10 du code pénal et L.231-1 du code de la route prévoient et répriment le délit de fuite." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un conducteur", texte: "La personne assumant la direction du véhicule. **Exclus** : conducteurs de matériels ferroviaires, piétons (même poussant un cycle ou une voiture d'enfant), cavaliers." },
                { niveau: "2", titre: "De véhicule", points: ["Routiers : automobiles, trolleybus, engins agricoles/forestiers/travaux publics, engins à traction animale, motocyclettes, cycles et cyclomoteurs.", "Engins fluviaux ou maritimes.", "Engins volants : avions, hélicoptères, delta-plane, ULM, parachutes (sauf si l'arrêt aurait compromis la sécurité des passagers)."] },
                { niveau: "3", titre: "Qui a causé ou occasionné un accident", texte: "Conséquences corporelles ou matérielles, dans un lieu ouvert à la circulation/stationnement. Le véhicule doit avoir **causé** (contact direct) ou **occasionné** (sans contact nécessaire) l'accident." },
                { niveau: "4", titre: "Une omission de s'arrêter", texte: "Le conducteur doit (art. R.231-1) : s'arrêter au plus près en sécurité, communiquer son identité, avertir les secours si nécessaire.", points: ["**Constitué** si le conducteur prend la fuite puis revient sur place, ou s'arrête mais donne un faux nom/fausse adresse.", "**Non constitué** si l'arrêt a été suffisamment long pour permettre le relevé de l'immatriculation par un tiers."] },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Conscience d'avoir causé/occasionné l'accident (l'a vu, l'a constaté),", "volonté de se soustraire à la responsabilité pénale ou civile éventuelle."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**434-10 C.P. et L.231-1 C.R. : 3 ans - 75 000 €.**" },
              { titre: "Infraction aggravée", texte: "**Aucune circonstance aggravante spécifique.**" },
            ]},
            { titre: "Particularité importante", texte: "Le délit de fuite est une **circonstance aggravante** de l'homicide involontaire (221-6-1) et des blessures involontaires (222-19-1, 222-20-1) commis à l'occasion de la conduite d'un véhicule terrestre à moteur." },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Autres délits routiers — renvoi vers d'autres fiches",
          plan: [
            { titre: "Note de renvoi (telle que dans le sommaire du document)", texte: "Le **refus d'obtempérer** est traité dans le fascicule DPG/DPS socle 1, rubrique 9. Les autres délits routiers listés au sommaire (alcool/stupéfiants — C.E.I., C.E.E.A., refus de vérifications —, permis, permis à points, plaques d'immatriculation, assurance, entrave à la circulation) sont détaillés dans le document **« Mémento de circulation routière »**, disponible séparément dans Fiches synthèse." },
          ],
        },
      ],
    },
    {
      numero: 6,
      titre: "Les atteintes à l'autorité de l'État",
      fiches: [
        {
          titre: "Les menaces de crime ou délit envers les personnes dépositaires de l'autorité publique",
          reference: "Art. 433-3 du Code pénal",
          definition: "Constitue une infraction la menace de commettre un crime ou un délit contre les personnes ou les biens, proférée à l'encontre de personnes limitativement énumérées, en raison de leurs fonctions.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 433-3 du code pénal prévoit et réprime cette infraction." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Menace d'un crime ou d'un délit", texte: "Contre les personnes ou les biens." },
                { niveau: "2", titre: "Un destinataire de la menace déterminé", points: ["**Personne investie d'un mandat électif public** (al.1) : sénateurs, députés, élus régionaux/départementaux/communaux, parlement européen, membres élus de chambres consulaires.", "**Personne dépositaire de l'autorité publique** (al.1) : pouvoir de décision/contrainte par délégation de la puissance publique (magistrats, officiers publics/ministériels, gendarmes, policiers, douanes, administration pénitentiaire...).", "**Personne chargée d'une mission de service public** (al.1 et 2) : sapeurs-pompiers, enseignants, agents de transport public, professionnels de santé.", "**Personne protégée en raison de ses fonctions** (al.1) : avocats, jurés, gardiens assermentés d'immeubles, agents de gardiennage pour un bailleur.", "**Personne exerçant une activité privée de sécurité** (al.3) : surveillance/gardiennage, transport de fonds, protection physique, protection de navires, recherche de renseignements privés.", "**Conjoint, ascendants, descendants directs**, ou toute personne vivant habituellement au domicile de ces personnes (al.4)."] },
                { niveau: "3", titre: "Une menace motivée par les fonctions de la victime", texte: "Pour les personnes de l'al.1 : dans l'exercice ou du fait de leurs fonctions. Pour celles des al.2/3 : dans l'exercice de leurs fonctions. Pour l'entourage (al.4) : en raison des fonctions exercées par leur proche." },
                { niveau: "4", titre: "Une qualité de la victime apparente ou connue de l'auteur", texte: "L'auteur agit en raison de la qualité de la victime." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Volonté de porter atteinte à une personne **en raison de ses fonctions**. Peu importe que l'auteur ait eu ou non l'intention/les moyens de mettre sa menace à exécution." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**433-3 al.1 à 4 : 3 ans - 45 000 €.**" },
              { titre: "Infraction aggravée", points: ["Menace de mort ou d'atteinte aux biens dangereuse pour les personnes → **433-3 al.5 : 5 ans - 75 000 €.**", "Menace visant à obtenir un acte, une abstention, ou un abus d'autorité de la victime → **433-3 al.6 : 10 ans - 150 000 €.**"] },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
      ],
    },
    {
      numero: 7,
      titre: "L'usage et le trafic de stupéfiants",
      fiches: [
        {
          titre: "L'usage illicite de stupéfiants",
          reference: "Art. L.3421-1, L.3421-5, L.3421-6 du Code de la santé publique — Art. 222-41 du Code pénal",
          definition: "L'usage illicite de l'une des substances ou plantes classées comme stupéfiants est une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article L.3421-1 du code de la santé publique prévoit et réprime l'usage illicite de stupéfiants." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un usage illicite", texte: "Consommation ou absorption, individuelle ou collective, occasionnelle ou répétée, publique ou privée — **peu importe le mode d'administration**. C'est la classification du produit qui matérialise le caractère illicite. Sont aussi considérés comme usage : l'**acquisition, la détention ou le transport** destinés à l'usage exclusif de la personne (le parquet apprécie selon nature/quantité/degré d'intoxication)." },
                { niveau: "2", titre: "D'une substance ou plante classée comme stupéfiant", texte: "Au sens de l'art. 222-41 C.P., constituent des stupéfiants les substances/plantes classées comme telles en application de l'art. L.5132-7 C.S.P. Seules les substances **désignées avec précision** par les textes sont retenues." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Usage **intentionnel et illicite**. L'usage **licite** n'est pas sanctionné (ex : toxicomane sous cure de méthadone prescrite)." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**L.3421-1 al.1 : 1 an - 3 750 €**, constatable par procès-verbal électronique dans le cadre de l'amende forfaitaire délictuelle." },
              { titre: "Infraction aggravée", texte: "Dans l'exercice de ses fonctions, par un dépositaire de l'autorité publique/mission de service public, ou personnel d'une entreprise de transport chargé de la sécurité du transport → **L.3421-1 al.2 : 5 ans - 75 000 €.**" },
            ]},
            { titre: "Pouvoirs spécifiques de dépistage", texte: "Sur réquisitions du procureur aux OPJ, et sous leur responsabilité aux APJ/APJA, possibilité d'entrer dans les lieux de transport public pour dépister l'usage, s'il existe une ou plusieurs raisons plausibles de soupçonner (art. L.3421-5 C.S.P.). Le **refus de vérifications** est puni de **2 ans et 30 000 €** (art. L.3421-6 C.S.P.)." },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "La cession ou l'offre illicites de stupéfiants à une personne en vue de sa consommation personnelle",
          reference: "Art. 222-39 du Code pénal",
          definition: "La cession ou l'offre illicite de stupéfiants à une personne, en vue de sa consommation personnelle, est un délit.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-39 al.1 du code pénal prévoit et réprime la cession ou l'offre illicites de stupéfiants en vue d'une consommation personnelle." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "La cession ou l'offre illicites à une personne", texte: "**L'offre** correspond à l'instant qui précède la remise (acte matériel non encore réalisé). **La cession** signifie que le produit a changé de mains." },
                { niveau: "2", titre: "En vue de sa consommation personnelle", texte: "Vente au détail d'une ou quelques doses de stupéfiants. L'acheteur est un simple usager." },
                { niveau: "3", titre: "Un produit stupéfiant", texte: "Substance classée comme stupéfiant." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "L'auteur doit avoir agi **en connaissance de cause**." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**222-39 al.1 : 5 ans - 75 000 €.**" },
              { titre: "Infraction aggravée", texte: "Offerts/cédés à des mineurs, ou dans/aux abords d'un établissement scolaire ou de locaux administratifs, y compris aux heures d'entrée/sortie → **222-39 al.2 : 10 ans - 75 000 €.**" },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : OUI. Complicité : OUI.**" },
          ],
        },
      ],
    },
  ],
};

const DOC_INSTITUTION_VALEURS = {
  titre: "Institution et valeurs",
  sections: [
    {
      numero: 1,
      titre: "La formation initiale",
      fiches: [
        {
          titre: "La formation initiale des gardiens de la paix",
          reference: "Mis à jour le 07/01/2026",
          plan: [
            { niveau: "I", titre: "L'organisation de la formation", texte: "Se déroule sur **24 mois** (12 mois élève en école de police + 12 mois gardien de la paix stagiaire dans le 1er service d'affectation). Le programme des **16 premières semaines** est commun aux élèves policiers adjoints et gardiens de la paix. À l'issue, les P.A. rejoignent leur service ; des élèves gardiens de la paix (anciens P.A. titulaires de l'U.V. « socle initial FI PA/GPX ») sont incorporés en nombre équivalent, après un module e-formation de 6h.", points: ["**5 phases** : socle initial (16 semaines), alternance (2 semaines), 1re partie du socle avancé (18 semaines), alternance (3 semaines), 2e partie du socle avancé (8 semaines)."], enfants: [
              { niveau: "A", titre: "1re phase — socle initial", texte: "Fondamentaux (institution policière et valeurs, bases juridiques, dimension humaine), situations professionnelles (relation police/population, interpellation, violences intrafamiliales, sécurité routière), T.S.I. et secourisme, aptitude au P.A. SIG SAUER, habilitation bâtons, outils numériques." },
              { niveau: "B", titre: "2e phase — alternance", texte: "Stage de 2 semaines en commissariat, dont 3 jours en service d'investigation. La phase de reprise pédagogique (élèves U.V. « socle initial ») comporte T.S.I., dimension humaine et numérique." },
              { niveau: "C", titre: "3e phase — socle avancé (1re partie)", texte: "Approfondit les contenus techniques/juridiques/humains, exercice de la qualité d'A.P.J. 20, module 1 de préparation O.P.J. 16 (6 semaines), habilitations TSI spécifiques (HK UMP 9MM, DIVA, PIE, HK G36)." },
              { niveau: "D", titre: "4e phase — alternance", texte: "Stage de 3 semaines en service opérationnel, dont 1 semaine en service d'investigation." },
              { niveau: "E", titre: "5e phase — socle avancé (2e partie)", texte: "Tronc commun (4 semaines avant le choix des postes : stupéfiants, milieu confiné, renseignement, laïcité, maltraitance animale), puis Module de Spécialisation Métier (3 semaines) au choix : CRS, PAF, investigations (PP/DSPAP/SAIP), protection et ordre public (PP/DOPC/SDLP), sécurité générale (DNSP, PP/DSPAP)." },
            ]},
            { niveau: "II", titre: "L'évaluation de l'aptitude professionnelle", texte: "Porte sur le discernement professionnel, l'implication, le respect déontologique, les connaissances théoriques, les savoir-faire, les acquis techniques, la condition physique et la maîtrise informatique.", points: ["**Socle initial (acquis/non acquis)** : compétences numériques, TECR1, aptitude SIG, CEE1, MCPN, CES — 5 compétences sur 6 nécessaires pour l'unité de valeur.", "**1re partie socle avancé (acquis/non acquis)** : CEE2, épreuve LRPPN, TDI, armement.", "**1re partie socle avancé (notée)** : évaluations chiffrées complémentaires."] },
          ],
        },
        {
          titre: "Mémento prise de notes et méthodologie",
          plan: [
            { titre: "Pourquoi prendre des notes ?", texte: "La prise de notes adapte le débit oral (150 mots/min) à la vitesse de rédaction (27 mots/min) et permet de retranscrire dans son propre vocabulaire pour mieux mémoriser.", points: ["Présenter l'information de façon claire et synthétique.", "Relever les éléments pertinents pour organiser ses connaissances.", "Maintenir la concentration pendant tout l'exposé.", "Noter les questions à poser au formateur au bon moment.", "Accélérer l'apprentissage et préparer les révisions."] },
            { titre: "Les règles d'or de la prise de notes", enfants: [
              { titre: "Avant le cours", points: ["Relire le sujet et les notes précédentes sur le thème.", "Préparer son matériel."] },
              { titre: "Pendant le cours", points: ["Noter date, séquence, objectif, intervenants et plan.", "Numéroter les pages, écrire au recto uniquement, de façon lisible et aérée.", "Laisser une marge à gauche pour les commentaires/questions.", "Utiliser phrases courtes, schémas, symboles, abréviations.", "Mettre l'essentiel en évidence avec des couleurs/surligneurs.", "Noter définitions, mots-clés et références en entier et en rouge."] },
              { titre: "Après le cours", points: ["Relire ses notes le jour même, les compléter, les classer.", "Y revenir régulièrement."] },
            ]},
            { titre: "La clef de la prise de notes : les abréviations", texte: "On distingue les abréviations **générales** (langue courante : cdlt = cordialement) et **techniques** (métier : P.A., Gpx, B/C, Mj). Règles : utilisation instinctive et progressive, toujours les mêmes abréviations pour les mêmes termes, retranscrire le sens plutôt que la phrase exacte.", points: ["Méthodes : retirer les voyelles (cependant = cpdt), remplacer des fins de mots (ion→°, ère→R, ent→ent souscrit, que→q).", "Garder les liens logiques (verbes, flèches, mots de liaison) pour ne pas perdre le sens.", "Exemples courants : beaucoup=bcp, toujours=tjs, c'est-à-dire=cad, travail=W, jamais=jms, pour=pr, différent=≠, entraîne=═>, supérieur/inférieur=>/<."] },
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "L'organisation de la police nationale",
      fiches: [
        {
          titre: "La direction générale de la police nationale (D.G.P.N.)",
          plan: [
            { titre: "Structure générale", texte: "Le directeur général de la police nationale, assisté d'un directeur général adjoint, dirige la D.R.H.F.S., les directions et services actifs, et 2 services (S.N.E.A.S., S.N.E.A.V.), ainsi que, conjointement avec le DGGN, la D.C.I.S., l'A.N.F.S.I. et le S.S.M.S.I." },
            { niveau: "A", titre: "D.R.H.F.S.", texte: "Définit la gestion des personnels, prépare les textes réglementaires, organise carrières et parcours. Responsable du recrutement des contractuels (hors DGSI). Participe au budget, au suivi des textes d'organisation, aux contentieux, à la protection fonctionnelle et à l'innovation/performance." },
            { niveau: "B", titre: "I.G.P.N.", texte: "Exerce une mission de contrôle sur les directions/services de la DGPN, la préfecture de police et la DGSI : enquêtes administratives et judiciaires, inspection, évaluation, audit interne, conseil. Compétence nationale." },
            { niveau: "C", titre: "D.N.P.J.", texte: "Concourt à la police judiciaire nationale, prévention/répression de la criminalité organisée/transnationale (cheffe de file). Anime les services de sa filière, coordonne la coopération policière internationale, exerce des missions de police administrative sur les jeux d'argent." },
            { niveau: "D", titre: "D.N.S.P.", texte: "Définit les objectifs de sécurité et ordre publics dans les communes où la police est étatisée. Lutte contre la délinquance, sécurité du quotidien, sécurisation de l'espace public, police-secours, accueil des victimes, lien police-population, sécurité routière, transports en commun." },
            { niveau: "E", titre: "D.N.P.A.F.", texte: "Contrôle et surveillance des frontières terrestres/maritimes/aériennes. Chef de file traitement procédural des étrangers en situation irrégulière, lutte contre le trafic de migrants et la fraude documentaire, gestion des centres de rétention administrative, coopération européenne (Frontex)." },
            { niveau: "F", titre: "D.C.C.R.S.", texte: "Autorité sur les compagnies républicaines de sécurité (maintien/rétablissement de l'ordre public sur tout le territoire, aide aux populations en cas de sinistre). Les gardes statiques ne sont possibles que sur ordre du ministre, jamais à titre permanent." },
            { niveau: "G", titre: "D.N.R.T.", texte: "Recherche/centralisation/analyse du renseignement territorial (hors Paris/92/93/94) pour informer le Gouvernement, dans les domaines institutionnel/économique/social et l'ordre public. Contribue à la prévention du terrorisme." },
            { niveau: "H", titre: "Académie de police (A.D.P.)", texte: "Recrutement et formation de la police nationale, pilote la stratégie nationale de formation, exerce la tutelle de l'ENSP, organise le recrutement de tous les personnels actifs/techniques/scientifiques, responsable des études et de la recherche." },
            { niveau: "I", titre: "S.D.L.P.", texte: "Protection rapprochée et accompagnement de sécurité (dont sécurité du Président de la République), organisation des visites de hautes personnalités, surveillance des bâtiments du ministère, moyens automobiles, services d'honneur." },
            { niveau: "J", titre: "S.N.P.S.", texte: "Politique de police scientifique, examens/expertises/analyses demandés par les autorités judiciaires, formation en police scientifique, représentation internationale." },
            { niveau: "K", titre: "R.A.I.D.", texte: "Intervention sur troubles graves à l'ordre public nécessitant des moyens spécifiques, concours à la lutte antiterroriste/criminalité organisée, assistance au S.D.L.P., mise à disposition de matériels spécialisés, formation." },
            { niveau: "L", titre: "A.N.F.S.I.", texte: "Développement/mise en œuvre/sécurité des systèmes d'information et équipements numériques pour les forces de sécurité intérieure. Maîtrise d'œuvre des systèmes opérationnels police/gendarmerie, innovation technologique." },
            { niveau: "M", titre: "S.N.E.A.S.", texte: "Enquêtes administratives vérifiant, pour la prévention du terrorisme et de l'ordre public, la compatibilité du comportement d'une personne avec l'accès à des sites sensibles, des fonctions sensibles, des matériels dangereux, un titre de séjour ou la nationalité française." },
            { niveau: "N", titre: "S.N.E.A.V.", texte: "Examine les demandes d'autorisation de voyage transmises par le système européen ETIAS après traitement automatisé positif, et statue sur ces demandes." },
            { niveau: "O", titre: "D.C.I.S.", texte: "Politique étrangère et continuité sécurité intérieure/extérieure : dirige le réseau des attachés de sécurité intérieure, coordonne la coopération technique internationale, contribue aux positions françaises européennes/internationales." },
            { niveau: "P", titre: "S.S.M.S.I.", texte: "Produit la statistique publique de sécurité intérieure, analyse les données pour piloter les politiques de sécurité, autorité nationale pour les statistiques européennes du domaine." },
            { titre: "Nota — autres services rattachés", texte: "SICOP (communication), Délégation aux victimes (DAV), Service historique de la police nationale (SHPN), Agence nationale des données de voyages (ANDV). Dans les DOM-TOM/Nouvelle-Calédonie, les **Directions Territoriales de la Police Nationale (D.T.P.N.)** se substituent aux directions de la police nationale, exerçant toutes les missions déconcentrées dans leur ressort." },
          ],
        },
        {
          titre: "La direction générale de la sécurité intérieure (D.G.S.I.)",
          plan: [
            { titre: "Structure", texte: "Le directeur général de la sécurité intérieure dirige : la direction du renseignement et des opérations, la direction technique, le service de l'administration générale, l'inspection générale de la sécurité intérieure." },
            { titre: "Missions", points: ["Rechercher, centraliser et exploiter le renseignement intéressant la sécurité nationale.", "Concourir aux missions de police judiciaire dans ses domaines de compétence.", "Prévenir et concourir à la répression de l'ingérence étrangère.", "Surveiller les individus/groupes radicaux susceptibles de recourir à la violence.", "Chef de file de la lutte contre les menaces terroristes visant le territoire national.", "Prévenir/réprimer les atteintes au secret de la défense nationale, au potentiel économique/industriel, l'acquisition d'armes de destruction massive, la criminalité liée aux TIC.", "Surveiller les organisations criminelles internationales affectant la sécurité nationale.", "Contribuer à la surveillance des communications électroniques/radioélectriques pour ces missions."] },
          ],
        },
        {
          titre: "La préfecture de police",
          plan: [
            { titre: "Le préfet de police", texte: "Haut fonctionnaire nommé en conseil des ministres, il est : responsable de la sécurité et de la police administrative à Paris ; supérieur hiérarchique des fonctionnaires (y compris de police judiciaire, avec pouvoir disciplinaire) ; préfet de Paris + Hauts-de-Seine + Seine-Saint-Denis + Val-de-Marne ; préfet de la zone de défense de Paris (8 départements d'Île-de-France) ; responsable du commandement opérationnel unique de la sécurité dans les transports ferrés en Île-de-France." },
            { titre: "Attributions", points: ["Sécurité des personnes et des biens.", "Sécurité civile.", "Délivrance de titres administratifs.", "Circulation.", "Lutte contre les nuisances et protection de l'environnement.", "Prévention des troubles à l'ordre public."] },
            { titre: "Composition", enfants: [
              { titre: "Services administratifs", points: ["Direction des usagers et des polices administratives.", "Direction des ressources humaines.", "Direction des finances, de la commande publique et de la performance.", "Direction de l'innovation, de la logistique et des technologies.", "Direction de l'immobilier et de l'environnement.", "Service des affaires juridiques et du contentieux.", "Service de l'administration des étrangers."] },
              { titre: "Services actifs", points: ["Direction de la sécurité de proximité de l'agglomération parisienne.", "Direction de l'ordre public et de la circulation (D.O.P.C.).", "Direction de la police judiciaire.", "Direction du renseignement."] },
              { titre: "Services rattachés au cabinet du préfet", points: ["Laboratoire central.", "Laboratoire de toxicologie.", "Brigade des sapeurs-pompiers de Paris (unité militaire à la disposition du préfet de police)."] },
            ]},
          ],
        },
        {
          titre: "La hiérarchie des personnels de la police nationale",
          plan: [
            { niveau: "I", titre: "Les personnels des services actifs", enfants: [
              { niveau: "A", titre: "Corps de conception et de direction", texte: "Grades : commissaire général, commissaire divisionnaire, commissaire de police. Emplois : directeur des services actifs / chef de l'IGPN, chef de service / inspecteur général, directeur adjoint / sous-directeur / contrôleur général (accessibles à partir du grade de commissaire divisionnaire). Élaborent les doctrines d'emploi, dirigent les services, exercent les attributions de magistrat conférées par la loi." },
              { niveau: "B", titre: "Corps de commandement", texte: "Grades : commandant divisionnaire, commandant de police, capitaine de police (appellations « commandant »/« capitaine » ; « lieutenant » durant les 4 premières années après titularisation). Secondent/suppléent les commissaires, dirigent certains services, exercent les attributions du CPP notamment en discipline et formation." },
              { niveau: "C", titre: "Corps d'encadrement et d'application", texte: "Grades (appellation usuelle) : 1. major de police (« major »), 2. brigadier-chef de police (« brigadier-chef »), 3. gardien de la paix (« gardien », « sous-brigadier » au 6e échelon). Les majors et brigadiers-chefs encadrent gardiens, policiers adjoints et réservistes." },
            ]},
            { niveau: "II", titre: "Les personnels administratifs", enfants: [
              { niveau: "A", titre: "Corps des attachés d'administration de l'intérieur", texte: "2 grades : attaché principal, attaché. Tâches de gestion administrative/financière/logistique, pouvant inclure l'encadrement de personnels." },
              { niveau: "B", titre: "Corps des secrétaires administratifs", texte: "3 grades : classe exceptionnelle, classe supérieure, classe normale. Tâches administratives importantes, encadrement possible ; certains exercent les fonctions d'assistants d'enquête." },
              { niveau: "C", titre: "Corps des adjoints administratifs", texte: "3 grades : principal 1re classe, principal 2e classe, adjoint administratif. Tâches administratives variées : correspondance, classement." },
            ]},
            { niveau: "III", titre: "Les personnels techniques et scientifiques", enfants: [
              { niveau: "A", titre: "Corps des ingénieurs de la police technique et scientifique", texte: "3 grades : ingénieur en chef, principal, ingénieur. Constatations/examens/analyses scientifiques demandés par magistrats/services, encadrement possible." },
              { niveau: "B", titre: "Corps des techniciens de la police technique et scientifique", texte: "3 grades : technicien en chef, principal, technicien. Affectés en laboratoires ou services d'identité judiciaire." },
            ]},
          ],
        },
        {
          titre: "Les règles d'emploi des policiers adjoints",
          plan: [
            { titre: "L'uniforme", texte: "Le P.A. exerce en tenue d'uniforme ; la tenue civile n'est autorisée qu'à titre exceptionnel par le chef de service (art. 133-18 R.G.E.P.N.). Il est responsable de ses effets d'uniforme." },
            { titre: "Le port de l'arme", texte: "L'aptitude au port relève exclusivement de la structure de formation (ne peut être délivrée après par le service d'affectation). Une inaptitude définitive met fin au contrat sans indemnité ni préavis. L'arme individuelle est retirée à chaque prise de service et restituée en fin de service, strictement dans le cadre du service, liée au port du gilet pare-balles (art. 134-4 R.G.E.P.N.). Ne peut être employée que dans le cadre légal (art. L.435-1 C.S.I., 122-5 et 122-7 C.P.). Tout vol/perte/détérioration doit être immédiatement signalé." },
            { titre: "La carte professionnelle", texte: "Doit être portée en service, à usage strictement professionnel, jamais prêtée ni reproduite, restituée en fin de contrat. Prêt/usage frauduleux/perte/vol par négligence engage la responsabilité disciplinaire." },
            { titre: "Les locaux, matériels et véhicules", texte: "Le P.A. doit en prendre soin et ne les utiliser que dans le cadre professionnel du service, sous peine de sanctions disciplinaires." },
            { titre: "Le régime de travail", texte: "Régime horaire de son service/unité (jour ou nuit) ; peut être appelé à servir en tout temps/lieu lors d'événements graves. **Pas de temps partiel**, pas d'astreinte, permanence uniquement sur volontariat. Rappel au service possible, mais **pas de report de repos**." },
            { titre: "La conduite des véhicules de service", texte: "Le service d'emploi détermine les critères de conduite selon le type de mission. En période probatoire du permis, la conduite se limite en principe aux missions sans dangerosité." },
            { titre: "L'accès aux fichiers de police", texte: "En tant qu'A.P.J.A., le P.A. accède aux fichiers nécessaires à ses missions, uniquement pour des besoins professionnels et dans le respect absolu du secret professionnel." },
            { titre: "Le changement d'affectation", texte: "Peut occuper successivement plusieurs postes, changer de service (avenant au contrat), ou demander un changement de département/permutation (au renouvellement du contrat, ou à titre dérogatoire pour circonstances graves)." },
            { titre: "Régime disciplinaire et suspension", texte: "Sanctions prises par le **préfet du département d'affectation**, par ordre croissant : avertissement, blâme, exclusion temporaire ≤3 jours, exclusion temporaire de 4 jours à 6 mois, **licenciement sans préavis ni indemnité**. Suspension conservatoire possible par arrêté préfectoral." },
          ],
        },
        {
          titre: "Les horaires de service en sécurité publique",
          plan: [
            { titre: "Principe", texte: "Le temps de travail s'organise en régime **hebdomadaire** ou **cyclique**, selon qu'il correspond ou non à la semaine civile. Personnels actifs et P.A. d'une même unité sont astreints au même régime." },
            { niveau: "I", titre: "Le régime de travail hebdomadaire", texte: "Applicable de jour ou de nuit, calqué sur la semaine civile (5j/2j repos) ou en grande/petite semaine (6j/2j puis 4j/2j).", points: ["Journée sans interruption : pause de 20 min obligatoire (sauf urgence), en principe au milieu de la journée.", "Ou interruption de 45 min à 2h sur la coupure méridienne (11h30-14h30).", "**Horaires variables** : 2 plages variables + 2 plages fixes de 2h, interruption médiane de 45 min à 2h. Saisie quotidienne des horaires par l'agent."] },
            { niveau: "II", titre: "Les régimes de travail cyclique", texte: "Maintiennent la continuité du service public, en continu, par équipes successives (jour/nuit, dimanches et fériés compris), sans correspondre à la semaine civile.", enfants: [
              { niveau: "A", titre: "Cycle 4/2", texte: "3 versions : « classique » (4 vacations matin/2j repos/4 vacations après-midi/2j repos), « panaché » (2+2 vacations/2j repos), « compressé » (alternance complexe). Nécessite 3 brigades de jour + 1 brigade de nuit de 3 groupes. Vacation moyenne : 8h10. Prise de service matinale entre 5h20 et 6h30." },
              { niveau: "B", titre: "Cycles à vacation de 11h08 ou 12h08", texte: "Cycle 2/2, cycle 3/3, cycle 2/2/3/2/2/3. Nécessitent 1 brigade de jour + 1 brigade de nuit de 2 groupes. Deux pauses de 20 min." },
              { niveau: "C", titre: "Cycle « vacation forte » (2/2/3/2/3/2)", texte: "2 brigades ou groupes présents à chaque vacation forte, jour (lundi/mercredi/vendredi) ou nuit (mardi/jeudi). Vacation moyenne : 9h31." },
              { niveau: "D", titre: "Cycles unités cynotechniques légères (U.C.L.)", texte: "Cycle 4/2 UCL (3 vacations de nuit de 9h30 + 1 vacation de jour de 4h10) ou cycle « vacation forte » UCL (nuit, sauf mardi/jeudi de jour)." },
            ]},
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "La déontologie",
      fiches: [
        {
          titre: "Les marques extérieures de respect : le salut, la présentation",
          plan: [
            { niveau: "I", titre: "Le salut", texte: "En uniforme, le salut est une marque de respect, de politesse et de considération. Il se distingue du salut militaire car il est à la fois marque de respect envers les supérieurs et signe de courtoisie envers le public.", points: ["**Marque de respect** : dû à tout supérieur (civil ou en tenue), au drapeau, aux membres du corps préfectoral, aux officiers de l'armée française ; par extension aux autorités politiques et judiciaires.", "**Signe de courtoisie** : un salut bref marque, sur la voie publique, la prise de contact avec la personne qui requiert l'intervention du policier."] },
            { niveau: "II", titre: "La présentation", texte: "Présentation dans un bureau où le policier pénètre après y avoir été invité.", points: ["Mise au garde-à-vous, salut, enlèvement de la coiffure.", "Énonciation du grade/nom/prénom/section, puis « à vos ordres » (commandant, capitaine, lieutenant, major, brigadier-chef) ou « mes respects » (directeur, commissaire divisionnaire, commissaire).", "Mise au repos (sur ordre), exposé des faits, attente de l'ordre de disposition.", "Reprise du garde-à-vous, se coiffer, saluer, sortir."] },
          ],
        },
        {
          titre: "Les droits et obligations des policiers",
          reference: "Code général de la fonction publique (C.G.F.P.), Code de la sécurité intérieure (C.S.I.), R.G.E.P.N.",
          plan: [
            { niveau: "I", titre: "Les droits et obligations résultant du statut de la fonction publique", enfants: [
              { niveau: "A", titre: "Les garanties générales", enfants: [
                { niveau: "1", titre: "La liberté d'opinion", reference: "Art. L.111-1 et L.137-2 C.G.F.P.", texte: "Garantie aux agents publics ; ne peuvent figurer au dossier individuel ni dans aucun document administratif les opinions ou activités politiques, syndicales, religieuses ou philosophiques de l'agent." },
                { niveau: "2", titre: "La liberté d'expression", reference: "Art. L.121-2 C.G.F.P.", texte: "**Dans le service** : totalement exclue, obligation de neutralité. **Hors service** : liberté relative — peut professer sa religion, défendre ses opinions politiques/philosophiques, participer à des manifestations/campagnes, adhérer à un parti — mais limitée par l'**obligation de réserve**." },
                { niveau: "3", titre: "Le principe de non-discrimination", reference: "Art. L.131-1 à L.131-6, L.133-1, L.133-2 C.G.F.P.", texte: "Aucune distinction en raison des opinions politiques/syndicales/philosophiques/religieuses, de l'origine, de l'orientation sexuelle/identité de genre, de l'âge, du patronyme, de la situation de famille/grossesse, de l'état de santé, de l'apparence, du handicap, de l'appartenance ethnique/raciale réelle ou supposée, ni du sexe. Aucun agissement sexiste toléré." },
                { niveau: "4", titre: "La reconnaissance du droit syndical", reference: "Art. L.411-3 C.S.I., L.113-1 C.G.F.P.", texte: "Garanti : création d'organisations syndicales, adhésion, mandats — limité à la défense des intérêts professionnels. Exercé dans le respect du secret professionnel/de l'enquête et du code de déontologie." },
                { niveau: "5", titre: "La protection fonctionnelle", reference: "Art. L.134-1, L.134-11 C.G.F.P., R.434-7 C.S.I.", texte: "L'État défend les agents (et leur conjoint/enfants/ascendants directs) contre attaques, menaces, violences, injures, diffamations, outrages subis dans/du fait de leurs fonctions, avec réparation du préjudice. En l'absence de faute personnelle, le chef hiérarchique assure la protection juridique et l'accompagnement." },
              ]},
              { niveau: "B", titre: "Les obligations générales", enfants: [
                { niveau: "1", titre: "L'obligation d'obéissance", reference: "Art. L.121-10 C.G.F.P., R.434-5, R.411-5 C.S.I.", texte: "Se conformer aux instructions du supérieur, **sauf ordre manifestement illégal de nature à compromettre gravement un intérêt public** — le respect de la légalité prime alors. Exige discipline et loyauté." },
                { niveau: "2", titre: "Le secret professionnel et la discrétion professionnelle", reference: "Art. L.121-6/L.121-7 C.G.F.P., R.434-8, R.434-12 C.S.I.", texte: "Violation exposant à sanctions pénales, disciplinaires et responsabilité civile. Le policier doit aussi respecter le secret de l'enquête/instruction. Interdiction de divulguer à toute personne non autorisée, y compris au sein des institutions, les informations connues dans l'exercice des fonctions.", points: ["L'usage des réseaux sociaux doit rester compatible : ne pas rendre visibles des renseignements professionnels (opérations en cours, voies d'accès en intervention) ni diffuser photos/propos nuisant à l'institution."] },
                { niveau: "3", titre: "L'obligation de probité", reference: "Art. L.121-1 C.G.F.P., R.434-9 C.S.I.", texte: "Agir avec désintéressement, sans intérêt personnel opposé à l'administration (même en disponibilité, même après cessation d'activité). Le policier ne doit pas tirer avantage de sa qualité.", points: ["**Corruption** (432-11 1° C.P.) : solliciter/agréer offres/dons pour un acte de sa fonction.", "**Trafic d'influence** (432-11 2° C.P.) : se servir de son influence pour obtenir une décision favorable.", "**Concussion** (432-10 C.P.) : percevoir des sommes que l'on sait ne pas être dues.", "**Prise illégale d'intérêts** (432-12 C.P.) : intérêt dans une opération qu'on a la charge de surveiller/administrer."] },
              ]},
            ]},
            { niveau: "II", titre: "Les particularismes statutaires liés à la fonction policière", enfants: [
              { niveau: "A", titre: "Les obligations générales", enfants: [
                { niveau: "1", titre: "L'obligation de prêter serment", reference: "Art. L.434-1 A C.S.I.", texte: "Avant sa prise de fonctions, tout agent déclare solennellement servir avec dignité et loyauté la République, ses principes (liberté, égalité, fraternité) et sa Constitution." },
                { niveau: "2", titre: "Le principe hiérarchique", reference: "Art. R.434-4 C.S.I.", texte: "L'autorité donne des instructions précises. Le policier rend compte de l'exécution des ordres (ou de leur inexécution), et de tout fait pouvant entraîner sa convocation par une autorité de police/juridictionnelle/de contrôle. **Nota** : aucun principe hiérarchique entre policiers adjoints eux-mêmes." },
                { niveau: "3", titre: "Les obligations de l'autorité hiérarchique", reference: "Art. 111-2, 111-7 à 111-10, 121-6 R.G.E.P.N.", texte: "Veille à l'équilibre physique/psychologique des subordonnés et à des conditions de travail satisfaisantes ; formation actualisée, prioritairement sur les libertés publiques." },
                { niveau: "4", titre: "L'obligation de réserve", reference: "Art. 113-10, 133-6 R.G.E.P.N., R.434-29 C.S.I.", texte: "Plus stricte que dans le reste de la fonction publique : modération dans l'expression des opinions, en service et hors service. Un manque de retenue peut entraîner des sanctions. Les élus/responsables syndicaux disposent d'une plus grande liberté." },
                { niveau: "5", titre: "Scrutins électoraux : inéligibilités et incompatibilités", texte: "**Inéligibilité** : incapacité à être élu. **Incompatibilité** : une fois élu, choisir entre le mandat et la fonction policière. Restrictions spécifiques selon corps/scrutin (ex : un policier du corps d'encadrement ne peut être élu dans sa commune d'exercice)." },
                { niveau: "6", titre: "L'interdiction de faire grève", reference: "Art. L.114-3 C.G.F.P.", texte: "Concerne les seuls personnels actifs, pour motifs d'ordre public — toute cessation concertée peut être sanctionnée hors garanties disciplinaires. **Les policiers adjoints ont le droit de grève** (133-28 R.G.E.P.N.)." },
                { niveau: "7", titre: "L'obligation de dignité", reference: "Art. L.121-1 C.G.F.P., 133-2/133-7 R.G.E.P.N., R.434-12 C.S.I.", texte: "En tout temps, dans ou hors service, y compris sur les réseaux sociaux, le policier s'abstient de tout acte/propos nuisant à la considération de la police/gendarmerie. Peut fonder des poursuites disciplinaires pour des faits hors service (ex : révocation d'un gardien de la paix pour propos racistes sur WhatsApp — CE n°474289 du 28/12/2023)." },
                { niveau: "8", titre: "L'obligation d'indépendance", reference: "Art. 59-60 décret n°95-654, 113-12/113-13 R.G.E.P.N., R.434-12 C.S.I.", texte: "Interdiction de se prévaloir de sa qualité pour mandater des collectes de fonds, et de rédiger/diffuser dans les locaux de police des publications à caractère raciste, xénophobe, appelant à l'indiscipline, politique, ou manifestant des préférences religieuses/philosophiques." },
                { niveau: "9", titre: "Le discernement", reference: "Art. R.434-10 C.S.I.", texte: "Tenir compte de la nature des risques/menaces et des délais disponibles pour choisir la meilleure réponse légale." },
                { niveau: "10", titre: "L'impartialité", reference: "Art. R.434-11 C.S.I.", texte: "Agir avec équité et neutralité, sans discrimination. Applique le principe de laïcité : s'abstient de manifester ses opinions religieuses." },
              ]},
              { niveau: "B", titre: "Les obligations spécifiques", enfants: [
                { niveau: "1", titre: "L'activité du conjoint", texte: "L'autorité peut prendre des mesures si l'activité du conjoint/concubin jette le discrédit sur la fonction policière ou crée une équivoque préjudiciable." },
                { niveau: "2", titre: "La disponibilité", texte: "Le policier doit rester disponible tout au long du service, avec une attitude d'intérêt pour son interlocuteur." },
                { niveau: "3", titre: "L'obligation de résidence", reference: "Art. 24 décret n°95-654", texte: "Résider au lieu d'affectation ou à une distance permettant un rappel inopiné rapide. Tout changement de résidence doit être signalé par voie hiérarchique." },
                { niveau: "4", titre: "L'obligation d'agir même hors service", reference: "Art. 19 décret n°95-654, R.434-19 C.S.I.", texte: "Devoir d'intervenir d'initiative ou sur réquisition pour porter aide à toute personne en danger, prévenir/réprimer les troubles à l'ordre public, protéger personnes et biens — va **plus loin** que la non-assistance à personne en péril (223-6 C.P.), sans pouvoir invoquer le même seuil de risque qu'un particulier. N'impose cependant pas l'héroïsme : marge d'appréciation sur les moyens et le moment de l'intervention." },
              ]},
            ]},
            { niveau: "III", titre: "Le cumul d'activité", reference: "Décret n°2020-69 du 30/01/2020", texte: "L'agent doit consacrer l'intégralité de son activité professionnelle à ses tâches, sans exercer d'activité lucrative privée — plusieurs textes assouplissent toutefois la règle.", enfants: [
              { niveau: "A", titre: "Activités privées strictement interdites", reference: "Art. L.123-1 C.G.F.P.", texte: "Sont interdites, même à but non lucratif, les activités privées suivantes :", points: ["Participation aux organes de direction de sociétés/associations à but lucratif.", "Consultations, expertises, plaidoiries dans des litiges intéressant une personne publique (sauf hors secteur concurrentiel).", "Prise ou détention d'intérêts de nature à compromettre l'indépendance de l'agent dans une entreprise soumise au contrôle de son administration ou en relation avec elle.", "Création ou reprise d'une entreprise immatriculée au registre du commerce/des sociétés ou au registre des entreprises (secteur des métiers/artisanat).", "Cumul d'un emploi permanent à temps complet avec un ou plusieurs autres emplois permanents à temps complet."], enfants: [
                { titre: "Dérogation", texte: "Le dirigeant d'une société/association à but lucratif, lauréat d'un concours ou recruté comme agent contractuel, peut continuer son activité privée 1 an, renouvelable une fois, à compter du recrutement — sur déclaration à l'autorité hiérarchique." },
              ]},
              { niveau: "B", titre: "Activités librement autorisées", reference: "Art. L.123-2 C.G.F.P.", points: ["Libre détention de parts sociales et libre gestion du patrimoine personnel/familial (sauf qualité de dirigeant/gérant/commerçant).", "Libre production des œuvres de l'esprit, dans la limite de la déontologie policière, pour une réelle production artistique.", "Pour les personnels enseignants/techniques/scientifiques et artistiques : exercice des professions libérales découlant de leurs fonctions.", "Exercice d'une activité bénévole au profit de personnes publiques/privées sans but lucratif."] },
              { niveau: "C", titre: "Activités soumises à autorisation de l'administration", reference: "Art. L.123-7, L.123-8 C.G.F.P.", enfants: [
                { titre: "Création ou reprise d'entreprise à temps partiel", texte: "L'agent à temps complet peut être autorisé à passer à temps partiel (mi-temps minimum) pour créer/reprendre une entreprise, pour une durée maximale de 3 ans renouvelable 1 an. **Les policiers adjoints sont exclus** de ce dispositif (art. 133-24 R.G.E.P.N.)." },
                { titre: "Exercice d'une activité accessoire", texte: "Cumul possible avec une ou plusieurs activités accessoires, ne portant pas atteinte au fonctionnement/à l'indépendance/à la neutralité du service, ni à l'art. 432-12 C.P. (prise illégale d'intérêt).", points: ["Expertise et consultation ; enseignement et formation.", "Activité sportive ou culturelle (y compris encadrement/animation).", "Travaux de faible importance chez des particuliers ; services à la personne.", "Activité agricole ; conjoint collaborateur en entreprise artisanale/commerciale/libérale.", "Aide à domicile à un proche (ascendant, descendant, conjoint, partenaire, concubin).", "Activité d'intérêt général à but non lucratif ; mission de coopération internationale.", "Vente de biens produits personnellement.", "À titre expérimental (3 ans à compter du 28/12/2022) : conduite d'un véhicule de transport scolaire."] },
                { titre: "Limites", points: ["L'activité du policier (ou de son conjoint/concubin) ne doit pas jeter le discrédit sur la fonction ni créer d'équivoque préjudiciable.", "Les policiers doivent rester loyaux, intègres, impartiaux et dignes (art. R.434-2 à R.434-33 C.S.I.)."] },
              ]},
              { niveau: "D", titre: "Formalisme de la demande d'autorisation", texte: "L'agent souhaitant exercer une activité accessoire soumise à autorisation doit en faire la demande préalable à son autorité hiérarchique." },
            ]},
          ],
        },
        {
          titre: "Sanctions et récompenses",
          plan: [
            { niveau: "I", titre: "Le contrôle de la police nationale", texte: "Contrepartie aux pouvoirs des policiers (interpellation, usage de la force). **Contrôle interne** : chaîne hiérarchique et services d'inspection. **Contrôle externe** : autorités judiciaires (chambre de l'instruction pour la qualité d'OPJ/APJ, art. 224-230 CPP), et le **Défenseur des droits** (art. R.434-24 C.S.I., art. 71-1 Constitution), qui veille au respect des droits/libertés par les administrations." },
            { niveau: "II", titre: "Sanctions et récompenses des policiers actifs", enfants: [
              { niveau: "A", titre: "Les sanctions — 4 groupes croissants", points: ["**1er groupe** (sans consultation du conseil de discipline) : avertissement (registre spécial, non inscrit au dossier) ; blâme (inscrit, effacé après 3 ans sans nouvelle sanction) ; exclusion ≤3 jours (idem).", "**2e groupe** : radiation du tableau d'avancement ; abaissement d'échelon ; exclusion de 4 à 15 jours (privative de rémunération, sursis possible) ; déplacement d'office.", "**3e groupe** : rétrogradation ; exclusion de 16 jours à 2 ans (sursis possible, sans ramener la durée sous 1 mois).", "**4e groupe** : mise à la retraite d'office ; révocation."], texte: "Après 10 ans de services sans nouvelle sanction, un agent sanctionné en 2e/3e groupe peut demander la suppression de la mention à son dossier. La suspension **n'est pas une sanction** mais une mesure provisoire (traitement conservé 4 mois, rétablissement automatique si pas de décision, sauf poursuites pénales)." },
              { niveau: "B", titre: "Les récompenses", texte: "Toute action d'abnégation, de courage ou d'initiative fait l'objet d'un rapport circonstancié.", points: ["Lettre de félicitations versée au dossier.", "Gratification.", "Prime pour résultats exceptionnels.", "Proposition de décoration.", "Proposition d'avancement à titre exceptionnel."] },
            ]},
            { niveau: "III", titre: "Sanctions et récompenses des policiers adjoints", texte: "Sanctions prises par le préfet du département, par ordre croissant : avertissement, blâme, exclusion ≤3 jours, exclusion de 4 jours à 6 mois, licenciement sans préavis ni indemnité. Suspension conservatoire possible.", enfants: [
              { titre: "Les récompenses", points: ["Lettre de félicitations.", "Prime pour résultats exceptionnels."] },
            ]},
          ],
        },
        {
          titre: "L'enquête administrative",
          plan: [
            { titre: "Définition", texte: "Phase d'investigation préalable à l'ouverture de poursuites disciplinaires, ouverte lorsque l'administration a connaissance de comportements susceptibles de constituer un manquement professionnel/déontologique. Vise à circonstancier les manquements, matérialiser les griefs, le caractère fautif et l'absence de cause d'exonération. Initiée par l'autorité hiérarchique (le pouvoir disciplinaire appartient à l'autorité de nomination)." },
            { niveau: "I", titre: "L'ouverture de l'enquête administrative", enfants: [
              { niveau: "A", titre: "La notion de manquement", texte: "Aucune définition légale ; l'IGPN (guide pratique) le définit comme la violation d'un devoir, d'une obligation professionnelle ou d'une instruction, par omission ou commission, dans ou hors l'exercice des fonctions, appréciée au regard de la qualité de policier." },
              { niveau: "B", titre: "La saisine", texte: "Déclenchée par la connaissance d'un comportement problématique : dénonciations, films/audios, surveillance des réseaux sociaux, dysfonctionnements constatés par la hiérarchie, révélations de l'autorité judiciaire, intervention du Défenseur des droits." },
            ]},
            { niveau: "II", titre: "Les sujets de l'enquête administrative", points: ["**Sujets actifs** : autorités habilitées, chefs de service, adjoints, services dédiés.", "**Sujets influents** : le procureur de la République (enquête judiciaire distincte, mais une infraction caractérise souvent aussi un manquement) et les autorités de contrôle externe.", "**Sujets passifs** : ceux sur lesquels s'exerce l'enquête."] },
            { niveau: "III", titre: "Le principe de séparation enquête judiciaire / enquête administrative", texte: "Cadres juridiques et finalités totalement distincts. L'enquête judiciaire est normée par le CPP sous peine de nullité ; l'enquête administrative est **non coercitive**, sans formalisme imposé. Un même fonctionnaire ne peut participer à l'enquête pénale ET procéder à l'audition administrative de l'agent. Les deux enquêtes peuvent coexister sur les mêmes faits (qualifiés d'infraction pénale d'un côté, de manquement de l'autre)." },
            { niveau: "IV", titre: "Les actes de l'enquête administrative", texte: "Investigation non coercitive, à charge et à décharge.", points: ["Acte de saisine détaillé.", "Actes d'enquête (constatations, télégramme, MCI, rapports, auditions — sans durée limitée mais avec temps de repos).", "Acte de clôture.", "Rapport de synthèse.", "Acte de notification des conclusions."] },
            { niveau: "V", titre: "La clôture de l'enquête", texte: "Se termine quand plus aucun acte n'apparaît nécessaire. L'administration doit pouvoir répondre : le manquement est-il prouvé ? Est-il opportun de poursuivre disciplinairement ? Le chef de service notifie les conclusions par PV administratif — classement du dossier, ou ouverture d'une procédure disciplinaire." },
          ],
        },
        {
          titre: "L'usage des réseaux sociaux",
          plan: [
            { titre: "Ce qu'il faut savoir (fiche AMARIS)", texte: "L'utilisation des réseaux sociaux par un policier doit être raisonnée au regard de 2 risques : sa propre sécurité (une publication laissant deviner son appartenance à l'institution peut attirer des personnes mal intentionnées) et les règles de déontologie (tout contenu publié, même sous pseudonyme, engage l'institution s'il révèle sa qualité d'agent). Le policier ne s'identifie ni politiquement ni religieusement, ne tient pas de propos contraires aux lois pénales, ne dénigre pas l'institution — neutralité renforcée en période électorale." },
            { titre: "Bonnes pratiques et règles à observer", points: ["Respecter scrupuleusement le secret professionnel et le devoir de réserve.", "Limiter la portée des publications (paramètres de confidentialité, vérifiés régulièrement).", "S'assurer de connaître réellement ses contacts.", "Protéger l'anonymat de son entourage, demander leur avis avant de les identifier.", "Choisir un mot de passe complexe, le changer régulièrement.", "Activer l'alerte d'identification, désactiver la géolocalisation.", "Signaler sur PHAROS tout commentaire injurieux ou abusif."] },
            { titre: "En résumé", texte: "L'usage des réseaux sociaux exige prudence, bon sens, discrétion et modération. Les publications doivent respecter la neutralité et la réserve. **Le droit à l'oubli n'existe pas sur internet** : toute diffusion inappropriée est très difficile à supprimer et peut causer des préjudices irréparables." },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "L'information de la hiérarchie",
      fiches: [
        {
          titre: "Le compte-rendu",
          plan: [
            { niveau: "I", titre: "Règle professionnelle", texte: "Tout policier doit rendre compte sans délai à sa hiérarchie de tout fait/incident à caractère personnel ou lié à l'exécution du service, et des circonstances. La hiérarchie doit être tenue informée de l'évolution des faits et des suites données. Le compte-rendu peut être oral, ou prendre la forme d'un rapport ou d'une mention de main courante." },
            { niveau: "II", titre: "Le compte-rendu", enfants: [
              { niveau: "A", titre: "Principe", texte: "Doit être un exposé exact et objectif, circonstancié, clair et concis. Relate l'action du policier sur des faits auxquels il a participé (témoin ou acteur), et les décisions prises pour assurer sa mission." },
              { niveau: "B", titre: "Structure", texte: "Grille de questions : QUAND ? OÙ ? QUI ? QUOI ? COMMENT ? CONSÉQUENCES ?" },
              { niveau: "C", titre: "Développement", points: ["**QUAND** : date, heure des faits.", "**OÙ** : lieu.", "**QUI** : personnes impliquées (auteurs, victimes, plaignants, requérants, témoins).", "**QUOI** : faits, événement, demande, renseignements.", "**COMMENT** : circonstances, ce qui a été vu/entendu directement (constatations) ou indirectement (déclarations).", "**CONSÉQUENCES** : pour les victimes (blessures, hospitalisation, préjudices matériels) et pour la police (recherche/interpellation, conduite au commissariat, garde des lieux, déviation, avis aux secours/autorités)."] },
            ]},
          ],
        },
        {
          titre: "Le formalisme du rapport",
          plan: [
            { titre: "Définition", texte: "Compte-rendu adressé à l'autorité hiérarchique pour l'informer de tout fait/incident et de ses circonstances. Les seuls textes le concernant (art. D.14-1, 430, 537 CPP) sont muets sur son formalisme, dégagé par la pratique." },
            { niveau: "I", titre: "Le formalisme", enfants: [
              { niveau: "A", titre: "L'en-tête", texte: "En haut à gauche : logo du ministère + identification de la direction/service du rédacteur. En haut à droite : logo police nationale, lieu et date de rédaction (le lieu est celui de la rédaction, pas celui des faits — contrairement au PV, le rapport n'est pas réputé établi dans le même trait de temps que les opérations). Suivent : grade, matricule, nom/prénom, service, puis le destinataire (le supérieur hiérarchique direct — art. D.14-1 ; sinon, mention « sous couvert de la voie hiérarchique »)." },
              { niveau: "B", titre: "Les mentions obligatoires", points: ["**L'objet** : résume en quelques mots le corps du rapport (ex : demande de fermeture administrative d'un débit de boissons ; ou nature/lieu/date des faits en cadre judiciaire).", "**L'affaire** (cadre judiciaire) : « petite identité » de l'individu concerné (ex : C/ Albert M..., né le..., demeurant... ou C/x...).", "**La référence** : instructions verbales/écrites auxquelles le rapport se réfère (date, numéro d'enregistrement).", "**Les pièces jointes** : documents devant être joints."] },
              { niveau: "C", titre: "Le préambule", texte: "Formule stéréotypée : « J'ai l'honneur de vous rendre compte des faits suivants... » ou « ... de l'enquête diligentée conformément à vos instructions... » ou « ... de solliciter de votre bienveillance... ». L'**unicité du rédacteur** est de rigueur ; les autres intervenants sont mentionnés dans le préambule ou le corps." },
              { niveau: "D", titre: "Le corps du rapport", texte: "Le rédacteur relate ce qu'il a vu, entendu ou constaté, ce qu'il a fait, les mesures prises, les diligences effectuées et leur résultat." },
              { niveau: "E", titre: "La signature — les destinataires", texte: "Signature à droite, sous la dernière phrase, après mention de la qualité administrative. Une rubrique « destinataires » peut être ajoutée en bas à gauche du dernier feuillet, après la signature." },
            ]},
          ],
        },
        {
          titre: "Modèles de rapports — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source contient (pages 126-129) des **modèles concrets de rapports rédigés** (administratifs et judiciaires) servant d'exemples pratiques d'application des règles de formalisme ci-dessus. Ils ne sont pas reproduits ici car il s'agit d'exemples types plutôt que de règles nouvelles — se référer au fascicule original pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "L'accueil du public",
      fiches: [
        {
          titre: "Charte de l'accueil du public et de l'assistance aux victimes",
          plan: [
            { titre: "Article 1 — Une priorité majeure", texte: "L'accueil du public est une priorité pour la police et la gendarmerie nationales. Qualité de l'accueil, disponibilité, réduction des délais d'attente et satisfaction des demandes sont une préoccupation permanente. Comportement exemplaire dans le cadre fixé par la loi et la déontologie." },
            { titre: "Article 2 — Un droit d'écoute pour chaque citoyen", texte: "Être écouté, assisté et secouru à tout moment est un droit ouvert à chaque citoyen, quels que soient origine, âge, condition sociale, statut de requérant/plaignant/victime." },
            { titre: "Article 3 — Qualité du comportement", texte: "Politesse, retenue, correction ; abstention de familiarité, propos désobligeants, attitudes déplacées. Discernement, calme, sang-froid, patience, tout en restant impartial et objectif. Missions au contact du public assurées en uniforme (ou tenue de ville correcte pour le personnel autorisé en civil)." },
            { titre: "Article 4 — Accueil privilégié des victimes", texte: "Accueil et écoute privilégiés, information sur leurs droits, accompagnement dans les démarches, orientation vers un soutien psychologique/aide matérielle. Préservation de la dignité, l'intimité et la pudeur ; attention renforcée aux personnes vulnérables." },
            { titre: "Article 5 — Obligation de recevoir les plaintes", texte: "Recueil obligatoire des plaintes, y compris hors compétence territoriale. Le service qui reçoit la plainte veille aux enregistrements/diffusions utiles à la recherche de l'auteur et des biens dérobés." },
            { titre: "Article 6 — Traitement immédiat des disparitions", texte: "Tout signalement de disparition (mineur ou majeur) est immédiatement pris en compte, donne lieu sans délai aux recherches nécessaires ; le requérant est tenu informé du résultat." },
            { titre: "Article 7 — Information du plaignant", texte: "Information du plaignant sur les actes entrepris et leurs résultats ; vérification que le fait incriminé ne s'est pas renouvelé." },
            { titre: "Article 8 — Droits sur les données", texte: "Des informations relatives aux victimes peuvent être enregistrées dans des fichiers, dans le seul but d'identifier les auteurs. La victime peut obtenir communication, rectification ou suppression de ces données (via la CNIL), et le procureur territorialement compétent peut être saisi." },
          ],
        },
        {
          titre: "L'accueil du public — organisation pratique",
          plan: [
            { niveau: "I", titre: "L'amélioration de l'information du public", enfants: [
              { niveau: "A", titre: "L'affichage à l'extérieur des commissariats", points: ["Panneau d'informations : numéros d'urgence, informations du commissariat, réseaux sociaux, QR code « Ma sécurité ».", "Dispositif « Tableau d'Accueil-Confidentialité » (TAC) : garantit la confidentialité de la prise en charge des victimes de violences intrafamiliales/conjugales/sexuelles, dès l'entrée dans les locaux."] },
              { niveau: "B", titre: "L'affichage à l'accueil", points: ["Charte d'accueil du public — assistance aux victimes.", "Tableau d'Accueil-Confidentialité (TAC).", "Affiches publics vulnérables : 119 (« Allô enfance en danger »), 3919 (« Violences Femmes Info »).", "Affiches « Services Publics + » (8 engagements, indicateurs, satisfaction).", "Charte de la laïcité, information sur le traitement des données personnelles."] },
            ]},
            { niveau: "II", titre: "La prise en charge du public", enfants: [
              { niveau: "A", titre: "Le logiciel « ACCUEIL »", texte: "Assure la traçabilité du passage dans les locaux et le suivi du temps d'attente." },
              { niveau: "B", titre: "Une prise en compte adaptée", texte: "Principe du **guichet unique** : dépôt de plainte possible dans le commissariat choisi, quel que soit le lieu des faits/domicile. Priorisation de l'accueil selon les situations. La « plainte en ligne » (PEL) et THÉSÉE n'imposent pas un dépôt systématique en ligne." },
              { niveau: "C", titre: "Les dispositifs d'accompagnement", texte: "Soutien psychologique, social et juridique proposé aux usagers et victimes." },
            ]},
            { niveau: "III", titre: "L'offre de services numériques : l'application « Ma Sécurité »", texte: "Portail d'accès unique aux téléservices du ministère (Police rendez-vous, PEL, PHAROS, PERCEVAL, OTV, 17Cyber). Permet aussi de signaler certains faits (rodéo motorisé, trafic de stupéfiants, maltraitance animale)." },
            { niveau: "IV", titre: "La formation des personnels en charge de l'accueil", texte: "Les référents accueil veillent à ce que les personnels d'accueil soient formés et informés des dispositifs d'aide disponibles pour les victimes." },
          ],
        },
        {
          titre: "Doctrine relative à l'accueil et la prise en charge des victimes de violences conjugales",
          reference: "Télégramme DGPN/CAB n°2020-259D et note DCSP n°006 du 05/02/2020 (Grenelle des violences conjugales)",
          plan: [
            { titre: "Contexte", texte: "Corpus réglementaire et technique issu du Grenelle « lutte contre les violences conjugales », à destination des chefs de service, encadrement et policiers en charge de l'accueil des victimes. Les services s'appuient sur des référents formés, les GPF (groupes de prévention familiale), les intervenants sociaux en commissariat (ISC), psychologues et associations." },
            { niveau: "I", titre: "La prise en charge des victimes dans les services de police", enfants: [
              { titre: "Le Tableau d'Accueil-Confidentialité (TAC)", reference: "Note DCSP n°031 du 26/07/2021", texte: "Créé par la DDSP de la Sarthe. Composé d'un tableau extérieur et d'un panneau à l'accueil, tous deux avec 2 couleurs : **orange** pour violences sexuelles/conjugales/intrafamiliales et atteintes sexuelles, **bleu** pour les autres infractions. La victime désigne la couleur à l'agent d'accueil ; si orange, le service compétent est informé pour une prise en charge prioritaire et discrète." },
              { titre: "Le recueil des déclarations", texte: "La victime doit être reçue dans un lieu sécurisant et confidentiel. Les policiers font preuve de discernement, neutralité, sans jugement ; ils la rassurent et l'encouragent à porter plainte. Orientation prioritaire vers les policiers spécialisés (GPF/référents) si présents. Hors heures ouvrables, l'OPJ de permanence est informé et veille à la qualité de la prise en charge.", points: ["Le recueil des déclarations **ne doit jamais** être subordonné à un certificat médical préalable.", "La victime peut être accompagnée de son représentant légal ou d'une personne majeure de son choix (avocat compris — art. 10-2 8° CPP), et peut demander à se domicoler chez un tiers avec son accord (art. 10-2 9° CPP)."] },
              { titre: "Le principe : le dépôt de plainte ou l'audition", reference: "Télégramme DGPN/CAB n°2019-3888D", texte: "Le policier incite fortement au dépôt de plainte ou à l'audition, avec un modèle de PV spécifique disponible sur LRPPN." },
              { titre: "L'exception : la déclaration MCI ou le procès-verbal", reference: "Protocole-cadre du 13/11/2013", texte: "Les déclarations ne doivent être enregistrées en simple main courante (MCI) qu'en cas de **refus explicite** de la victime de porter plainte/être entendue, et sans révélation de fait grave — ce refus doit impérativement être mentionné. Si la victime souhaite repartir sans aucun acte, le policier rédige une mention de main courante détaillée, voire un PV de saisine si des faits graves ont été révélés et la victime identifiée." },
            ]},
            { niveau: "II", titre: "La prise de déclaration en milieu hospitalier", reference: "Circulaire du 25/11/2021", texte: "Des conventions entre forces de sécurité, établissements de santé et parquets permettent aux victimes de déposer plainte à l'hôpital lorsque leur état de santé ne permet pas un déplacement au commissariat. L'établissement s'assure des conditions matérielles/médicales adaptées (confort, dignité, confidentialité) et met à disposition un local et le matériel nécessaires à la prise de plainte." },
          ],
        },
        {
          titre: "Autres supports d'accueil et d'assistance — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source comporte également plusieurs supports de communication non repris intégralement ici (dépliants et fiches pratiques) : le **dépliant égalité-diversité** (discrimination-harcèlement, avec les 4 phases des cellules d'écoute du ministère : recueil du signalement, entretien individuel, traitement administratif, suite), le **dépliant « victime de violences sexistes et sexuelles »**, le **dépliant « victime de violences conjugales »**, la fiche AMARIS « l'accueil d'une victime de violences sexuelles ou conjugales », ainsi que les pages recensant les **services et organismes d'aide** (associations, numéros utiles), les **démarches administratives courantes** pour le public, et les règles de **protection des locaux de police**. Se référer au fascicule original pour le détail de ces supports pratiques." },
          ],
        },
      ],
    },
    {
      numero: 6,
      titre: "Laïcité, police et religions",
      fiches: [
        {
          titre: "La laïcité",
          reference: "Source : DLPAJ / bureau des cultes",
          plan: [
            { niveau: "I", titre: "Qu'est-ce que la laïcité ?", enfants: [
              { niveau: "A", titre: "Définition", texte: "Pas de définition juridique officielle. Le Conseil d'État en donne une **triple dimension** (rapport public 2004, « Un siècle de laïcité ») :", points: ["La neutralité de l'État vis-à-vis des croyances et religions.", "Le respect de la liberté de religion et du libre exercice des cultes.", "Le pluralisme : toutes les religions doivent pouvoir s'exprimer.", "Attention : ce n'est ni le reniement des religions, ni un choix spirituel particulier."] },
              { niveau: "B", titre: "Références juridiques", points: ["Art. 10 DDHC : nul ne peut être inquiété pour ses opinions même religieuses, si leur manifestation ne trouble pas l'ordre public.", "Art. 1er Constitution 1958 : « La France est une République indivisible, laïque, démocratique et sociale ».", "Loi du 9 décembre 1905 : art. 1er (liberté de conscience, libre exercice des cultes sous réserve de l'ordre public), art. 2 (la République ne reconnaît, ne salarie ni ne subventionne aucun culte).", "Circulaire du 13/04/2007 : charte de la laïcité dans les services publics, à afficher obligatoirement."] },
            ]},
            { niveau: "II", titre: "La laïcité et les agents publics", enfants: [
              { niveau: "A", titre: "Neutralité dans l'exercice des fonctions", texte: "Interdiction d'avantager/pénaliser les usagers selon leurs convictions. S'applique aussi aux salariés de droit privé chargés d'une mission de service public, mais pas à ceux n'assurant pas une telle mission (ex : agents d'entretien en commissariat)." },
              { niveau: "B", titre: "Interdiction de manifester sa religion au travail", texte: "Faute professionnelle passible de sanction.", points: ["Ne pas porter de signe religieux visible sur le lieu de travail.", "Ne pas faire de prosélytisme auprès des usagers/collègues.", "Ne pas utiliser les moyens du service à des fins religieuses."] },
              { niveau: "C", titre: "Liberté de conscience préservée", texte: "Interdiction de prendre en compte les opinions/pratiques religieuses (hors travail) dans le recrutement/la carrière, ou de les mentionner au dossier. La liberté d'expression des convictions s'exerce dans la sphère privée, dans les limites du **devoir de réserve**." },
            ]},
            { niveau: "III", titre: "La laïcité et les usagers du service public / citoyens", enfants: [
              { niveau: "A", titre: "Principe : liberté d'expression des convictions", texte: "Les usagers ont le droit de porter des signes religieux (kippa, foulard, turban) dans les services publics et l'espace public (ex : une victime peut porter plainte en turban sikh ; un avocat en garde à vue peut porter une kippa)." },
              { niveau: "B", titre: "Les exceptions", texte: "La charte de la laïcité prévoit des limites : respect de la neutralité du service, de son bon fonctionnement, de l'ordre public, de la santé et de l'hygiène.", enfants: [
                { niveau: "1", titre: "Motifs d'ordre public", points: ["Photo « tête nue » obligatoire sur les documents d'identité (décret de 1955).", "Interdiction de la dissimulation du visage dans l'espace public (loi du 11/10/2010) — le voile intégral est interdit dans la rue et les services publics, à ne pas confondre avec un voile couvrant les cheveux (autorisé).", "Prières de rue si elles gênent la circulation/troublent l'ordre public."] },
                { niveau: "2", titre: "Bon fonctionnement, santé, hygiène", texte: "Un usager ne peut exiger que le service s'adapte à ses convictions (ex : la circulaire du 16/08/2011 rappelle que les menus confessionnels ne sont ni un droit ni une obligation en restauration collective)." },
                { niveau: "3", titre: "Élèves des collèges et lycées publics", texte: "Ne peuvent porter de signes religieux **ostensibles**, mais des signes « discrets » restent autorisés (loi du 15/03/2004)." },
              ]},
            ]},
            { titre: "Aide-mémoire", texte: "Tous les citoyens peuvent porter des signes religieux partout (commissariat, mairie, rue, restaurant...), **sauf** : les agents publics dans l'exercice de leurs fonctions ; les élèves de collège/lycée public dans l'établissement ; toute personne portant un voile **intégral** dans l'espace public. Ne pas confondre voile intégral (interdit) et voile couvrant les cheveux (autorisé)." },
          ],
        },
        {
          titre: "Charte de la laïcité dans les services publics et principaux rites des cultes — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit le texte intégral de la **charte de la laïcité dans les services publics** (affiche officielle « Services Publics+ »), déjà résumée dans les principes ci-dessus, ainsi qu'une fiche présentant les **principaux rites et pratiques des cultes en France** (calendrier des grandes fêtes religieuses, prescriptions alimentaires, pratiques vestimentaires) à titre de repère culturel pour les agents. Se référer au fascicule original pour le détail complet de ces deux supports." },
          ],
        },
      ],
    },
    {
      numero: 7,
      titre: "Histoire de la police",
      fiches: [
        {
          titre: "Points de repères chronologiques",
          plan: [
            { titre: "Repères institutionnels et politiques", texte: "La frise du document associe les grandes étapes de la police aux régimes politiques successifs : Monarchie absolue → Révolution française (1789) → Ire République (1792, Convention/Directoire/Consulat) → Ier Empire (Napoléon Bonaparte, 1804) → Restauration monarchique (1814-1830, Louis XVIII puis Charles X) → Monarchie de Juillet (1830-1848, Louis-Philippe) → IIe République (1848) → IIe Empire (1852, Napoléon III) → IIIe République (1870, incluant la 1re guerre mondiale 1914-1918) → Régime de Vichy (10/07/1940-20/08/1944) → IVe République (1946) → Ve République (depuis le 04/10/1958)." },
            { titre: "Chronologie des grandes dates de la police", points: ["**1667** : création de la lieutenance de Police (Nicolas de La Reynie).", "**26/08/1789** : Déclaration des droits de l'Homme et du Citoyen.", "**1800** : création de la Préfecture de Paris.", "**1829** : création des sergents de ville (en uniforme), qui deviendront « gardiens de la paix publique » en 1870.", "**1883** : naissance de la Police-Secours, création de la 1re école de Police (Paris), Bertillon invente l'anthropométrie judiciaire (contexte : la Commune de Paris, soulèvement populaire de 1871).", "**1907** : création du service des Renseignements Généraux.", "**1913** : création des brigades mobiles régionales, dites « brigades du Tigre » (ancêtres de la police judiciaire).", "**1930** : création des Groupes Mobiles de Réserve (GMR), remplacés en 1944 par les CRS.", "**1941** : charte du maintien de l'ordre moderne ; instauration d'une police d'État dans les communes de plus de 10 000 habitants.", "**1966** : loi Frey, unification de la Préfecture de police et de la Sûreté nationale → création de la **Police nationale**.", "**1972-1978** : ouverture progressive du concours d'inspecteur/de commissaire/de gardien de la paix aux femmes.", "Création ultérieure du GIPN, du SCPAF, du RAID et des GIR.", "**2009** : rattachement de la Gendarmerie nationale au ministère de l'Intérieur."] },
          ],
        },
      ],
    },
  ],
};


const DOC_DPG_DPS_INITIAL = {
  titre: "D.P.S. / D.P.G. (socle initial)",
  sections: [
    {
      numero: 1,
      titre: "Généralités",
      fiches: [
        {
          titre: "Classification des infractions",
          reference: "Art. 111-1 à 131-18 du Code pénal",
          plan: [
            { titre: "Principe", texte: "Les infractions sont classées, suivant leur gravité, en **crimes, délits et contraventions** (art. 111-1 C.P.)." },
            { niveau: "I", titre: "Crimes (peines criminelles)", reference: "Art. 131-1/131-2 C.P.", points: ["Réclusion (droit commun) ou détention (infraction politique) : à perpétuité, ou de 30, 20 ou 15 ans au plus.", "**Nota** : une durée minimum de 10 ans de réclusion/détention criminelle est encourue.", "Amende et/ou peine(s) complémentaire(s)."] },
            { niveau: "II", titre: "Délits (peines correctionnelles)", reference: "Art. 131-3/131-11 C.P.", points: ["Emprisonnement (sursis/sursis probatoire/aménagement possible) : 10, 7, 5, 3, 2, 1 an, 6 ou 2 mois au plus.", "Détention à domicile sous surveillance électronique.", "Travail d'intérêt général, amende, jour-amende."] },
            { niveau: "III", titre: "Contraventions (peines contraventionnelles)", reference: "Art. 131-12/131-18 C.P.", points: ["Amende : 1re classe (38€ max), 2e (150€), 3e (450€), 4e (750€), 5e (1 500€, 3 000€ en récidive prévue par un texte).", "Peines privatives/restrictives de droits ; sanction-réparation ; peines complémentaires à titre de peine principale."] },
          ],
        },
        {
          titre: "L'infraction",
          plan: [
            { titre: "Définition", texte: "Toute action ou omission contraire à l'ordre social, prévue et réprimée par la loi. 3 éléments constitutifs sont nécessaires." },
            { niveau: "I", titre: "L'élément légal", texte: "Sans texte légal, il n'y a pas d'infraction, même si l'acte trouble l'ordre public. Crimes et délits sont prévus par des lois, les contraventions par des règlements." },
            { niveau: "II", titre: "L'élément matériel", texte: "Le droit pénal ne punit les intentions que lorsqu'elles se sont manifestées par un acte extérieur.", points: ["**Infraction de commission** : action physique + résultat + lien de causalité (ex : le vol).", "**Infraction d'omission** : la loi prévoit une obligation d'agir et sanctionne l'omission (ex : non-assistance à personne en péril)."] },
            { niveau: "III", titre: "L'élément moral", texte: "Il n'y a pas d'infraction sans élément moral.", points: ["**Faute intentionnelle** (art. 121-3 al.1) : « il n'y a point de crime ou de délit sans intention de le commettre ».", "**Faute non-intentionnelle** : la loi réprime aussi l'imprudence, la négligence et le manquement à une obligation de prudence.", "**En matière contraventionnelle** : la faute est présumée dès la constatation de la violation, sauf preuve d'une force majeure."] },
            { titre: "Les circonstances aggravantes", reference: "Art. 132-71 à 132-80 C.P.", texte: "Ne sont **pas des éléments constitutifs** de l'infraction et sont **exclues en matière de contravention**.", points: ["Bande organisée, guet-apens, préméditation, effraction, escalade, port/usage d'arme, qualité de conjoint/concubin/partenaire PACS.", "Réunion, ITT, état d'ivresse/emprise de stupéfiants, qualité de dépositaire de l'autorité publique de la victime.", "**Motif discriminatoire** (132-76 racisme, 132-77 orientation/identité sexuelle) : sauf exceptions (violences, harcèlement sexuel, discriminations elles-mêmes, provocations/diffamations/injures loi 1881)."] },
          ],
        },
        {
          titre: "La tentative punissable",
          reference: "Art. 121-4 et 121-5 du Code pénal",
          plan: [
            { titre: "Définition", texte: "L'auteur est la personne qui commet les faits ou qui tente de commettre un crime ou, dans les cas prévus par la loi, un délit (art. 121-4). La tentative est constituée dès lors que, manifestée par un commencement d'exécution, elle n'a été suspendue ou n'a manqué son effet qu'en raison de circonstances indépendantes de la volonté de l'auteur (art. 121-5)." },
            { niveau: "I", titre: "Un commencement d'exécution", texte: "L'acte accompli doit tendre directement au crime ou au délit. Sinon, il s'agit d'un simple **acte préparatoire non punissable**.", points: ["Ex : acheter un pied de biche pour cambrioler = acte préparatoire non punissable.", "Ex : fracturer une porte avec ce pied de biche puis être interrompu = commencement d'exécution punissable."] },
            { niveau: "II", titre: "L'absence de désistement volontaire", texte: "Le désistement volontaire consiste à renoncer de sa propre volonté. En son absence, la tentative est caractérisée si l'infraction a été interrompue par une **cause étrangère** à la volonté de l'auteur (ex : arrivée inopinée d'un tiers)." },
            { niveau: "III", titre: "La répression", points: ["**Toute tentative de crime est punissable.**", "La tentative de délit **n'est punissable que dans les cas prévus par la loi**.", "La tentative de contravention **n'est jamais punissable**.", "La peine encourue est la **même** que celle de l'infraction consommée."] },
            { titre: "La tentative infructueuse", texte: "L'auteur accomplit tous les actes sans parvenir au résultat.", points: ["**Infraction manquée** : exécution complète qui ne réussit pas (ex : coup de feu qui rate la cible par maladresse).", "**Infraction impossible** : résultat impossible du fait d'une impossibilité ignorée de l'auteur (ex : coup de feu tiré sur un mort en croyant tuer un vivant). Les deux sont punies comme la tentative."] },
          ],
        },
        {
          titre: "La complicité",
          reference: "Art. 121-6 et 121-7 du Code pénal",
          plan: [
            { titre: "Définitions", texte: "Est complice d'un crime ou d'un délit la personne qui, sciemment, par aide ou assistance, en a facilité la préparation ou la consommation. Est également complice celle qui, par don, promesse, menace, ordre, abus d'autorité ou de pouvoir, a provoqué à une infraction ou donné des instructions pour la commettre." },
            { niveau: "I", titre: "Un fait principal punissable", texte: "Le complice « emprunte » la criminalité de l'auteur : sans acte contraire à la loi commis par l'auteur, pas de répression du complice. En matière contraventionnelle, le complice par aide n'est puni que si le règlement le prévoit ; le complice par instigation est **toujours punissable** (art. R.610-2 C.P.)." },
            { niveau: "II", titre: "Une participation à l'infraction", points: ["**Aide ou assistance** : fourniture de moyens matériels, ou concours apporté au moment de la préparation/réalisation (ex : fournir une arme).", "**Provocation** : accompagnée de don/promesse/ordre/menace/abus d'autorité, individuelle et suivie d'effets (le simple conseil n'entraîne pas la complicité).", "**Fourniture d'instructions** : indications précises facilitant l'exécution, données en connaissance de cause (ex : indiquer les heures d'absence pour un cambriolage)."] },
            { niveau: "III", titre: "L'intention de participer", texte: "Le complice doit avoir conscience du caractère délictueux des actes et la volonté de s'associer à l'acte délictueux, en agissant « ensemble et de concert » avec l'auteur." },
            { titre: "Répression", texte: "Le complice est puni **comme l'auteur** de l'infraction (art. 121-6 C.P.) : il encourt les mêmes peines que s'il en avait été l'auteur." },
          ],
        },
        {
          titre: "La légitime défense",
          reference: "Art. 122-5 et 122-6 du Code pénal",
          plan: [
            { niveau: "I", titre: "La légitime défense des personnes", reference: "Art. 122-5 al.1", texte: "N'est pas pénalement responsable la personne qui, devant une atteinte injustifiée envers elle-même ou autrui, accomplit dans le même temps un acte commandé par la nécessité de la légitime défense, sauf disproportion entre les moyens de défense et la gravité de l'atteinte.", enfants: [
              { titre: "Conditions relatives à l'atteinte", points: ["**Injustifiée** : sans motif légitime, contraire au droit.", "**Actuelle** : en train de se produire ou imminente — pas de défense contre une attaque future.", "**Réelle** : doit exister de manière certaine ; une crainte subjective ne suffit pas."] },
              { titre: "Conditions relatives à la riposte", points: ["**Nécessaire** : aucun autre moyen de se soustraire au danger.", "**Simultanée** : immédiate par rapport à l'atteinte, ni anticipée ni tardive (vengeance).", "**Proportionnée** : mesurée et en rapport avec la gravité de l'atteinte."] },
            ]},
            { niveau: "II", titre: "La légitime défense des biens", reference: "Art. 122-5 al.2", texte: "N'est pas pénalement responsable la personne qui, pour interrompre l'exécution d'un crime ou d'un délit contre un bien, accomplit un acte de défense, autre qu'un homicide volontaire, lorsque cet acte est strictement nécessaire au but poursuivi dès lors que les moyens employés sont proportionnés à la gravité de l'infraction.", enfants: [
              { titre: "Les 3 conditions de l'acte de défense", points: ["**« Strictement » nécessaire** au but poursuivi.", "**Autre qu'un homicide volontaire** : le législateur a considéré qu'aucun crime ou délit contre un bien, aussi grave soit-il, ne pouvait justifier la mort d'une personne.", "**Proportionné** : il appartient à la personne poursuivie de démontrer que le principe de proportionnalité a été respecté — la jurisprudence paraît imposer à la personne poursuivie la preuve que les conditions nécessaires à la légitime défense sont réunies."] },
            ]},
            { niveau: "III", titre: "Les cas présumés de légitime défense", reference: "Art. 122-6", texte: "Est présumé avoir agi en état de légitime défense celui qui accomplit l'acte :", points: ["**1er cas** : pour repousser, de nuit (intervalle entre le coucher et le lever du soleil), l'entrée par effraction, violence ou ruse, dans un lieu habité.", "**2e cas** : pour se défendre, de jour comme de nuit, contre les auteurs de vols ou de pillages exécutés avec violence (coups, tortures, etc.)."], enfants: [
              { titre: "Portée", texte: "Dans les 2 cas, il s'agit d'une **présomption** de légitime défense qui peut donc céder devant la **preuve contraire**." },
            ]},
          ],
        },
        {
          titre: "Le cadre légal d'usage des armes",
          reference: "Art. L.435-1 du Code de la sécurité intérieure",
          plan: [
            { niveau: "I", titre: "Les trois conditions préalables à l'usage d'une arme", texte: "Le policier doit respecter trois conditions pour que les règles de l'usage de l'arme s'appliquent :", enfants: [
              { titre: "1. Il doit agir dans l'exercice de ses fonctions", texte: "Soit pendant son temps de service et dans le cadre de ses missions, soit hors service lorsqu'il agit au titre des art. R.434-19 C.S.I. et 113-3 R.G.E.P.N. (assistance à personne en danger). **Nota** : cette possibilité hors service ne peut se concevoir pour les policiers adjoints, qui ne conservent pas leur arme individuelle en dehors des heures de service." },
              { titre: "2. Il doit être revêtu de son uniforme ou des insignes extérieurs et apparents de sa qualité", texte: "Par exemple le port du brassard. **Nota** : les policiers adjoints exercent en tenue d'uniforme, sauf autorisation exceptionnelle de tenue civile par leur chef de service." },
              { titre: "3. Il ne peut utiliser son arme qu'en cas d'absolue nécessité et de manière strictement proportionnée", texte: "L'**absolue nécessité** signifie qu'il doit exister une menace d'atteinte à la vie ou à l'intégrité physique de l'agent ou d'autrui, avec des raisons réelles et objectives de le penser. L'**obligation de proportionnalité** implique qu'il n'existe aucun autre moyen d'écarter cette menace. Si l'une des conditions préalables n'est pas remplie, les dispositions de la légitime défense de droit commun (art. 122-5 C.P.) peuvent être invoquées." },
            ]},
            { niveau: "II", titre: "Les cinq situations prévues par le C.S.I.", texte: "Sous réserve que les trois conditions préalables soient remplies, les policiers sont autorisés à faire usage de l'arme dans cinq situations, hors dispersion d'un attroupement (art. L.211-9 C.S.I.) et régime de droit commun de la légitime défense (art. 122-5 C.P.).", enfants: [
              { titre: "1. Atteintes à la vie/l'intégrité physique ou menace par des personnes armées (art. L.435-1 1° C.S.I.)", texte: "Lorsque des atteintes à la vie ou à l'intégrité physique sont portées contre eux ou un tiers, ou que des personnes armées menacent leur vie ou leur intégrité physique, ou celles d'un tiers. Situation la plus proche de la légitime défense (122-5 C.P.). Compte tenu de l'imminence, **aucune sommation** n'est prévue." },
              { titre: "2. La défense des lieux qu'ils occupent ou des personnes qui leur sont confiées (art. L.435-1 2° C.S.I.) — sommations obligatoires", texte: "Après **deux sommations à haute voix**, lorsque les policiers ne peuvent défendre autrement les lieux qu'ils occupent (à titre permanent : poste de police, centre de rétention ; ou provisoire : lieu de perquisition), ou les personnes qui leur sont confiées (personnalité protégée, personne en GAV/rétention, personne interpellée/mise en cause/victime sur les lieux)." },
              { titre: "3. La fuite d'un individu dangereux placé sous leur garde (art. L.435-1 3° C.S.I.) — sommations obligatoires", texte: "Après **deux sommations à haute voix**, lorsqu'une personne placée sous leur garde (GAV, conduite au tribunal) cherche à échapper à leur garde/investigations, **et** qu'il existe des raisons réelles et objectives de penser qu'elle va porter atteinte, au moment où elle prend la fuite, à leur vie/intégrité physique ou à celles d'autrui. Une simple crainte n'est pas un fait objectif." },
              { titre: "4. L'immobilisation d'un véhicule occupé par un ou des individus dangereux (art. L.435-1 4° C.S.I.) — refus d'obtempérer à un ordre d'arrêt", texte: "Lorsque le conducteur n'a pas obtempéré immédiatement à l'ordre d'arrêt (gestes réglementaires, coups de sifflet, barrage, DIVA), **et** qu'il existe des raisons réelles et objectives de penser que les occupants sont susceptibles de porter atteinte, dans leur fuite, à leur vie/intégrité physique ou à celles d'autrui. Pas d'usage de l'arme en l'absence de toute dangerosité des occupants." },
              { titre: "5. Le périple meurtrier (art. L.435-1 5° C.S.I.)", texte: "Contre un individu réunissant 3 conditions cumulatives : il vient de commettre ou tenter de commettre un ou plusieurs meurtres ; le policier a des raisons réelles et objectives de penser qu'une réitération de ces crimes est probable ; l'usage de l'arme est le seul moyen et a pour but exclusif d'empêcher cette réitération, dans un temps rapproché." },
              { titre: "Les sommations", texte: "Appels à haute voix : « **Halte police** », et si l'individu n'obtempère pas : « **Halte ou je fais feu** ». Les deux sommations doivent se succéder dans un temps court." },
            ]},
            { titre: "Si une condition manque", texte: "Les dispositions de la **légitime défense de droit commun** (art. 122-5 C.P.) peuvent être invoquées." },
          ],
        },
        {
          titre: "Les libertés publiques",
          plan: [
            { niveau: "I", titre: "La liberté individuelle ou sûreté", enfants: [
              { niveau: "A", titre: "Définition et textes fondateurs", texte: "« Elle est la liberté fondamentale qui garantit toutes les autres » (Pr. J. Rivero). Désigne le droit de se déplacer à son gré, de n'être ni arrêté ni détenu arbitrairement.", points: ["Art. 7 DDHC 1789 : « Nul ne peut être accusé, arrêté, détenu que dans les cas déterminés par la loi et selon les formes qu'elle a prescrites ».", "Art. 66 Constitution 1958 : « Nul ne peut être arbitrairement détenu. L'autorité judiciaire, gardienne de la liberté individuelle, assure le respect de ce principe... ».", "Valeur constitutionnelle mais non absolue : atteintes possibles soit en répression d'une infraction (autorité judiciaire), soit pour préserver/rétablir l'ordre public dans des cas exceptionnels et limités (autorité de police administrative)."] },
              { niveau: "B", titre: "Mesures privatives de liberté", points: ["**Cadre judiciaire** : garde à vue, contrôles d'identité (policiers), mandats de justice, détention provisoire (magistrats).", "**Cadre administratif** : internement des malades mentaux, rétention administrative des étrangers — mesures de précaution, non de punition."] },
            ]},
            { niveau: "II", titre: "La liberté d'aller et venir", enfants: [
              { niveau: "A", titre: "Définitions", texte: "Ne figure pas explicitement dans la déclaration de 1789 mais en découle, complément de la sûreté. Valeur constitutionnelle reconnue par le Conseil constitutionnel (décision du 12/07/1979). Limitée par les exigences de l'ordre public." },
              { niveau: "B", titre: "Restrictions à la liberté d'aller et venir", points: ["**Circulation automobile** : conditionnée au permis et au respect du code de la route.", "**Stationnement** : lieux/durées réglementés, règles renforcées pour les gens du voyage.", "**Certaines activités** : les commerçants ambulants doivent détenir une carte préfectorale.", "**Certaines catégories de personnes** : mesures restreignant la liberté d'aller et venir des étrangers (entrée, séjour, éloignement)."] },
            ]},
          ],
        },
        {
          titre: "Les cas de rétention dans les locaux de police",
          plan: [
            { titre: "Principe", texte: "La police, comme la gendarmerie, les douanes et la justice, dispose du droit de retenir des individus. La rétention est une limitation de la liberté d'aller et venir, encadrée par un formalisme et un contrôle de l'autorité judiciaire (art. 9 DDHC : toute rigueur non strictement nécessaire doit être sévèrement réprimée). La classification judiciaire/administrative qui suit est théorique, choisie pour faciliter l'apprentissage (certaines procédures, comme la vérification d'identité, sont à la frontière des deux)." },
            { niveau: "I", titre: "Mesures à caractère judiciaire", enfants: [
              { niveau: "1", titre: "La garde à vue", texte: "Décidée par un O.P.J., 24h prolongeable de 24h (jusqu'à **96h** pour criminalité organisée/trafic de stupéfiants, **144h** pour terrorisme)." },
              { niveau: "2", titre: "La retenue des mineurs de 10 à 13 ans", texte: "12h, décidée par un O.P.J., si raisons plausibles de crime/délit puni d'au moins 5 ans, prolongeable exceptionnellement de 12h." },
              { niveau: "3", titre: "La vérification d'identité", reference: "Art. 78-3 C.P.P.", texte: "En cas de refus/impossibilité de justifier son identité, conduite possible au commissariat, présentation immédiate à l'O.P.J. Durée maximale : **4 heures** à compter du contrôle (8 heures à Mayotte)." },
              { niveau: "4", titre: "L'exécution d'un mandat d'amener ou d'arrêt", texte: "Ordre de l'autorité judiciaire d'arrêter et présenter un individu. Rétention limitée au temps strictement nécessaire à la notification et à l'avis au magistrat." },
              { niveau: "5", titre: "L'exécution d'un mandat de recherche", texte: "Ordre de rechercher la personne visée et de la placer en garde à vue." },
              { niveau: "6", titre: "L'exécution d'une retenue judiciaire (domaine de l'O.P.J.)", points: ["**Contrainte judiciaire** : incarcérer une personne n'ayant pas payé une amende pour un délit puni d'emprisonnement.", "**Retenue pour vérification du respect des obligations judiciaires** : personne condamnée ou sous contrôle judiciaire."] },
            ]},
            { niveau: "II", titre: "Mesures à caractère administratif", enfants: [
              { niveau: "1", titre: "La retenue pour vérification du droit au séjour", texte: "Décidée par un O.P.J., 24h, pour vérifier le droit de circulation/séjour d'un étranger." },
              { niveau: "2", titre: "L'hébergement des étrangers avant reconduite à la frontière", texte: "Surveillance par les policiers, jusqu'à réunion des conditions du transport." },
              { niveau: "3", titre: "Placement en chambre de sûreté pour ivresse", texte: "Concerne l'ivresse publique et manifeste, la conduite en état d'ivresse ou tout délit commis en état d'ivresse. Légale jusqu'au **complet dégrisement**." },
              { niveau: "4", titre: "Le recueil temporaire des malades mentaux", texte: "Mesure exceptionnelle devant aboutir immédiatement à un transfert médical spécialisé." },
              { niveau: "5", titre: "La garde des mineurs en fugue", texte: "Permet aux personnes ayant la garde de l'enfant de le retrouver." },
              { niveau: "6", titre: "La retenue pour vérification de situation", texte: "Personne suspectée de lien avec des activités terroristes, même munie d'un document d'identité. Durée maximale : **4 heures** à compter du contrôle." },
            ]},
          ],
        },
        {
          titre: "La responsabilité pénale — causes d'irresponsabilité ou d'atténuation",
          reference: "Art. 122-1 à 122-9 du Code pénal",
          plan: [
            { titre: "Principe", texte: "Nul n'est responsable que de son propre fait (art. 121-1 C.P.). Dans certaines situations, un individu ayant commis une infraction n'en sera pas jugé responsable, en raison de circonstances particulières prévues par le code pénal." },
            { niveau: "I", titre: "La minorité", reference: "Art. 122-8", texte: "Présomption de non-discernement avant 13 ans, présomption de discernement après. Appréciation du **magistrat**." },
            { niveau: "II", titre: "Le trouble psychique ou neuropsychique", reference: "Art. 122-1", points: ["Aboli le discernement → irresponsabilité totale.", "Seulement altéré → responsabilité pouvant être atténuée."] },
            { niveau: "III", titre: "La contrainte", reference: "Art. 122-2", texte: "Force irrésistible, physique ou morale, qui anéantit la liberté de décision et donc la responsabilité." },
            { niveau: "IV", titre: "L'erreur de droit", reference: "Art. 122-3", texte: "Reconnue si l'auteur a cru légitimement pouvoir agir, en raison d'une erreur de droit qu'il n'était pas en mesure d'éviter." },
            { niveau: "V", titre: "Les faits justificatifs", enfants: [
              { niveau: "A", titre: "Acte prescrit ou autorisé par la loi", reference: "Art. 122-4 al.1" },
              { niveau: "B", titre: "Acte légal commandé par l'autorité légitime", reference: "Art. 122-4 al.2", texte: "Sauf ordre manifestement illégal." },
              { niveau: "C", titre: "La légitime défense", reference: "Art. 122-5/122-6", texte: "Voir fiche dédiée." },
              { niveau: "D", titre: "L'état de nécessité", reference: "Art. 122-7", texte: "Danger actuel/imminent, nécessité de l'infraction, moyens non disproportionnés." },
              { niveau: "E", titre: "Le lanceur d'alerte", reference: "Art. 122-9", texte: "Divulgation nécessaire et proportionnée d'un secret, de bonne foi et de façon désintéressée." },
            ]},
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "La hiérarchie des personnels de la police nationale : fonctions judiciaires",
      fiches: [
        {
          titre: "La qualité d'officier, agent et agent adjoint de police judiciaire",
          reference: "Art. 12, 13, 16, 16-1 A, 20, 20-1, 21, 21-3 du Code de procédure pénale",
          plan: [
            { titre: "Cadre général", texte: "La police judiciaire est exercée sous la direction du procureur de la République (art. 12), placée sous la surveillance du procureur général et le contrôle de la chambre de l'instruction (art. 13). Le CPP confère la qualification d'O.P.J., d'A.P.J. ou d'A.P.J.A. — les O.P.J. et A.P.J. peuvent être secondés par des assistants d'enquête." },
            { niveau: "I", titre: "Les officiers de police judiciaire (O.P.J.)", enfants: [
              { niveau: "A", titre: "Qui a la qualité d'O.P.J. ?", reference: "Art. 16 C.P.P.", points: ["Les maires et leurs adjoints.", "Les officiers/gradés de la gendarmerie, gendarmes nominativement désignés par arrêté (après avis conforme d'une commission).", "Inspecteurs généraux, sous-directeurs de police active, contrôleurs généraux, commissaires de police, officiers de police.", "Fonctionnaires du corps d'encadrement et d'application nominativement désignés par arrêté.", "Directeurs/sous-directeurs de la police judiciaire et de la gendarmerie."] },
              { niveau: "B", titre: "Conditions d'exercice", points: ["Être affecté à un emploi comportant l'exercice de la police judiciaire.", "Être habilité personnellement par le procureur général (les fonctionnaires du corps d'encadrement/application uniquement s'ils sont affectés dans un service déterminé).", "Ne pas participer, en unité constituée, à une opération de maintien de l'ordre."] },
              { niveau: "C", titre: "Le mode de désignation", enfants: [
                { niveau: "1", titre: "De plein droit", texte: "Maires, adjoints au maire, directeurs/sous-directeurs de la PJ et de la gendarmerie exercent sans habilitation préalable." },
                { niveau: "2", titre: "Avec habilitation", texte: "Gendarmes de tous grades (sauf directeurs), inspecteurs généraux, commissaires, corps de commandement, corps d'encadrement désignés doivent recevoir une habilitation du procureur général territorialement compétent. **La première habilitation vaut pour toute la durée des fonctions** (pas de renouvellement en cas de changement d'affectation)." },
              ]},
            ]},
            { niveau: "II", titre: "Les agents de police judiciaire (A.P.J.)", texte: "Trois catégories distinguées par le CPP.", enfants: [
              { niveau: "A", titre: "A.P.J. de l'art. 20 C.P.P.", points: ["Militaires de la gendarmerie nationale (hors volontaires) n'ayant pas la qualité d'O.P.J.", "Fonctionnaires des services actifs de la police nationale (titulaires et stagiaires) n'ayant pas la qualité d'O.P.J."] },
              { niveau: "B", titre: "A.P.J. de l'art. 20-1 C.P.P.", texte: "Fonctionnaires/militaires actifs ou retraités ayant exercé O.P.J./A.P.J. pendant ≥5 ans peuvent bénéficier de cette qualité en réserve opérationnelle, sous réserve d'une remise à niveau si la rupture avec le service dépasse 1 an." },
              { niveau: "C", titre: "A.P.J.A. de l'art. 21 C.P.P.", texte: "Pouvoirs judiciaires moins étendus.", points: ["Fonctionnaires des services actifs ne remplissant pas les conditions de l'art. 20.", "Volontaires/réservistes de la gendarmerie ne remplissant pas les conditions de l'art. 20-1.", "Policiers adjoints et réservistes de la police nationale ne remplissant pas les conditions des art. 16-1 A ou 20-1.", "Contrôleurs de la préfecture de police (voie publique) et agents de surveillance de Paris.", "Agents de police municipale.", "Gardes champêtres (pour les attributions de l'art. L.521-1 C.S.I. avant-dernier alinéa)."] },
              { niveau: "D", titre: "Conditions d'exercice de la qualité d'A.P.J. 20", points: ["Être affecté à un emploi comportant l'exercice de la police judiciaire.", "Ne pas participer, en unité constituée, à une opération de maintien de l'ordre.", "Sont exclus les fonctionnaires affectés principalement à des tâches administratives ou de maintien de l'ordre."] },
            ]},
            { niveau: "III", titre: "Les assistants d'enquête", reference: "Art. 21-3 C.P.P.", texte: "Chargés de seconder O.P.J. et A.P.J. dans certaines formalités procédurales. Recrutés parmi : militaires du corps de soutien technique/administratif de la gendarmerie, personnels administratifs de catégorie B (police/gendarmerie), A.P.J.A. de la police/gendarmerie — après une formation sanctionnée par un examen certifiant leur aptitude." },
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "Les cadres juridiques",
      fiches: [
        {
          titre: "Les cadres d'enquête",
          reference: "Art. 14, 17, 53 à 78 du Code de procédure pénale",
          plan: [
            { titre: "Cadre général", texte: "Les actes de police judiciaire (constater les infractions, en rassembler les preuves, en rechercher les auteurs) s'accomplissent au cours de la « phase policière », désignée par le CPP sous le nom d'**enquêtes**. Les articles 14 et 17 mentionnent 3 cadres juridiques : l'enquête de flagrant délit, l'enquête préliminaire, la commission rogatoire. D'autres cadres spécifiques permettent d'enquêter sans infraction préalablement établie (cadavre/personne blessée de cause inconnue, disparitions inquiétantes). Toute violation du secret de l'enquête/instruction concernant un crime/délit est pénalement sanctionnée ; seuls le procureur et l'O.P.J. (avec son accord et sous son contrôle) peuvent communiquer." },
          ],
        },
        {
          titre: "L'enquête de flagrant délit",
          reference: "Art. 53 à 73 du Code de procédure pénale",
          plan: [
            { titre: "Définition de la flagrance", reference: "Art. 53 C.P.P.", texte: "Est qualifié crime ou délit flagrant le crime ou le délit qui se commet actuellement, ou qui vient de se commettre. Il y a aussi flagrance lorsque, dans un temps très voisin de l'action, la personne soupçonnée est poursuivie par la clameur publique, ou est trouvée en possession d'objets, ou présente des traces/indices laissant penser qu'elle a participé au crime/délit." },
            { titre: "Champ d'application", texte: "Réservée aux **crimes et délits punis d'une peine d'emprisonnement**. Exclut les contraventions et les délits non punis d'emprisonnement." },
            { titre: "Durée", texte: "8 jours à compter du premier acte de constatation, prolongeable une fois de 8 jours par le procureur pour les enquêtes portant sur un crime ou un délit puni d'au moins 5 ans d'emprisonnement." },
            { titre: "Pouvoirs élargis de l'O.P.J.", points: ["Se transporter sans délai sur le lieu du crime.", "Perquisitions et saisies sans l'assentiment de la personne (dans les conditions légales).", "Placement en garde à vue.", "Réquisition de toute personne qualifiée pour des constatations/examens techniques.", "Recours à la force publique."] },
          ],
        },
        {
          titre: "L'enquête préliminaire",
          reference: "Art. 75 à 78 du Code de procédure pénale",
          plan: [
            { titre: "Définition", texte: "Enquête menée par les O.P.J./A.P.J., soit d'office, soit sur instructions du procureur de la République, en dehors des cas de flagrance." },
            { titre: "Champ d'application", texte: "S'applique à **toutes les infractions** (crimes, délits, contraventions), contrairement à la flagrance limitée aux crimes/délits punis d'emprisonnement." },
            { titre: "Caractéristique principale : l'absence de coercition", texte: "Les actes de contrainte (perquisition, saisie sans accord) ne sont possibles que sous des conditions strictes, contrairement à la flagrance." },
            { titre: "Durée", texte: "2 ans à compter du premier acte de contrainte, prolongeable d'1 an par le procureur, puis exceptionnellement jusqu'à 5 ans au total." },
          ],
        },
        {
          titre: "Les autres cadres d'enquête",
          plan: [
            { niveau: "I", titre: "La découverte d'un cadavre ou d'une personne grièvement blessée de cause inconnue ou suspecte", reference: "Art. 74 C.P.P.", texte: "L'O.P.J. informe immédiatement le procureur, se transporte sur les lieux sans délai et procède aux premières constatations." },
            { niveau: "II", titre: "Les disparitions inquiétantes", reference: "Art. 74-1 C.P.P.", texte: "Sur instructions du procureur, l'O.P.J. peut procéder aux actes utiles à la recherche d'un mineur ou d'un majeur protégé disparu, ou de toute personne dont la disparition présente un caractère inquiétant ou suspect." },
            { niveau: "III", titre: "La commission rogatoire", reference: "Art. 81, 151 à 155 C.P.P.", texte: "Le juge d'instruction délègue à un O.P.J. tout ou partie de ses pouvoirs d'investigation, dans les limites qu'il fixe." },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "Compétences des policiers en matière de contrôle d'identité",
      fiches: [
        {
          titre: "Le contrôle d'identité",
          reference: "Art. 78-1 à 78-6 du Code de procédure pénale",
          plan: [
            { niveau: "I", titre: "Les contrôles d'identité de police judiciaire", reference: "Art. 78-2 al.2 à 6 C.P.P.", texte: "Sur l'ensemble du territoire, l'identité de toute personne peut être contrôlée par un O.P.J., ou sur son ordre et sous sa responsabilité par un A.P.J./A.P.J.A., pour rechercher/prévenir une infraction.", points: ["Il existe des raisons plausibles de soupçonner qu'elle a commis ou tenté de commettre une infraction.", "Ou qu'elle se prépare à commettre un crime ou un délit.", "Ou qu'elle est susceptible de fournir des renseignements utiles à l'enquête.", "Ou qu'elle a violé les obligations d'un contrôle judiciaire, d'une assignation à résidence, d'un suivi socio-judiciaire.", "Ou qu'elle fait l'objet de recherches ordonnées par une autorité judiciaire."] },
            { niveau: "II", titre: "Les contrôles d'identité sur réquisitions du procureur", reference: "Art. 78-2 al.7 C.P.P.", texte: "Sur réquisitions écrites du procureur, aux fins de recherche/poursuite d'infractions qu'il précise, l'identité de toute personne peut être contrôlée, quel que soit son comportement, dans les lieux et pour la période de temps déterminés par le procureur." },
            { niveau: "III", titre: "Les contrôles d'identité de police administrative", reference: "Art. 78-2 al.8", texte: "Pour prévenir une atteinte à l'ordre public, notamment à la sécurité des personnes ou des biens." },
            { niveau: "IV", titre: "La vérification d'identité", reference: "Art. 78-3 C.P.P.", texte: "Compétence exclusive de l'O.P.J. Si la personne refuse ou est dans l'impossibilité de justifier son identité, elle peut être retenue sur place ou conduite au commissariat, et présentée immédiatement à un O.P.J. Durée maximale : **4 heures** à compter du contrôle (8h à Mayotte)." },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "Compétences des agents verbalisateurs en matière de circulation routière",
      fiches: [
        {
          titre: "Les compétences des agents verbalisateurs en matière de circulation routière",
          reference: "Art. L.130-4 à L.130-7 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Les contraventions au code de la route sont constatées par procès-verbal, dressé par des agents habilités à cet effet, selon leur qualité et les infractions concernées." },
            { titre: "Qui peut verbaliser ?", points: ["Les OPJ, APJ et APJA (dans les limites de leurs attributions respectives).", "Les agents de police municipale.", "Les gardes champêtres, pour certaines infractions.", "Certains agents assermentés spécifiques (stationnement notamment)."] },
            { titre: "Condition de validité des PV", texte: "Les agents non-OPJ doivent être **assermentés** pour que leurs procès-verbaux fassent foi jusqu'à preuve contraire (art. L.130-7 C.R. et art. 537 C.P.P.)." },
          ],
        },
      ],
    },
    {
      numero: 6,
      titre: "L'organisation judiciaire",
      fiches: [
        {
          titre: "L'organisation judiciaire",
          plan: [
            { titre: "Cadre général", texte: "Il appartient à l'État d'assurer l'application de la loi pénale par l'intermédiaire des cours et tribunaux, chargés de rendre des décisions." },
            { niveau: "I", titre: "Les magistrats", texte: "Magistrats professionnels recrutés par concours, formés à l'École Nationale de la Magistrature, nommés fonctionnaires du ministère de la justice comme magistrats du ministère public ou juges.", enfants: [
              { niveau: "A", titre: "Les juges", texte: "Magistrature « assise » ou « du siège » (prononcent les sentences assis). Conduisent les procès et prononcent les jugements. Indépendance garantie par l'**inamovibilité** (pas d'affectation nouvelle sans consentement, même en avancement). Jugent en collégialité (généralement 3) ou à juge unique (ex : tribunal de police).", points: ["Le **juge d'instruction** ne juge pas : il instruit les affaires (preuves, interrogatoires) avant jugement.", "Le **juge des libertés et de la détention (JLD)** ordonne, pendant l'instruction, le placement ou la prolongation de la détention provisoire."] },
              { niveau: "B", titre: "Les membres du ministère public", texte: "Magistrature « debout » (se lèvent à l'audience). Procureurs et substituts, appelés « ministère public » (représentent les intérêts de la société) ou « parquet ». Agissent comme les avocats de la société, requièrent l'application des lois ; suggèrent une peine dans leur réquisitoire mais **les juges restent libres** de leur décision." },
            ]},
            { niveau: "II", titre: "Les juridictions de l'ordre judiciaire", enfants: [
              { niveau: "A", titre: "Les juridictions civiles du 1er degré", texte: "Statuent sur les litiges entre particuliers (jugement).", points: ["**Tribunal judiciaire** : ensemble des litiges civils.", "**Tribunal de proximité** : petits litiges (loyers, bruits de voisinage...).", "Nota : depuis le 01/01/2020, tribunal d'instance + tribunal de grande instance = tribunal judiciaire (annexe si même commune, tribunal de proximité si communes différentes)."] },
              { niveau: "B", titre: "Les juridictions pénales du 1er degré", points: ["**Tribunal de police** : contraventions — juge unique + officier du ministère public (souvent un commissaire/commandant/capitaine de police sous contrôle du procureur).", "**Tribunal correctionnel** : délits — 3 juges + ministère public, rend un jugement.", "**Cour d'assises** (une par département) : crimes — 3 magistrats (1 président + 2 assesseurs) + ministère public (procureur général/avocat général) + jury populaire (6 jurés en 1er ressort, 9 en appel). Rend un **arrêt**.", "**Cour criminelle départementale** : crimes punis de 15 ou 20 ans non commis en récidive légale + délits connexes, sans jury (1 président + 4 assesseurs). Le juge d'instruction décide de la mise en accusation. Renvoi à la cour d'assises si les faits constituent en réalité un crime puni de 30 ans/perpétuité."] },
              { niveau: "C", titre: "Les juridictions professionnelles spécialisées", points: ["**Tribunaux de commerce** : litiges entre commerçants/sociétés commerciales.", "**Conseils de prud'hommes** : litiges employeurs/salariés.", "**Tribunaux paritaires des baux ruraux** : litiges propriétaires/fermiers ou métayers."] },
              { niveau: "D", titre: "Les juridictions des mineurs", reference: "Art. L.12-1 C.J.P.M.", points: ["**Tribunal de police** : contraventions des 4 premières classes commises par mineurs.", "**Juge des enfants** : délits et contraventions de 5e classe des mineurs (+ 4 premières classes connexes) ; juge seul en chambre du conseil ; rôle de protection et de sanction.", "**Tribunal pour enfants** : juge des enfants + 2 assesseurs (non-magistrats, >30 ans, désignés 4 ans) + ministère public — contraventions 5e classe/délits des mineurs ≥13 ans encourant ≥3 ans si la personnalité/gravité le justifie, et crimes des mineurs de moins de 16 ans.", "**Cour d'assises des mineurs** : 1 président + 2 juges des enfants + jury (6 ou 9) + ministère public — crimes des mineurs de plus de 16 ans et délits connexes, y compris co-auteurs/complices majeurs."] },
              { niveau: "E", titre: "Les juridictions du 2e degré", points: ["**Cour d'appel** : réexamine les jugements de 1re instance (tribunaux de proximité/judiciaire/police/correctionnels/commerce/prud'hommes) — rend des **arrêts**, structurée en chambres.", "**Cour d'assises statuant en appel** : réexamine un arrêt d'une autre cour d'assises."] },
              { niveau: "F", titre: "La juridiction suprême", texte: "**Cour de cassation** (Paris) : sommet de la hiérarchie judiciaire, saisie par pourvoi en cassation — ne réexamine pas les faits mais vérifie l'application stricte des règles de droit." },
            ]},
            { niveau: "III", titre: "Les juridictions de l'ordre administratif", texte: "Jugent les litiges entre particuliers et administrations (État, régions, départements, communes).", points: ["**Tribunaux administratifs** : affaires non attribuées à une autre juridiction (expropriations, impôts directs, élections locales, recours pour excès de pouvoir).", "**Cours administratives d'appel** : appels des jugements des tribunaux administratifs.", "**Conseil d'État** (Paris) : conseil du gouvernement + juridiction suprême administrative — juge en premier ressort les décisions nationales, en appel pour certaines affaires (excès de pouvoir), en cassation les arrêts des CAA."] },
          ],
        },
        {
          titre: "La magistrature",
          plan: [
            { titre: "Définition", texte: "Les magistrats sont les membres professionnels des juridictions de l'ordre judiciaire, chargés d'assurer l'application de la loi. Deux catégories : les magistrats du **siège** (les juges, qui rendent des décisions de justice) et les magistrats du **parquet** (les procureurs, qui requièrent l'application de la loi)." },
            { niveau: "I", titre: "Les magistrats du parquet", texte: "Mission générale de veiller à l'application de la loi ; agissent comme les avocats de la société qu'ils représentent. Dans chaque tribunal judiciaire, le parquet comprend le procureur de la République, éventuellement des procureurs adjoints et des substituts. Le procureur reçoit plaintes/dénonciations (art. 40 CPP) et apprécie la suite à donner (art. 40-1 CPP), procède ou fait procéder aux enquêtes judiciaires. À l'audience, il est le demandeur dans l'action publique et assure la poursuite des délinquants." },
            { niveau: "II", titre: "Les magistrats du siège", texte: "Le juge est chargé de rendre des jugements : par sa décision, à l'issue d'un procès, il dit officiellement ce qu'est le droit. Le **juge d'instruction** est un magistrat spécialisé du tribunal judiciaire, chargé de diligenter des enquêtes judiciaires pouvant déboucher sur un procès ; il peut demander aux policiers d'effectuer certains actes en leur délivrant une **commission rogatoire**." },
          ],
        },
      ],
    },
    {
      numero: 7,
      titre: "Les atteintes aux biens",
      fiches: [
        {
          titre: "Le vol",
          reference: "Art. 311-1 à 311-4-2 du Code pénal",
          definition: "Le vol est la soustraction frauduleuse de la chose d'autrui. C'est l'infraction la plus fréquemment commise.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'art. 311-1 C.P. définit le vol, l'art. 311-3 le réprime." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "La soustraction", texte: "Déplacement matériel de l'objet à l'insu et/ou contre le gré de la victime (ex : employé gardant des documents détenus pour ses fonctions ; vol à l'étalage — en libre-service, le client n'est détenteur qu'à titre précaire tant qu'il n'a pas payé)." },
                { niveau: "2", titre: "De la chose", texte: "Seul un **bien corporel** peut être soustrait (véhicule, animal, objet mobilier, parties du corps humain, ossements). Le vol d'énergie est assimilé (art. 311-2). **Exclus** : immeuble (violation de domicile), personne (rapt), service (ex : communications téléphoniques)." },
                { niveau: "3", titre: "D'autrui", texte: "La chose doit avoir un propriétaire au moment de l'appréhension — y compris chose perdue, donnée ou dont on n'est plus propriétaire exclusif. **Pas de vol** si la chose est sans maître (gibier, air, eau) ou abandonnée (déblais de travaux)." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["**Conscience** de soustraire une chose qui ne lui appartient pas.", "**Volonté** de se comporter, même momentanément, en maître de la chose (la soustraction temporaire suivie de restitution traduit déjà cette intention)."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**311-3 C.P. : 3 ans - 45 000 €.** A.F.D. possible (natinf 7151) si préjudice ≤300€ et chose restituée/victime indemnisée (300€ d'amende, 250€ minorée, 600€ majorée) — sauf mineur ou infractions multiples non-AFD." },
              { titre: "Aggravations — une circonstance", texte: "**311-4 C.P. : 5 ans - 75 000 €** : en réunion (sans bande organisée), par un dépositaire de l'autorité publique, usurpation de cette qualité, précédé/suivi de violences sans ITT." },
              { titre: "Aggravations — deux circonstances", texte: "**311-4 C.P. : 7 ans - 100 000 €** : matériel médical/établissement de santé, local d'habitation, transport collectif, précédé d'une destruction/dégradation, visage dissimulé, établissements scolaires, commerce illégal d'animaux." },
              { titre: "Aggravations — trois circonstances / cas spécifiques", points: ["**10 ans - 150 000 €** : cumul de 3 circonstances, ou par un majeur aidé de mineurs ≥13 ans (311-4-1).", "**10 ans - 150 000 €** : majeur aidé de mineurs <13 ans, ou bien culturel classé/musée/lieu de culte (311-4-2)."] },
              { titre: "L'immunité familiale", reference: "Art. 311-12 C.P.", points: ["Ascendants, descendants, conjoints **mariés** uniquement.", "**Exclue** pour papiers d'identité, moyens de paiement/télécommunication, ou si l'auteur est tuteur/curateur/mandataire de la victime.", "S'applique aussi à l'extorsion, au chantage, à l'escroquerie et à l'abus de confiance."] },
            ]},
          ],
        },
        {
          titre: "Destructions, dégradations, détériorations ne présentant pas un danger pour les personnes",
          reference: "Art. 322-1 à 322-3-1 du Code pénal",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 322-1/I du code pénal définit et réprime la destruction, la dégradation ou la détérioration d'un bien appartenant à autrui." },
              { niveau: "B", titre: "Élément matériel", texte: "Un acte dommageable (destruction, dégradation, détérioration) sur un bien appartenant à autrui, causant un **dommage important**." },
              { niveau: "C", titre: "Élément moral", texte: "Agir sciemment et volontairement, en sachant ne pas être propriétaire du bien et n'avoir aucun droit de disposition sur celui-ci." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**322-1/I C.P. : 2 ans - 30 000 €.**" },
              { titre: "Une circonstance aggravante", texte: "**322-2 C.P. : 3 à 5 ans, 45 000 à 75 000 €** : registre/acte de l'autorité publique, établissement scolaire/véhicule d'enfants, pluralité d'auteurs, victime vulnérable." },
              { titre: "Deux circonstances aggravantes", texte: "**322-3 C.P. : 7 ans - 100 000 €** : au préjudice d'un dépositaire de l'autorité publique (ou son entourage) pour influencer ses fonctions, d'un témoin/victime pour l'empêcher de dénoncer, par effraction dans un local d'habitation, lieu classifié défense nationale, visage dissimulé, matériel de premiers secours/vaccination." },
              { titre: "Biens culturels publics ou classés", texte: "**322-3-1 C.P. : 7 ans - 100 000 €** (simple), **10 ans - 150 000 €** si pluralité d'auteurs." },
            ]},
            { titre: "Tentative, complicité, discrimination", texte: "**Tentative : OUI. Complicité : OUI.** Peine relevée si motif discriminatoire (racisme, xénophobie, religion, sexisme, orientation sexuelle, identité de genre — art. 132-76/132-77)." },
          ],
        },
        {
          titre: "Destructions, dégradations, détériorations dangereuses pour les personnes",
          reference: "Art. 322-5 à 322-10 du Code pénal",
          definition: "Destruction, dégradation ou détérioration d'un bien appartenant à autrui par explosion/incendie/manquement à une obligation de sécurité (involontaire, 322-5), ou par substance explosive/incendie/tout moyen créant un danger pour les personnes (volontaire, 322-6).",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Non intentionnelles : art. 322-5 C.P. Intentionnelles : art. 322-6 C.P." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte positif", points: ["**Destruction** : la plus grave, totale ou partielle, rend le bien impropre à son usage.", "**Dégradation** : dommages ne rendant pas le bien inutilisable.", "**Détérioration** : moins grave, le bien perd de sa valeur mais reste utilisable."] },
                { niveau: "2", titre: "Sur un bien appartenant à autrui", texte: "Peu importe la nature exacte du bien endommagé." },
                { niveau: "3", titre: "Un danger pour les personnes", texte: "Aucune victime effective n'est exigée pour la constitution de l'infraction.", points: ["**322-5** : manquement à une obligation de prudence/sécurité imposée par la loi/le règlement, ayant entraîné le dommage (explosion ou incendie).", "**322-6** : substance explosive, incendie, ou tout autre moyen créant un danger — la sécurité doit être gravement mise en danger."] },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["**322-5** : omission de respecter une obligation précise (loi/règlement à caractère général — un règlement intérieur ou un arrêté préfectoral d'insalubrité ne sont pas visés).", "**322-6** : agir en connaissant l'efficacité du moyen employé et le danger qu'il représente pour la sécurité des personnes."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "322-5 (involontaire) — paliers", texte: "Simple : **1 an - 15 000 €**. Violation délibérée : **2 ans - 30 000 €**. Incendie de bois/forêts : 2-3 ans selon manquement/violation. Danger corporel/environnement irréversible : 3-5 ans. ITT ≥8 jours : 5-7 ans. Mort : 7-10 ans." },
              { titre: "322-6 (volontaire) — paliers", texte: "Simple : **10 ans - 150 000 €** (délit). Puis en crimes (322-7 à 322-10) : ITT ≤8j ou incendie forêt → **15 ans réclusion**. Bande organisée, ITT >8j, ou victime dépositaire de l'autorité → **20 ans**. Mutilation/infirmité → **30 ans**. Mort → **réclusion criminelle à perpétuité**." },
            ]},
            { titre: "Tentative, complicité", texte: "**322-5 : Tentative NON, Complicité NON.** **322-6 : Tentative OUI, Complicité OUI.**" },
          ],
        },
        {
          titre: "Les tags et graffitis",
          reference: "Art. 322-1/II du Code pénal",
          plan: [
            { titre: "Définition", texte: "Le fait de tracer des inscriptions, des signes ou des dessins, sans autorisation préalable, sur les façades, véhicules, voies publiques ou mobilier urbain, lorsqu'il n'en est résulté qu'un **dommage léger**." },
            { titre: "Distinction avec les D.D.D. classiques", texte: "À la différence de l'art. 322-1/I (dommage important), le tag/graffiti n'entraîne qu'un dommage **léger et facilement réparable** — cette différence de gravité justifie une peine strictement contraventionnelle/délictuelle allégée, **sans peine d'emprisonnement**, ce qui exclut la flagrance et l'interpellation pour ce seul fait." },
            { titre: "Répression", texte: "**322-1/II C.P. : 3 750 € d'amende et peine de travail d'intérêt général**, sans emprisonnement." },
          ],
        },
      ],
    },
    {
      numero: 8,
      titre: "Les atteintes aux personnes",
      fiches: [
        {
          titre: "Les discriminations",
          reference: "Art. 225-1 et 225-2 du Code pénal",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 225-1 du code pénal définit la discrimination ; l'article 225-2 la réprime." },
              { niveau: "B", titre: "Élément matériel", texte: "Une **distinction opérée entre les personnes physiques ou morales**, sur le fondement d'un critère prohibé, dans un domaine visé par la loi.", points: ["**Critères prohibés** : origine, sexe, situation de famille, grossesse, apparence physique, patronyme, lieu de résidence, état de santé, handicap, caractéristiques génétiques, mœurs, orientation sexuelle, identité de genre, âge, opinions politiques, activités syndicales, appartenance/non-appartenance vraie ou supposée à une ethnie/nation/race/religion.", "**Domaines visés** (art. 225-2) : refus de fourniture d'un bien ou service, entrave à l'exercice normal d'une activité économique, refus d'embauche/sanction/licenciement, subordination d'une offre d'emploi ou de stage à un critère prohibé, refus d'accepter une personne dans un stage."] },
              { niveau: "C", titre: "Élément moral", texte: "Infraction intentionnelle : conscience de traiter différemment une personne en raison d'un critère prohibé." },
            ]},
            { niveau: "II", titre: "La répression", texte: "**225-2 C.P. : 3 ans - 45 000 €**, aggravée à **5 ans - 75 000 €** si commise dans un lieu accueillant du public ou aux fins d'en interdire l'accès." },
            { titre: "Tentative, complicité", texte: "**Tentative : OUI. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Les violences volontaires",
          reference: "Art. 222-7 à 222-13, R.624-1, R.625-1 du Code pénal",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Les articles 222-7 à 222-13 du code pénal, ainsi que les art. R.624-1 et R.625-1, définissent et répriment les violences volontaires selon leur gravité." },
              { niveau: "B", titre: "Élément matériel", texte: "Un acte de violence physique (coups, voies de fait) exercé volontairement sur autrui, avec un résultat gradué selon l'ITT (incapacité totale de travail) constatée." },
              { niveau: "C", titre: "Élément moral", texte: "Intention de porter atteinte à l'intégrité physique ou psychique d'autrui (le résultat, lui, peut ne pas être recherché — c'est un délit « préterintentionnel » lorsqu'il dépasse l'intention initiale)." },
            ]},
            { niveau: "II", titre: "La répression graduée", points: ["**Sans ITT** : contravention de 4e classe (R.624-1) ou 5e classe si circonstance aggravante (R.625-1).", "**ITT ≤ 8 jours** aggravée (qualité de la victime/auteur) : délit, **3 ans - 45 000 €** (222-13).", "**ITT > 8 jours** : **3 ans - 45 000 €** (222-11), aggravée selon circonstances.", "**Mutilation/infirmité permanente** : **10 ans - 150 000 €** (222-9), 15 ans si aggravée.", "**Mort sans intention de la donner** : **15 ans de réclusion** (222-7), 20 ans si aggravée."] },
            { titre: "Circonstances aggravantes communes", texte: "Qualité de la victime (mineur, personne vulnérable, dépositaire de l'autorité publique, conjoint/concubin/ex) ou de l'auteur, préméditation, arme, réunion, guet-apens." },
          ],
        },
        {
          titre: "Les violences habituelles",
          reference: "Art. 222-14 du Code pénal",
          definition: "Violences habituelles commises sur un mineur de 15 ans, une personne vulnérable, ou au sein du couple (conjoint, concubin, partenaire PACS, y compris ex).",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-14 du code pénal définit et réprime les violences habituelles." },
              { niveau: "B", titre: "Élément matériel : l'habitude", texte: "Suppose la commission de **plusieurs actes** de violence, même sans ITT à chaque fois, sur une même victime — la répétition constitue en elle-même une circonstance aggravante autonome, indépendamment du résultat cumulé." },
              { niveau: "C", titre: "Élément moral", texte: "Intention de porter atteinte, de façon répétée, à l'intégrité physique ou psychique de la même victime." },
            ]},
            { niveau: "II", titre: "La répression graduée selon le résultat cumulé", points: ["Sans ITT ou ITT ≤8j sur mineur/personne vulnérable : **5 ans - 75 000 €**.", "ITT >8j : **10 ans - 150 000 €**.", "Mutilation/infirmité permanente : **20 ans de réclusion**.", "Mort sans intention de la donner : **30 ans de réclusion**."] },
          ],
        },
        {
          titre: "Les violences volontaires à l'encontre des forces de sécurité intérieure",
          reference: "Art. 222-14-5 du Code pénal",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-14-5 du code pénal définit et réprime les violences volontaires commises à l'encontre des forces de sécurité intérieure." },
              { niveau: "B", titre: "Élément matériel — les personnes visées", texte: "Un militaire de la gendarmerie, un fonctionnaire de la police nationale, un agent des douanes, de l'administration pénitentiaire, un sapeur/marin-pompier, un agent de police municipale ou un garde champêtre, ou leurs conjoints/ascendants/descendants directs — dans l'exercice ou du fait de leurs fonctions." },
              { niveau: "C", titre: "Élément moral", texte: "Intention de porter atteinte à l'intégrité physique de la victime, en raison de sa qualité." },
            ]},
            { niveau: "II", titre: "Répression aggravée par rapport au régime commun", points: ["Sans ITT ou ITT ≤8j : **5 ans - 75 000 €**.", "ITT >8j : **7 ans - 100 000 €**.", "Avec circonstance aggravante (préméditation, arme, réunion, visage dissimulé...) : jusqu'à **10 ans - 150 000 €**."] },
          ],
        },
        {
          titre: "Les atteintes volontaires à la vie",
          reference: "Art. 221-1 à 221-4 du Code pénal",
          definition: "Le fait de donner volontairement la mort à autrui constitue un meurtre. Il se différencie de l'empoisonnement (fait d'attenter à la vie d'autrui par l'emploi ou l'administration de substances de nature à entraîner la mort).",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 221-1 du code pénal prévoit et réprime le meurtre." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte ou un geste positif", texte: "L'action peut être unique ou résulter d'une série de gestes dans le temps. Le moyen utilisé est indifférent : arme, étranglement, coups, véhicule... L'emploi de substances de nature à entraîner la mort est en revanche qualifié d'**empoisonnement** (incrimination spécifique distincte)." },
                { niveau: "2", titre: "Sur la personne d'autrui", texte: "La victime doit être une **personne humaine et vivante**, autre que l'auteur de l'homicide." },
                { niveau: "3", titre: "Ayant entraîné la mort ou susceptible de l'entraîner", texte: "L'acte doit avoir provoqué la mort." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["**Une volonté de tuer.** L'intention de blesser ayant entraîné la mort constitue des violences volontaires ayant entraîné la mort (et non un meurtre) ; l'imprudence/négligence causant la mort est un homicide involontaire.", "**L'intention d'homicide doit être concomitante à l'action.**"] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**221-1 C.P. : 30 ans de réclusion criminelle.**" },
              { titre: "Meurtre en lien avec un autre crime ou délit", texte: "**221-2 C.P. : réclusion criminelle à perpétuité**, s'il précède/accompagne/suit un autre crime, ou s'il a pour objet de préparer/faciliter un délit, de favoriser la fuite ou d'assurer l'impunité de l'auteur/complice d'un délit." },
              { titre: "L'assassinat", texte: "**221-3 C.P. : réclusion criminelle à perpétuité**, lorsque le meurtre est commis avec **préméditation** ou **guet-apens** (l'intention homicide est antérieure à l'action)." },
              { titre: "Meurtres aggravés (art. 221-4)", texte: "**Réclusion criminelle à perpétuité** dans de nombreux cas, notamment : sur un mineur de 15 ans ; sur un ascendant légitime/naturel ou parent adoptif ; sur une personne vulnérable (âge, maladie, infirmité, grossesse) apparente/connue ; sur une personne en sujétion psychologique/physique connue ; sur un magistrat, juré, avocat, officier public/ministériel, militaire de la gendarmerie, policier, douanier, agent pénitentiaire ou autre dépositaire de l'autorité publique, pompier, gardien d'immeuble assermenté, dans l'exercice/du fait de ses fonctions apparentes/connues ; sur un enseignant, un agent de transport public ou une personne chargée d'une mission de service public, un professionnel de santé, dans les mêmes conditions ; sur le conjoint/ascendants/descendants des personnes précitées, en raison de leurs fonctions ; sur un témoin/victime/partie civile pour l'empêcher de dénoncer/déposer, ou en raison de sa déposition ; en bande organisée ; par le conjoint/concubin/partenaire PACS de la victime ; en raison d'un refus de mariage/union ; en état d'ivresse/emprise de stupéfiants manifeste." },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour un motif discriminatoire (racisme, xénophobie, religion, sexisme, orientation sexuelle, identité de genre), le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Conduite à tenir", texte: "Face à un homicide volontaire, le policier doit : aviser immédiatement sa hiérarchie et exécuter ses instructions, conserver les lieux en l'état en préservant traces et indices, interdire de toucher ou de bouger le cadavre, retenir suspects et témoins." },
            { titre: "Tentative, complicité", texte: "**Tentative : OUI. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Le viol",
          reference: "Art. 222-22, 222-23 à 222-26 du Code pénal",
          definition: "Tout acte de pénétration sexuelle, de quelque nature qu'il soit, ou tout acte bucco-génital ou bucco-anal commis sur la personne d'autrui ou sur la personne de l'auteur, par violence, contrainte, menace ou surprise, est un viol. Le code pénal prévoit 2 incriminations spécifiques supplémentaires : le viol sur mineur de 15 ans par un majeur, sans violence/contrainte/menace/surprise, et le viol incestueux.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs (viol de droit commun)", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-22 du C.P. inscrit l'absence de consentement dans la définition du viol. L'article 222-23 du C.P. définit et réprime le viol." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte de pénétration sexuelle ou un acte bucco-génital ou bucco-anal", points: ["Tout acte de **pénétration**, de quelque nature qu'il soit, dans le sexe ou par le sexe.", "Tout **acte bucco-génital** : n'exige pas que la bouche soit pénétrée par le sexe, ni que le sexe soit pénétré — un contact suffit (ex : fellation, cunnilingus).", "Tout **acte bucco-anal** : tout contact impliquant la zone anale et la bouche (ex : anulingus)."] },
                { niveau: "2", titre: "Commis sur la personne de la victime ou sur la personne de l'auteur", points: ["L'acte peut indifféremment être commis ou subi par un homme ou une femme.", "**Une victime vivante** : il ne peut y avoir viol sur un cadavre (infraction autonome d'atteinte à l'intégrité du cadavre, art. 225-17 C.P.).", "La condition de la victime importe peu, quelle que soit la nature des relations avec l'agresseur, y compris s'ils sont mariés."] },
                { niveau: "3", titre: "Une absence de consentement de la victime", texte: "Le consentement, prévu à l'art. 222-22 C.P., doit être :", points: ["**Libre** : sans contrainte, menace, violence ou surprise.", "**Éclairé** : capacité à comprendre la nature, les conséquences et les limites de l'acte.", "**Révocable** : peut être retiré à tout moment, même pendant l'acte.", "**Spécifique** : propre à une personne, à un acte défini, à des circonstances de temps et de lieu.", "**Préalable** : donné avant que l'acte ne commence.", "Il ne peut être déduit du seul silence ou de la seule absence de réaction de la victime.", "**Violence** (physique ou morale) : pressions exercées directement sur la victime.", "**Contrainte** (physique ou morale) ou **menace** : inspirant une crainte sérieuse et immédiate.", "**Surprise** : « surprendre le consentement de la victime »."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "L'auteur doit avoir **connaissance de l'absence de consentement** et avoir la **volonté d'imposer** à la victime un acte de nature sexuelle." },
            ]},
            { niveau: "II", titre: "Le viol sur mineur de 15 ans par un majeur, sans violence, contrainte, menace ou surprise", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Prévue par l'article 222-23-1 du code pénal, réprimée par l'article 222-23-3 du même code." },
              { niveau: "B", titre: "Élément matériel", points: ["Un acte de pénétration sexuelle ou un acte bucco-génital/bucco-anal (mêmes actes que le viol de droit commun).", "Commis sur la personne de la victime ou de l'auteur.", "**Un auteur majeur.**", "**Une victime mineure de 15 ans** (vivante, âgée de moins de 15 ans).", "**La différence d'âge** entre le majeur et le mineur est d'**au moins 5 ans**, sauf si les faits sont commis en échange d'une rémunération/promesse de rémunération/avantage en nature (peu importe alors le consentement)."] },
              { niveau: "C", titre: "Élément moral", texte: "Résulte de la **volonté d'imposer** à la victime un acte de nature sexuelle et de la **connaissance de l'âge** inférieur à 15 ans de la victime." },
            ]},
            { niveau: "III", titre: "Le viol incestueux, commis avec ou sans violence, contrainte, menace ou surprise", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Prévue par l'article 222-23-2 du code pénal, réprimée par l'article 222-23-3 du même code." },
              { niveau: "B", titre: "Élément matériel", points: ["Un acte de pénétration sexuelle ou un acte bucco-génital/bucco-anal, commis par l'auteur ou réalisé sur lui.", "**L'auteur majeur** est un ascendant, un frère, une sœur, un oncle, une tante, un grand-oncle, une grand-tante, un neveu, une nièce, ou le conjoint/concubin/partenaire PACS de l'une de ces personnes, **et** a une autorité de droit ou de fait sur la victime.", "**Une victime mineure** (vivante, âgée de moins de 18 ans)."] },
              { niveau: "C", titre: "Élément moral", texte: "Résulte de la volonté d'imposer à la victime un acte de nature sexuelle et de la connaissance de la minorité de la victime dont l'auteur sait le lien de parenté. Peu importe qu'il y ait ou non consentement." },
            ]},
            { niveau: "IV", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**222-23 C.P. : 15 ans de réclusion criminelle.**" },
              { titre: "Infraction aggravée", texte: "**222-24 C.P. : 20 ans de réclusion**, notamment si : mutilation/infirmité permanente ; sur mineur de 15 ans ; sur personne vulnérable (âge, maladie, infirmité, grossesse, précarité) apparente/connue ; par un ascendant ou une personne ayant autorité ; par abus d'autorité de fonction ; en réunion (auteur/complice) ; avec usage/menace d'arme ; mise en contact via un réseau de communication électronique ; en concours avec d'autres viols ; par conjoint/concubin/partenaire PACS ; en état d'ivresse/emprise de stupéfiants manifeste ; sur une personne se prostituant ; en présence d'un mineur témoin ; après administration d'une substance à l'insu de la victime." },
              { titre: "Circonstances les plus graves", points: ["A entraîné la mort de la victime → **222-25 C.P. : 30 ans de réclusion.**", "Précédé/accompagné/suivi de tortures ou d'actes de barbarie → **222-26 C.P. : réclusion criminelle à perpétuité.**", "Viol sur mineur de 15 ans sans violence/contrainte/menace/surprise, ou viol incestueux → **222-23-3 C.P. : 20 ans de réclusion.**"] },
              { titre: "Circonstance discriminatoire", texte: "Si le crime est commis pour des raisons liées au racisme, à la xénophobie, à la religion, au sexisme, à l'orientation sexuelle ou à l'identité de genre, le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : OUI. Complicité : OUI.** Est également constitutif d'un acte de complicité le fait d'enregistrer, par quelque moyen que ce soit, des images relatives à la commission de l'infraction (222-33-3 al.1 C.P.). Diffuser ces images est une infraction distincte (222-33-3 al.2 C.P. : 5 ans - 75 000 €)." },
          ],
        },
        {
          titre: "Les agressions sexuelles",
          reference: "Art. 222-22, 222-27 à 222-30 du Code pénal",
          definition: "Les agressions sexuelles autres que le viol consistent dans la commission de tout acte sexuel non consenti commis sur une personne d'autrui ou sur la personne de l'auteur, ou, dans les cas prévus par la loi, commis sur un mineur par un majeur.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs (agression sexuelle de droit commun)", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-22 du code pénal définit les agressions sexuelles. L'article 222-27 du même code prévoit et réprime les agressions sexuelles autres que le viol." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte de nature sexuelle autre qu'une pénétration, un acte bucco-génital, ou bucco-anal", texte: "Suppose un **contact physique** entre l'agresseur et sa victime (attouchements ou caresses du sexe, des fesses, des cuisses, de la poitrine, baisers sur le corps ou la bouche)." },
                { niveau: "2", titre: "Commis sur la personne de la victime ou sur la personne de l'auteur", points: ["Peut indifféremment être commis ou subi par un homme ou une femme.", "**Une victime vivante** : pas d'agression sexuelle sur un cadavre (infraction autonome, art. 225-17 C.P.).", "La condition de la victime importe peu, quelle que soit la nature des relations avec l'agresseur, y compris s'ils sont mariés."] },
                { niveau: "3", titre: "En l'absence de consentement de la victime", texte: "Le consentement (art. 222-22 C.P.) doit être libre, éclairé, révocable, spécifique et préalable — ne peut être déduit du seul silence de la victime.", points: ["**Violence** (physique ou morale) : pressions directes sur la victime.", "**Contrainte** (physique ou morale) ou **menace** : crainte sérieuse et immédiate.", "**Surprise** : « surprendre le consentement de la victime »."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "L'auteur doit avoir **connaissance de l'absence de consentement** et avoir la **volonté d'imposer** à la victime un acte immoral ou obscène." },
            ]},
            { titre: "Nota — l'assimilation à l'agression sexuelle", texte: "Est assimilé à une agression sexuelle le fait de contraindre une personne, par la violence, la menace ou la surprise, à subir une atteinte sexuelle de la part d'un tiers (art. 222-22-2 C.P.)." },
            { niveau: "II", titre: "L'agression sexuelle sur mineur de 15 ans par un majeur, sans violence, contrainte, menace ou surprise", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Prévue et réprimée par l'article 222-29-2 du code pénal." },
              { niveau: "B", titre: "Élément matériel", points: ["Un acte de nature sexuelle autre qu'une pénétration/acte bucco-génital/bucco-anal (contact physique).", "**Un auteur majeur.**", "**Une victime mineure de 15 ans** (vivante, âgée de moins de 15 ans).", "**La différence d'âge** entre le majeur et le mineur est d'**au moins 5 ans**, sauf si les faits sont commis en échange d'une rémunération/promesse/avantage en nature (peu importe alors le consentement)."] },
              { niveau: "C", titre: "Élément moral", texte: "Résulte de la volonté de commettre un acte immoral ou obscène et de la connaissance de l'âge inférieur à 15 ans de la victime." },
            ]},
            { niveau: "III", titre: "L'agression sexuelle incestueuse, commise avec ou sans violence, contrainte, menace ou surprise", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Prévue et réprimée par l'article 222-29-3 du code pénal." },
              { niveau: "B", titre: "Élément matériel", points: ["Un acte de nature sexuelle autre qu'une pénétration/acte bucco-génital/bucco-anal.", "**L'auteur majeur** est un ascendant, un frère, une sœur, un oncle, une tante, un grand-oncle, une grand-tante, un neveu, une nièce, ou le conjoint/concubin/partenaire PACS de l'une de ces personnes, **et** a une autorité de droit ou de fait sur la victime.", "**Une victime mineure** (vivante, âgée de moins de 18 ans)."] },
              { niveau: "C", titre: "Élément moral", texte: "Résulte de la volonté de commettre un acte immoral ou obscène et de la connaissance de la minorité de la victime dont l'auteur sait le lien de parenté. Peu importe qu'il y ait ou non consentement." },
            ]},
            { niveau: "IV", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**222-27 C.P. : 5 ans - 75 000 €.**" },
              { titre: "Infraction aggravée", texte: "**222-28 C.P. : 7 ans - 100 000 €**, notamment si : ITT >8 jours ; par un ascendant/personne ayant autorité ; abus d'autorité de fonction ; sur un professionnel de santé en activité ; en réunion ; avec arme ; mise en contact via un réseau électronique ; par conjoint/concubin/PACS ; état d'ivresse/stupéfiants manifeste ; sur personne se prostituant ; mineur témoin ; substance administrée à l'insu." },
              { titre: "Circonstances les plus graves", points: ["Imposée à une personne vulnérable (âge, maladie, infirmité, grossesse, précarité) apparente/connue → **222-29 C.P.**", "Imposée à un mineur de 15 ans par violence/contrainte/menace/surprise → **222-29-1 C.P.**", "Cumul d'une aggravation de l'art. 222-29 avec ITT, autorité, réunion, arme, ivresse/stupéfiants, ou substance à l'insu → **222-30 C.P. : 10 ans - 150 000 €.**"] },
              { titre: "Circonstance discriminatoire", texte: "Si le délit est commis pour des raisons liées au racisme, à la xénophobie, à la religion, au sexisme, à l'orientation sexuelle ou à l'identité de genre, le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : OUI. Complicité : OUI.**" },
          ],
        },
        {
          titre: "Le harcèlement sexuel",
          reference: "Art. 222-33 du Code pénal",
          definition: "Le fait d'imposer à une personne, de façon répétée, des propos ou comportements à connotation sexuelle ou sexiste qui, soit portent atteinte à sa dignité en raison de leur caractère dégradant ou humiliant, soit créent à son encontre une situation intimidante, hostile ou offensante, constitue une infraction. Est assimilé au harcèlement sexuel le fait, même non répété, d'user de toute forme de pression grave dans le but réel ou apparent d'obtenir un acte de nature sexuelle, au profit de l'auteur ou d'un tiers.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-33 du code pénal définit et réprime le harcèlement sexuel, en donnant une double définition : des faits répétés, ou un acte unique assimilé au harcèlement." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Le harcèlement sexuel reposant sur des actes répétés", points: ["Des propos ou comportements **portant atteinte à la dignité** de la victime en raison de leur caractère dégradant/humiliant (propos, gestes, envois de courriers/objets, attitudes), **ou créant une situation intimidante, hostile ou offensante**.", "Une **connotation sexuelle ou sexiste** : exprimée de vive voix, par écrit ou tout autre acte — un caractère explicitement sexuel n'est pas exigé.", "Une **absence de consentement** de la victime : résulte d'un faisceau d'indices, sans besoin d'expression explicite.", "Des **actes répétés**, par un seul auteur, ou par plusieurs (de manière concertée ou à l'instigation de l'un d'eux, même sans concertation s'ils savent caractériser une répétition — ex : « raids numériques »)."] },
                { niveau: "2", titre: "Le harcèlement sexuel reposant sur un acte d'une particulière gravité, pouvant être unique", points: ["Une **pression grave** commise contre la victime : tout acte de chantage sexuel (embauche, stage, logement, licenciement, mutation) — aucune répétition exigée.", "Une **finalité de nature sexuelle** : obtenir un acte de nature sexuelle au profit de l'auteur ou d'un tiers."] },
                { titre: "Précision commune aux 2 cas", texte: "Il n'est pas nécessaire qu'il y ait une relation hiérarchique entre l'auteur et la victime." },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["**Conscience** de se livrer à un acte de harcèlement.", "**La volonté d'obtenir un acte de nature sexuelle** : dans le cadre du harcèlement résultant d'un acte unique (chantage sexuel)."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**222-33 C.P. : 2 ans - 30 000 €.**" },
              { titre: "Infraction aggravée", texte: "**222-33 C.P. : 3 ans - 45 000 €**, notamment si : abus d'autorité de fonction ; sur un mineur de 15 ans ; sur personne vulnérable (âge, maladie, infirmité, grossesse, précarité) apparente/connue ; en réunion (auteur/complice) ; via un service de communication en ligne ou support numérique ; en présence d'un mineur témoin ; par un ascendant ou une personne ayant autorité." },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour des raisons liées au racisme, à la xénophobie ou à la religion, le maximum de la peine est relevé (art. 132-76 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "L'exhibition sexuelle",
          reference: "Art. 222-32 du Code pénal",
          definition: "L'exhibition sexuelle peut être caractérisée par une attitude ou un comportement imposé à la vue du public et qui choque le sens moral et la pudeur de ce dernier.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 222-32 du code pénal prévoit et réprime l'exhibition sexuelle." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte matériel impudique", texte: "Gestes/attitudes manifestement impudiques et comportements exhibitionnistes (caresses, baisers, masturbation, gestes obscènes), relations sexuelles de toute nature. Le délit suppose que le corps ou la partie du corps exposé soit ou paraisse dénudé. Même sans partie dénudée, l'infraction est constituée en cas de commission explicite d'un acte sexuel réel ou simulé (ex : se frotter le sexe par-dessus les vêtements). **Aucun contact physique** avec la victime." },
                { niveau: "2", titre: "La publicité de l'acte", texte: "La nudité doit être imposée au public : ce n'est pas l'acte impudique qui est punissable, mais le fait qu'il soit imposé à la vue du public ou dans un lieu accessible à ses regards. L'infraction n'est **pas constituée** si le témoin a recherché ce type d'exhibition (voyeurisme, spectacles érotiques, plages/camps naturistes)." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "L'auteur doit avoir **conscience de commettre un acte impudique** dans un lieu accessible aux regards du public." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**222-32 C.P. : 1 an - 15 000 €.**" },
              { titre: "Infraction aggravée", texte: "Exhibition commise au préjudice d'un mineur de 15 ans → **222-32 al.3 : 2 ans - 30 000 €.**" },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour des raisons liées au racisme, à la xénophobie, à la religion, au sexisme, à l'orientation sexuelle ou à l'identité de genre, le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "La mise en péril des mineurs",
          reference: "Art. 225-12-1, 225-12-2, 227-22 à 227-27, 434-3 du Code pénal",
          definition: "Lorsque certaines infractions sont commises à l'encontre d'un mineur, le code pénal prévoit des dispositions spécifiques.",
          plan: [
            { niveau: "I", titre: "Les atteintes sexuelles par un majeur sur un mineur", texte: "L'art. 227-27-2-1 C.P. définit les atteintes sexuelles incestueuses lorsqu'elles sont commises par un ascendant, un frère, une sœur, un oncle, une tante, un grand-oncle, une grand-tante, un neveu, une nièce, ou le conjoint/concubin/partenaire PACS de l'une de ces personnes, ayant sur la victime une autorité de droit ou de fait.", enfants: [
              { niveau: "A", titre: "Sur mineur de 15 ans", reference: "Art. 227-25 C.P.", texte: "Le fait, pour un majeur, d'exercer une atteinte sexuelle sur un mineur de 15 ans (hors viol/agression sexuelle) est puni de **7 ans et 100 000 €**. Aggravée (art. 227-26) si commise par une personne ayant autorité, abusant de ses fonctions, en état d'ivresse/stupéfiants, en réunion, ou via un réseau de télécommunications." },
              { niveau: "B", titre: "Sur mineur de plus de 15 ans", reference: "Art. 227-27 C.P.", texte: "Les atteintes sexuelles sur un mineur de plus de 15 ans, commises par une personne majeure ayant sur la victime une autorité de droit ou de fait, ou abusant de l'autorité conférée par ses fonctions, constituent une infraction." },
            ]},
            { niveau: "II", titre: "La prostitution de mineur", reference: "Art. 225-12-1 al.2 C.P.", texte: "Le fait de solliciter, accepter ou obtenir, en échange d'une rémunération/promesse/avantage en nature, des relations sexuelles de la part d'une personne se livrant à la prostitution (même occasionnellement) lorsqu'elle est mineure. Aggravée si la victime est mineure de 15 ans ou dans certaines situations (art. 225-12-2)." },
            { niveau: "III", titre: "La non-dénonciation d'une agression sexuelle commise sur un mineur", reference: "Art. 434-3 C.P.", texte: "Vise la non-dénonciation de mauvais traitements, agressions ou atteintes sexuelles commis sur tout mineur, jusqu'à ses 18 ans. Aggravée si la victime est mineure de 15 ans." },
            { niveau: "IV", titre: "La corruption de mineur", reference: "Art. 227-22 C.P.", texte: "Favoriser ou tenter de favoriser la corruption d'un mineur : tout acte visant à éveiller/exciter la dépravation sexuelle chez un mineur, ou à l'aider à se procurer les moyens de satisfaire ses pulsions (ex : location habituelle d'une chambre à des mineurs pour la débauche, envoi de correspondances pornographiques)." },
            { niveau: "V", titre: "L'incitation à la pratique sexuelle par voie électronique", reference: "Art. 227-22-2 C.P.", texte: "Hors viol/agression sexuelle, le fait pour un majeur d'inciter un mineur, par un moyen de communication électronique, à commettre un acte sexuel sur lui-même ou avec un tiers, même sans effet. Aggravée si mineur de 15 ans ou en bande organisée." },
            { niveau: "VI", titre: "L'exploitation de l'image ou de la représentation à caractère pornographique d'un mineur", reference: "Art. 227-23 C.P.", points: ["Fixer/enregistrer/transmettre, en vue de sa diffusion, l'image d'un mineur à caractère pornographique (si mineur de 15 ans, punissable même sans vue de diffusion).", "Offrir/rendre disponible/diffuser une telle image, l'importer ou l'exporter.", "Consulter habituellement ou en contrepartie d'un paiement un tel service, ou acquérir/détenir une telle image."] },
            { niveau: "VII", titre: "L'extorsion d'images pédopornographiques", reference: "Art. 227-23-1 C.P.", texte: "Le fait pour un majeur de solliciter auprès d'un mineur la diffusion/transmission d'images/vidéos à caractère pornographique de ce mineur. Aggravée si mineur de 15 ans ou en bande organisée." },
            { niveau: "VIII", titre: "La diffusion, la fabrication ou le transport d'un message à caractère pornographique (ou violent) susceptible d'être vu ou perçu par un mineur", reference: "Art. 227-24 C.P.", texte: "Fabriquer, transporter, diffuser (ou en faire commerce) un message violent, incitant au terrorisme, pornographique (y compris impliquant des animaux), ou portant gravement atteinte à la dignité humaine ou incitant des mineurs à des jeux dangereux, dès lors que ce message est susceptible d'être vu ou perçu par un mineur." },
          ],
        },
        {
          titre: "L'atteinte à l'intimité d'une personne",
          reference: "Art. 226-3-1 du Code pénal",
          definition: "Le fait d'user de tout moyen afin d'apercevoir les parties intimes d'une personne, que celle-ci a caché à la vue des tiers du fait de son habillement ou de sa présence dans un lieu clos, lorsqu'il est commis à l'insu ou sans le consentement de la personne, constitue une infraction (délit de « voyeurisme »).",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 226-3-1 du code pénal prévoit et réprime l'atteinte à l'intimité d'une personne." },
              { niveau: "B", titre: "Élément matériel", points: ["**Observation des parties intimes dissimulées d'une personne** : tout moyen peut être utilisé pour apercevoir les parties intimes cachées, soit par les habits, soit par la présence dans un lieu clos — ex : utilisation d'un miroir dans les transports en commun, regarder en cachette dans une cabine d'essayage ou des toilettes publiques.", "**À l'insu ou sans le consentement de la victime.**"] },
              { niveau: "C", titre: "Élément moral", points: ["Conscience de l'auteur de commettre un acte impudique.", "Volonté d'attenter à l'intimité de la personne."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**226-3-1 C.P. : 1 an - 15 000 €.**" },
              { titre: "Infraction aggravée", texte: "**226-3-1 C.P. : 2 ans - 30 000 €**, notamment si : abus d'autorité de fonction ; sur un mineur ; sur personne vulnérable (âge, maladie, infirmité, grossesse) apparente/connue ; en réunion ; dans un transport collectif ou lieu d'accès à celui-ci ; images fixées/enregistrées/transmises." },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour des raisons liées au racisme, à la xénophobie, à la religion, au sexisme, à l'orientation sexuelle ou à l'identité de genre, le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : OUI. Complicité : OUI.**" },
          ],
        },
        {
          titre: "L'outrage sexiste et sexuel",
          reference: "Art. R.625-8-3 et 222-33-1-1 du Code pénal",
          definition: "Le fait d'imposer à une personne tout propos ou comportement à connotation sexuelle ou sexiste qui soit porte atteinte à sa dignité en raison de son caractère dégradant ou humiliant, soit crée à son encontre une situation intimidante, hostile ou offensante, constitue une infraction (hors les cas prévus aux art. 222-13, 222-32, 222-33, 222-33-2-2 et 222-33-2-3 C.P.).",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "Les articles R.625-8-3 et 222-33-1-1 du code pénal prévoient et répriment l'outrage sexiste et sexuel." },
              { niveau: "B", titre: "Élément matériel", points: ["**Propos ou comportement à connotation sexuelle ou sexiste imposé à une personne** : attitudes non verbales (gestes imitant/suggérant un acte sexuel, sifflements/bruitages obscènes), propositions sexuelles, commentaires dégradants sur la tenue ou l'apparence physique.", "**Qui porte atteinte à sa dignité** en raison de son caractère dégradant ou humiliant.", "**Ou crée une situation intimidante, hostile ou offensante** (ex : poursuite insistante d'une victime dans la rue)."] },
              { niveau: "C", titre: "Élément moral", points: ["Conscience de l'auteur d'imposer des propos ou comportements à connotation sexuelle ou sexiste.", "Volonté de porter atteinte à sa dignité ou de créer une situation intimidante, hostile ou offensante."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple (contravention)", texte: "**R.625-8-3 C.P. : contravention de 5e classe**, constatable par amende forfaitaire (PVe)." },
              { titre: "Infraction aggravée (délit)", texte: "**222-33-1-1 C.P. : 3 750 € d'amende**, sans peine d'emprisonnement (pas de coercition), notamment si : abus d'autorité de fonction ; sur un mineur ; sur personne vulnérable (âge, maladie, infirmité, grossesse, précarité) apparente/connue ; en réunion ; dans un transport collectif ou lieu d'accès à celui-ci ; en raison de l'orientation sexuelle/identité de genre de la victime ; en récidive de la contravention." },
              { titre: "Procédure applicable", texte: "Dans tous les cas d'aggravation, l'amende forfaitaire est applicable (300 €, 250 € minorée, 600 € majorée), y compris en récidive. Le paiement éteint l'action publique." },
            ]},
            { titre: "Preuve et lieux concernés", texte: "La preuve peut être recueillie par témoignages ou vidéo-protection. Poursuites possibles dans l'espace public (« harcèlement de rue »), les transports en commun, les établissements scolaires, ou un lieu privé (espace de travail)." },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI** (en matière contraventionnelle, seule la complicité par provocation ou instructions est punissable, art. R.610-2 C.P.)." },
          ],
        },
      ],
    },
    {
      numero: 9,
      titre: "Les atteintes à l'autorité de l'État",
      fiches: [
        {
          titre: "Les violences volontaires à l'encontre des forces de sécurité intérieure — renvoi",
          plan: [
            { titre: "Note de renvoi (telle que dans le sommaire du document)", texte: "Cette infraction est détaillée dans la fiche « Les violences volontaires à l'encontre des forces de sécurité intérieure », classée à la rubrique 8 (Les atteintes aux personnes) de ce même document, comme l'indique le sommaire original." },
          ],
        },
        {
          titre: "Le refus d'obtempérer",
          reference: "Art. L.233-1 et L.233-1-1 du Code de la route",
          definition: "Le fait pour tout conducteur d'omettre d'obtempérer à une sommation de s'arrêter émanant d'un fonctionnaire ou agent chargé de constater les infractions et muni des insignes extérieurs et apparents de sa qualité constitue un délit.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article L.233-1/I du code de la route définit et réprime le refus d'obtempérer." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Le conducteur", texte: "« Tout conducteur », quel que soit le véhicule concerné : la personne physique qui assume la direction et la maîtrise d'un véhicule en mouvement." },
                { niveau: "2", titre: "Les agents habilités", texte: "Agents énumérés aux art. L.130-1 à L.130-4 et R.130-1 à R.130-10 C.R., chargés de constater les infractions routières. Doivent être clairement identifiables : uniforme avec ses insignes porté réglementairement, ou gyrophare/avertisseur spécial en action (Cass. crim. 23/02/87)." },
                { niveau: "3", titre: "La sommation de s'arrêter", texte: "Doit désigner clairement le conducteur (gestes réglementaires d'arrêt, coups de sifflet...). Le conducteur ne doit avoir aucun doute sur la nature de l'ordre. La forme de l'ordre importe peu." },
                { niveau: "4", titre: "Le refus d'obtempérer", texte: "Constitué par le refus intentionnel du conducteur d'obéir à la sommation : il continue sa route bien qu'ayant manifestement compris que l'ordre lui était destiné (il regarde l'agent, ralentit, quitte la file, change de direction...)." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Volonté de ne pas obéir à une sommation de s'arrêter — suppose que l'ordre émis ait été clairement perçu." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**L.233-1 C.R. : 2 ans - 15 000 €.**" },
              { titre: "Circonstance aggravante — exposer autrui", texte: "**L.233-1-1 al.1 C.R. : 5 ans - 75 000 €** si le fait expose directement autrui à un risque de mort ou de blessures de nature à entraîner une mutilation/infirmité permanente." },
              { titre: "Circonstance aggravante — exposer l'agent verbalisateur", texte: "**L.233-1-1 al.2 C.R. : 7 ans - 100 000 €** si le fait expose spécifiquement l'agent chargé de constater les infractions à ce même risque." },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour des raisons liées au racisme, à la xénophobie, à la religion, au sexisme, à l'orientation sexuelle ou à l'identité de genre, le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Mesures complémentaires", points: ["**Les A.P.J.A. ne sont pas habilités** à constater ce délit par procès-verbal.", "Les OPJ/APJ retiennent à titre conservatoire le permis de conduire (art. L.224-1 C.R.).", "Si aggravé : **confiscation obligatoire** du véhicule si l'auteur en est propriétaire ou en a la libre disposition (art. L.233-1-1 C.R.).", "**Immobilisation éventuelle** (art. L.325-1 à L.325-3 C.R.)."] },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "L'outrage",
          reference: "Art. 433-5 du Code pénal",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 433-5 du code pénal définit et réprime l'outrage." },
              { niveau: "B", titre: "Élément matériel", points: ["**Paroles, gestes, menaces**, écrits ou images de toute nature **non rendus publics**, ou envois d'objets quelconques.", "**De nature à porter atteinte à la dignité** ou au respect dû à la fonction de la personne visée.", "Adressés à une personne dépositaire de l'autorité publique/chargée d'une mission de service public, un professionnel de santé, un sapeur/marin-pompier — **dans l'exercice ou à l'occasion** de ses fonctions."] },
              { niveau: "C", titre: "Élément moral", texte: "Volonté de porter atteinte à la dignité de la personne en raison de sa qualité/fonction." },
            ]},
            { niveau: "II", titre: "La répression", points: ["Envers un professionnel de santé : **7 500 € d'amende**, délit non puni d'emprisonnement.", "Envers une personne dépositaire de l'autorité publique, un pompier ou marin-pompier : **1 an - 15 000 €**, porté à **2 ans - 30 000 €** en réunion."] },
          ],
        },
        {
          titre: "La rébellion",
          reference: "Art. 433-6 et 433-7 du Code pénal",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 433-6 du code pénal définit la rébellion, l'article 433-7 la réprime avec ses circonstances aggravantes." },
              { niveau: "B", titre: "Élément matériel", points: ["Une **résistance violente et active** (et non simplement passive) opposée à une personne dépositaire de l'autorité publique/chargée d'une mission de service public.", "Cette personne doit agir **dans l'exercice de ses fonctions**, pour l'exécution des lois, des ordres/décisions de l'autorité publique, ou des mandats de justice."] },
              { niveau: "C", titre: "Élément moral", texte: "Volonté de s'opposer par la force à l'action légitime de l'agent." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**433-6 C.P. : 2 ans - 30 000 €.**" },
              { titre: "Aggravations", texte: "**433-7 C.P.** : jusqu'à **10 ans - 150 000 €** si commise en réunion et avec usage/menace d'une arme." },
            ]},
          ],
        },
        {
          titre: "La provocation directe à la rébellion",
          reference: "Art. 433-10 du Code pénal",
          definition: "Le fait d'inciter quelqu'un à commettre le délit de rébellion en usant de cris, discours publics, écrits affichés ou distribués, ou par tout autre moyen de transmission de l'écrit, de la parole ou de l'image, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 433-10 du code pénal prévoit et réprime la provocation directe à la rébellion." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un acte de provocation directe", texte: "Les termes de la provocation doivent provoquer, sans ambiguïté, une opposition violente à l'action d'un dépositaire de l'autorité publique. Il n'est pas nécessaire que la provocation ait été suivie d'effet, ni qu'elle s'adresse à une personne déterminée." },
                { niveau: "2", titre: "Manifesté par divers moyens", points: ["**Des cris ou discours** tenus sur la voie publique ou dans les lieux publics.", "**Des écrits ou imprimés** affichés ou exposés sur la voie publique ou dans un lieu public.", "**Des tracts** remis de la main à la main ou distribués dans les boîtes aux lettres.", "**Tout autre moyen de transmission** de l'écrit, de la parole ou de l'image (messages radiodiffusés)."], texte: "**Nota** : si la provocation a été commise par voie de presse écrite ou audiovisuelle, les responsables sont recherchés conformément à la loi du 29/07/1881 sur la presse." },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Volonté d'inciter un tiers à commettre un acte de rébellion. C'est un **délit formel** qui se réalise par le simple accomplissement des actes, peu importe qu'ils soient suivis d'effets." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", texte: "**433-10 C.P. : 2 mois - 7 500 €.** Pas de circonstance aggravante. Si commis pour un motif discriminatoire (racisme, xénophobie, religion, sexisme, orientation sexuelle, identité de genre), le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.** Si la provocation a été suivie d'effet, son auteur peut être poursuivi comme complice du délit de rébellion par instruction (peines des art. 433-7 ou 433-8 C.P.)." },
          ],
        },
        {
          titre: "La corruption passive",
          reference: "Art. 432-11 du Code pénal",
          definition: "Le fait, par une personne dépositaire de l'autorité publique, chargée d'une mission de service public, ou investie d'un mandat électif public, de solliciter ou d'agréer, sans droit, à tout moment, directement ou indirectement, des offres, promesses, dons, présents ou avantages quelconques pour elle-même ou pour autrui, soit pour accomplir ou s'abstenir d'accomplir un acte de sa fonction, soit pour abuser de son influence en vue d'obtenir d'une autorité publique une décision favorable, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 432-11 du code pénal définit et réprime la corruption passive : corruption commise par un agent public qui sollicite ou reçoit un avantage illicite." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un auteur : le corrompu", points: ["**Une personne dépositaire de l'autorité publique** : investie par délégation de la puissance publique d'un pouvoir de décision ou de contrainte (ex : policiers, gendarmes) — le personnel judiciaire fait l'objet d'une incrimination spécifique.", "**Une personne chargée d'une mission de service public** : accomplit des actes visant à satisfaire un intérêt général (ex : agent d'EDF-GDF).", "**Une personne investie d'un mandat électif public** : élus (sénateurs, députés, conseillers municipaux) et membres élus de certains établissements publics administratifs."] },
                { niveau: "2", titre: "Accomplissement d'un acte par l'auteur", points: ["**Une sollicitation** : démarche/initiative de la personne corrompue (ex : faire comprendre qu'il faut payer pour obtenir l'accomplissement/non-accomplissement d'un acte).", "**Un agrément** : le corrompu donne son accord suite à une proposition du corrupteur.", "**Directement ou indirectement** (par personne interposée).", "**À tout moment** : peu importe que l'avantage soit une récompense anticipée ou obtenue a posteriori."] },
                { niveau: "3", titre: "Un bénéfice attendu", points: ["**Obtention d'offres, promesses, dons, présents ou avantages quelconques** : somme d'argent, objets de valeur, immeubles, voyages, extinction d'une dette...", "**Accomplissement ou non d'un acte** de sa fonction, mission ou mandat (ex : un policier reçoit de l'argent pour ne pas verbaliser).", "**Avantage perçu par l'agent public ou par un tiers.**"] },
              ]},
              { niveau: "C", titre: "Élément moral", points: ["Conscience d'agir en violation de son devoir de probité.", "Volonté d'obtenir un avantage en contrepartie de l'accomplissement ou du non-accomplissement d'un acte de sa fonction."] },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**432-11 C.P. : 10 ans - 1 000 000 €.**" },
              { titre: "Infraction aggravée", texte: "En bande organisée → **10 ans - 2 000 000 €** (le montant de l'amende peut être porté au double du produit tiré de l'infraction)." },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour un motif discriminatoire (racisme, xénophobie, religion, sexisme, orientation sexuelle, identité de genre), le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
          ],
        },
        {
          titre: "La corruption active",
          reference: "Art. 433-1 du Code pénal",
          definition: "Le fait, par quiconque, de proposer sans droit, à tout moment, directement ou indirectement, des offres, promesses, dons, présents ou avantages quelconques à une personne dépositaire de l'autorité publique, chargée d'une mission de service public ou investie d'un mandat électif public, pour elle-même ou pour autrui, pour qu'elle accomplisse ou s'abstienne d'accomplir un acte de sa fonction, de sa mission ou de son mandat, constitue une infraction.",
          plan: [
            { niveau: "I", titre: "Les éléments constitutifs", enfants: [
              { niveau: "A", titre: "Élément légal", texte: "L'article 433-1 du code pénal définit et réprime la corruption active : corruption commise par le particulier qui accepte ou entreprend de rémunérer le fonctionnaire." },
              { niveau: "B", titre: "Élément matériel", enfants: [
                { niveau: "1", titre: "Un auteur : le corrupteur", texte: "Toujours un **particulier**, qui doit avoir été en relation avec le corrompu : personne dépositaire de l'autorité publique (sauf personnel judiciaire), personne chargée d'une mission de service public, ou investie d'un mandat électif public." },
                { niveau: "2", titre: "Accomplissement d'un acte par l'auteur", points: ["**Une sollicitation** : l'auteur propose un avantage à l'agent public — la simple proposition suffit à constituer le délit, peu importe qu'elle soit acceptée ou non.", "**Un agrément** : le corrupteur accepte la demande faite par l'agent public.", "**Directement ou indirectement** (par personne interposée).", "**À tout moment** : peu importe que l'acte attendu soit une récompense anticipée ou obtenue a posteriori."] },
                { niveau: "3", titre: "Un bénéfice attendu", points: ["**Accomplissement ou non d'un acte** de la fonction, mission ou mandat de l'agent public.", "**Dont profite le corrupteur lui-même ou un tiers.**", "**En contrepartie d'un avantage** : somme d'argent, objets de valeur, immeubles, voyages, extinction d'une dette..."] },
              ]},
              { niveau: "C", titre: "Élément moral", texte: "Conscience de corrompre une personne exerçant une fonction publique." },
            ]},
            { niveau: "II", titre: "La répression et les aggravations", enfants: [
              { titre: "Infraction simple", texte: "**433-1 C.P. : 10 ans - 1 000 000 €.**" },
              { titre: "Infraction aggravée", texte: "En bande organisée → **10 ans - 2 000 000 €** (le montant de l'amende peut être porté au double du produit tiré de l'infraction)." },
              { titre: "Circonstance discriminatoire", texte: "Si commis pour un motif discriminatoire (racisme, xénophobie, religion, sexisme, orientation sexuelle, identité de genre), le maximum de la peine est relevé (art. 132-76/132-77 C.P.)." },
            ]},
            { titre: "Tentative, complicité", texte: "**Tentative : NON. Complicité : OUI.**" },
            { titre: "Tableau des 4 situations et personnes punissables", points: ["**1° Le fonctionnaire sollicite, le particulier refuse** → fonctionnaire uniquement : corruption passive.", "**2° Le fonctionnaire sollicite, le particulier accepte** → fonctionnaire : corruption passive ; particulier : corruption active.", "**3° Le particulier propose, le fonctionnaire refuse** → particulier uniquement : corruption active.", "**4° Le particulier propose, le fonctionnaire accepte** → fonctionnaire : corruption passive ; particulier : corruption active."] },
          ],
        },
      ],
    },
  ],
};

const DOC_MEMENTO_CR = {
  titre: "Mémento de circulation routière",
  sections: [
    {
      numero: 1,
      titre: "Procédures en matière de circulation routière",
      fiches: [
        {
          titre: "L'amende forfaitaire",
          reference: "Art. 529 et suivants, R.48-1 et suivants du Code de procédure pénale",
          plan: [
            { titre: "Champ d'application", points: ["S'applique aux contraventions des 4 premières classes et certaines contraventions de 5e classe listées à l'art. R.48-1 C.P.P.", "Constatées par **procès-verbal électronique (PVe)**.", "**Non applicable** en cas de constatation simultanée de plusieurs infractions dont l'une au moins ne peut donner lieu à amende forfaitaire.", "Donne lieu à un avis de contravention et une carte de paiement, adressés par voie postale ou messagerie (sauf paiement immédiat).", "**Applicable aux mineurs de plus de 13 ans.**"] },
            { niveau: "I", titre: "L'amende forfaitaire « ordinaire »", texte: "Concerne les contraventions au code de la route non minorées, ainsi que celles en matière d'arrêt/stationnement, d'assurance des véhicules, ou de réglementation des transports routiers." },
            { niveau: "II", titre: "L'amende forfaitaire minorée", texte: "Montant minoré pour les contraventions des 2e, 3e, 4e et 5e classes (art. R.48-1 I,1° et II,6°), sauf stationnement (art. R.417-1 à R.417-13 et R.421-7 C.R.). Conditionnée au paiement dans les délais (art. 529-8 C.P.P.) ; à défaut, le montant « ordinaire » est dû." },
            { niveau: "III", titre: "L'amende forfaitaire majorée", texte: "Appliquée de plein droit si le contrevenant ne règle pas l'amende initiale ou ne conteste pas dans les délais. Un titre exécutoire du ministère public permet au Trésor public de la recouvrer." },
            { titre: "Montant selon la classe", points: ["1re classe (piéton) : 4 € ordinaire, 7 € majorée. 1re classe (autre) : 11 € ordinaire, 33 € majorée.", "2e classe : 35 € ordinaire, 22 € minorée, 75 € majorée.", "3e classe : 68 € ordinaire, 45 € minorée, 180 € majorée.", "4e classe : 135 € ordinaire, 90 € minorée, 375 € majorée.", "5e classe : 200 € ordinaire, 150 € minorée, 450 € majorée."] },
            { titre: "Le paiement", texte: "Entraîne la reconnaissance de l'infraction et l'extinction de l'action publique.", points: ["**Paiement immédiat** à l'agent verbalisateur : quittance délivrée, pas de PV rédigé.", "**Paiement différé** : ordinaire 45 jours (60 si télépaiement/timbre dématérialisé) ; minorée 15 jours (30 si télépaiement/timbre dématérialisé). Modes : chèque, télépaiement (Internet, serveur vocal, appli), débitants de tabac agréés, virement international."] },
            { titre: "La contestation", points: ["**Requête en exonération avec consignation** (art. 529-10 C.P.P.) : si responsabilité pécuniaire du titulaire du certificat d'immatriculation (contrôle automatisé) — courrier au CNT de Rennes ou via antai.fr, avec justificatif d'exonération ou consignation égale au montant, sous 45 jours.", "**Requête en exonération simple** (art. 529-2 C.P.P.) : pour les autres contraventions, formulaire + avis de contravention au CNT de Rennes.", "**Réclamation** (art. 530 C.P.P.) : contre l'amende majorée, sous 30 jours, annule le titre exécutoire."] },
            { titre: "Suites possibles", points: ["**Classement sans suite** par le ministère public.", "**Ordonnance pénale** (art. 524 et s. C.P.P.) : procédure simplifiée sans comparution ; 30 jours pour former opposition ou payer.", "**Citation directe devant le tribunal de police** (art. 531 et s. C.P.P.) : pour les contraventions hors amende forfaitaire ou si l'ordonnance pénale est écartée, par exploit d'huissier."] },
          ],
        },
        {
          titre: "L'amende forfaitaire délictuelle (A.F.D.)",
          reference: "Art. L.221-2, L.324-2 du Code de la route — Art. 495-17 à 495-25, D.45-3 à D.45-21 du Code de procédure pénale",
          plan: [
            { titre: "Champ d'application", texte: "Les **A.P.J.A. ne sont pas habilités** à constater les délits par PV.", points: ["Conduite d'un véhicule sans permis (natinf 7536).", "Conduite avec un permis d'une catégorie n'autorisant pas la conduite (natinf 22872).", "Conduite d'un véhicule sans assurance (natinf 6163).", "Entrave à la circulation des véhicules sur une voie publique (natinf 2271)."] },
            { titre: "Modalités", texte: "Constatés par PVe. L'intéressé est avisé qu'il recevra par courrier un avis d'amende forfaitaire, une notice de paiement et un formulaire de requête en exonération, et qu'il peut payer immédiatement l'A.F.D. minorée à l'agent verbalisateur (art. A37-27-6 C.P.P.)." },
            { titre: "L'A.F.D. ne peut PAS être mise en œuvre si l'auteur", points: ["**N'est pas formellement identifié.**", "**Est mineur.**", "Présente une difficulté de compréhension (état anormal, langue française non maîtrisée, discernement altéré, majeur protégé).", "**Est en état de récidive légale** pour le même délit ou un délit assimilé (défaut de permis, CEEA/CEI/refus vérifications, conduite après stupéfiants/refus, grande vitesse, refus d'obtempérer) — consultation du TAJ impérative.", "Le délit n'est pas constaté sur les lieux, en présence du conducteur.", "Plusieurs infractions sont constatées simultanément, dont l'une ne peut donner lieu à AFD.", "Commission simultanée du défaut d'assurance et du défaut de permis."] },
            { titre: "Montant de l'amende", points: ["Conduite sans permis / catégorie non autorisée : 640 € (minorée), 800 € (ordinaire), 1 600 € (majorée).", "Circulation sans assurance : 400 €/500 €/1 000 € — majorés de 50% au profit du fonds de garantie, soit 600 €/750 €/1 500 €."] },
            { titre: "Paiement, contestation, dispense de consignation", texte: "Délais et modalités identiques à l'amende forfaitaire contraventionnelle. L'auteur d'une requête en exonération est dispensé de consignation s'il produit : photocopie de son permis valide, ou de son attestation d'assurance valide, ou récépissé de dépôt de plainte pour usurpation d'identité (art. 434-23 C.P.)." },
          ],
        },
        {
          titre: "La consignation",
          reference: "Art. L.121-4 du Code de la route — Art. A.37-27-1 du Code de procédure pénale",
          plan: [
            { titre: "Personnes concernées", texte: "Auteurs (français ou étrangers) d'une infraction routière qui ne peuvent ni justifier d'un domicile/emploi en France, ni justifier d'une caution agréée (ex : Automobile-Club de France)." },
            { titre: "Infractions visées", texte: "Sauf paiement immédiat de l'amende forfaitaire, s'applique aux infractions au code de la route (délits et contraventions) et à la réglementation des transports routiers. En pratique, imposée seulement pour les infractions mettant en danger la sécurité des personnes. Décision prise par le **procureur de la République**, qui doit statuer dans les **24 heures**." },
            { titre: "Montant de la consignation", points: ["Délits punis d'une amende ≤15 000 € : 1 125 € à 2 250 €.", "Délits punis d'une amende >15 000 € : 2 250 € à 4 500 €.", "Contraventions : 11 € (1re classe), 35 € (2e), 68 € (3e), 135 € (4e), 750 € (5e)."] },
            { titre: "Mise en œuvre", points: ["Perception immédiate via un carnet de quittances à souches (ou quittance dématérialisée).", "**Si refus de payer** : le véhicule est immobilisé, le procureur est immédiatement avisé, l'O.P.J. peut prescrire la mise en fourrière.", "**Si le conducteur exige de payer auprès d'un comptable du Trésor** : le véhicule est retenu jusqu'au versement.", "**Si présentation d'un titre de caution** : l'infraction est relevée par PV mentionnant l'organisme cautionnant et le numéro d'attestation."] },
          ],
        },
        {
          titre: "L'immobilisation",
          reference: "Art. L.325-1 à L.325-13, R.325-1 à R.325-11 du Code de la route",
          plan: [
            { titre: "Définition", texte: "Obligation faite par un OPJ, un APJ ou un APJA au conducteur/propriétaire d'un véhicule de le maintenir sur place ou à proximité du lieu de constatation, en se conformant aux règles de stationnement. Le véhicule reste sous la garde juridique de son propriétaire/conducteur." },
            { niveau: "I", titre: "La procédure courante", points: ["Si l'infraction **cesse en présence de l'agent** : pas de fiche d'immobilisation, le véhicule repart.", "Si l'infraction **n'a pas cessé** au départ de l'agent : saisine de l'O.P.J. territorialement compétent (fiche d'immobilisation + certificat d'immatriculation remis).", "La suspension est enregistrée dans le **S.I.V.** (rubrique « situation administrative »).", "Un double de la fiche est remis au contrevenant."] },
            { niveau: "II", titre: "Les procédures particulières", enfants: [
              { titre: "Remplacement du conducteur", texte: "Levée de l'immobilisation dès qu'un conducteur qualifié peut assurer la conduite (cas : ivresse, défaut de permis, infraction sociale transport, rétention du permis). À défaut, les policiers peuvent conduire eux-mêmes le véhicule ou faire appel à un conducteur qualifié." },
              { titre: "Fiche de circulation provisoire (7 jours)", texte: "Limitée aux infractions de contrôle technique, surteintage des vitres avant, ou défaut/modification du chronotachygraphe/limiteur de vitesse." },
              { titre: "Immobilisation sur le lieu de réparation", texte: "Si des réparations sont nécessaires, le conducteur peut déplacer le véhicule vers le garage le plus proche, ou faire appel à un professionnel pour le remorquage à ses frais." },
              { titre: "Véhicule en surcharge", texte: "L'agent peut prescrire la présentation à une bascule si le poids réel excède de 5% le PTAC indiqué." },
              { titre: "Véhicule polluant, bruyant ou cyclomoteur débridé", texte: "Présentation à un service de contrôle spécialisé, ou fiche de circulation provisoire pour réparation." },
              { titre: "Véhicule de transport de marchandises dangereuses", texte: "Immobilisation après avis des agents spécialisés (sécurité civile, DREAL)." },
            ]},
            { niveau: "III", titre: "La levée d'immobilisation", texte: "Ne peut être maintenue après cessation de la circonstance qui l'a motivée.", points: ["Levée par l'agent qui l'a prescrite, par l'O.P.J. (restitution du certificat d'immatriculation), ou par l'ingénieur/le maire (barrières de dégel).", "**Si le conducteur n'a pas justifié de la cessation dans un délai de 48h**, l'O.P.J. peut transformer l'immobilisation en **mise en fourrière**."] },
            { titre: "L'obstacle à une mesure d'immobilisation (DÉLIT)", reference: "Art. L.325-3-1 C.R.", texte: "Réprime l'obstacle à l'immobilisation administrative ainsi que la mise en circulation malgré l'immobilisation prescrite (natinf 6245, 697, 21925, 21926) — contrôle alcoolémie obligatoire, retrait de 6 points." },
          ],
        },
        {
          titre: "La mise en fourrière",
          reference: "Art. L.325-1 à L.325-3, L.325-7 à L.325-13, R.325-1 et suivants du Code de la route",
          plan: [
            { titre: "Définition", texte: "Transfert d'un véhicule en un lieu désigné par l'autorité administrative ou judiciaire, en vue d'y être retenu jusqu'à décision, aux frais du propriétaire." },
            { niveau: "I", titre: "Les cas de mise en œuvre", points: ["Suite à la constatation d'une infraction prescrivant cette mesure.", "Suite à une mesure d'immobilisation (non-régularisation sous 48h, ou non-présentation au contrôle technique sous 7 jours).", "Véhicule laissé sans droit dans un lieu où le code de la route ne s'applique pas (sur demande du maître des lieux, à l'OPJ territorialement compétent).", "Véhicule privé d'éléments indispensables à son utilisation normale (dégradations/vols), avant de devenir une épave.", "Dans le cadre d'une procédure de consignation ou de recouvrement de certaines amendes forfaitaires majorées."] },
            { titre: "Qui peut prescrire la mesure ?", texte: "Un O.P.J. (police/gendarmerie), un A.P.J.A. chef de la police municipale (ou occupant ces fonctions), et à Paris, les A.P.J.A. du corps des contrôleurs de la préfecture de police (spécialité voie publique)." },
            { niveau: "II", titre: "L'exécution de la mesure", points: ["Rédaction d'un PV (si infraction) ou d'un rapport.", "Vérification préalable qu'il ne s'agit pas d'un véhicule volé (interrogation FOVeS).", "Établissement d'une fiche descriptive de l'état sommaire du véhicule, sans l'ouvrir.", "Transfert par un professionnel agréé, par l'agent sur prescription de l'OPJ, par un tiers réquisitionné, ou par le conducteur/propriétaire (avec retrait du certificat d'immatriculation s'il garde le véhicule à domicile)."] },
            { niveau: "III", titre: "Si le contrevenant se présente sur les lieux", texte: "Peut être autorisé à reprendre son véhicule si : le PV de l'infraction est rédigé, l'infraction a cessé, et les frais (opérations préalables et/ou enlèvement) sont réglés ou l'engagement écrit de les régler est pris. **Commencement d'exécution** : dès que 2 roues au moins ont quitté le sol (véhicule d'enlèvement) ou dès le début du déplacement." },
            { titre: "L'obstacle à un ordre d'envoi en fourrière (DÉLIT)", reference: "Art. L.325-3-1 C.R.", texte: "Réprimé (natinf 25818) — contrôle alcoolémie obligatoire, dépistage stupéfiants facultatif, retrait de 6 points. Les A.P.J.A. ne sont pas habilités à le constater par PV. La non-restitution du certificat d'immatriculation dans les délais est également réprimée (natinf 21254)." },
          ],
        },
        {
          titre: "La conduite sous l'influence de l'alcool : les faits réprimés",
          reference: "Art. L.234-1, L.234-8, R.234-1 du Code de la route — Art. L.3354-2 du Code de la santé publique",
          plan: [
            { titre: "Les A.P.J.A. ne sont pas habilités à constater par PV les délits et contraventions en matière d'alcool.", texte: "" },
            { niveau: "I", titre: "La C.E.E.A. (conduite sous l'empire d'un état alcoolique)", texte: "Basée sur la constatation d'un taux d'alcool dans l'air expiré ou le sang, mesuré sauf impossibilité par éthylomètre (ou prélèvement sanguin).", enfants: [
              { titre: "Seuil délictuel — tout conducteur", texte: "**≥ 0,40 mg/l dans l'air expiré ou ≥ 0,80 g/l dans le sang** → délit (art. L.234-1/I et V C.R., natinf 1247, 8544 si récidive)." },
              { titre: "Seuil contraventionnel réduit — catégories spécifiques", texte: "**Entre 0,10 et <0,40 mg/l (ou 0,20 à <0,80 g/l)** pour : conducteur de transport en commun, conducteur dont le droit de conduire est limité à un véhicule équipé d'anti-démarrage par éthylotest électronique, titulaire d'un permis probatoire, ou personne en situation d'apprentissage → contravention de 4e classe (art. R.234-1/I et V, natinf 25434, 33329, 31060, 31061)." },
              { titre: "Seuil contraventionnel standard — autre conducteur ou accompagnateur", texte: "**Entre 0,25 et <0,40 mg/l (ou 0,50 à <0,80 g/l)** → contravention de 4e classe (natinf 13322, 31062)." },
            ]},
            { niveau: "II", titre: "La C.E.I. (conduite en état d'ivresse manifeste)", texte: "**Délit** (natinf 41, 9009 si récidive) caractérisé par des **signes extérieurs** visibles de tous (haleine, propos incohérents, élocution hésitante, titubation, somnolence...), **indépendamment du taux d'alcoolémie mesuré**, qui peut être inférieur au seuil légal. L'auteur présumé doit être soumis aux vérifications (éthylomètre ou prélèvement sanguin), sans dépistage préalable obligatoire (art. L.234-3 al.1 et L.234-6 C.R.)." },
            { niveau: "III", titre: "Le refus de se soumettre aux vérifications", texte: "**Délit** (natinf 51, 9164 si récidive ; natinf 2000 pour les vérifications C.S.P.). Réitérer l'injonction en énonçant les peines encourues ; si le refus est persistant et déterminé, relever par PV la volonté délibérée de refuser.", points: ["Sans signe extérieur d'ivresse → refus de se soumettre aux vérifications (délit seul).", "Avec signes extérieurs évidents d'ivresse → **C.E.I. + refus** (deux délits, le C.E.I. étant indépendant du taux).", "Dans le cadre des vérifications C.S.P. → refus de se soumettre (délit)."] },
            { niveau: "IV", titre: "Les cas de contrôle de l'alcoolémie", reference: "Art. L.234-3, L.234-9 C.R. — Art. L.3354-1 C.S.P.", enfants: [
              { titre: "Contrôle obligatoire (art. L.234-3 al.1 C.R.)", texte: "Conducteur/accompagnateur impliqué dans un accident corporel, ou auteur présumé d'une infraction entraînant une **suspension du permis de conduire (S.P.C.)** (ex : excès de vitesse ≥30 km/h, C.E.I.). Vérifications directes ou dépistage préalable." },
              { titre: "Contrôle facultatif (art. L.234-3 al.2 C.R.)", texte: "Auteur présumé de toute autre infraction au C.R., ou impliqué dans un accident quelconque (non corporel)." },
              { titre: "Contrôle préventif (art. L.234-9 C.R.)", texte: "En l'absence d'infraction ou d'accident, sur instruction du procureur ou à l'initiative d'un O.P.J./A.P.J. — dépistage puis vérifications, ou vérifications directes sans dépistage si réalisées immédiatement sur les lieux (éthylomètre embarqué)." },
              { titre: "Cas prévus par le C.S.P. (art. L.3354-1)", texte: "Contrôle obligatoire par les OPJ/APJ en cas de délit, crime ou accident de la circulation, sur l'auteur (si suivi de mort, ou raisons de croire à l'état alcoolique) ou la victime si utile — vise aussi piétons, cavaliers, conducteurs de train/tramway/bateau." },
            ]},
            { titre: "Répression du refus de vérifications", points: ["Refus des vérifications prévues par le code de la route : **2 ans - 4 500 €** (art. L.234-8 C.R.).", "Refus des vérifications prévues par l'art. L.3354-1 C.S.P. : **1 an - 3 750 €** (art. L.3354-2 C.S.P.).", "**Le refus de dépistage seul ne constitue pas une infraction**, mais entraîne l'obligation de se soumettre aux vérifications."] },
          ],
        },
        {
          titre: "La conduite après usage de stupéfiants",
          reference: "Art. L.235-1 à L.235-5, R.235-1 à R.235-13 du Code de la route — Arrêté du 13/12/16",
          plan: [
            { niveau: "I", titre: "Les cas de dépistage", texte: "Les OPJ/APJ procèdent au dépistage ; les A.P.J.A. agissent sur ordre et sous la responsabilité d'un O.P.J., dans tous les cas.", points: ["**Obligatoire** : accident mortel, corporel ou matériel.", "**Facultatif** : toute infraction au code de la route ; existence de raisons plausibles de soupçonner l'usage de stupéfiants (résidus visibles, objets de consommation, troubles de l'équilibre/élocution).", "**Préventif** : sur réquisitions du procureur, ou à l'initiative d'un OPJ/APJ, même sans accident/infraction/soupçon."] },
            { niveau: "II", titre: "Les modalités de dépistage", texte: "Recherche, à partir d'un recueil **salivaire** (mode à privilégier) ou **urinaire**, de 4 familles de substances : **cannabiniques, amphétaminiques, cocaïniques, opiacés**.", enfants: [
              { titre: "Dépistage salivaire", texte: "Effectué par O.P.J./A.P.J., ou A.P.J.A. sur ordre d'un O.P.J., à partir d'un kit à usage unique (collecteur, plaquette de révélation, fiole de solution)." },
              { titre: "Dépistage urinaire", texte: "Recueil dans un flacon stérile + bandelettes réactives, effectué par un professionnel de santé requis, à l'hôpital ou exceptionnellement en cabinet médical ville ; les policiers n'assistent pas au recueil, pour des raisons de décence." },
            ]},
            { niveau: "III", titre: "Les vérifications de l'usage de stupéfiants", texte: "**Ne peuvent pas être mises en œuvre par les A.P.J.A.** Mises en œuvre si dépistage positif, refus de dépistage, ou dépistage impossible (blessé grave/décédé). Présence confirmée → délit (natinf 23761). Refus de vérifications → délit (natinf 22988).", enfants: [
              { titre: "Par prélèvement salivaire", texte: "Collecteur placé par le conducteur lui-même sous contrôle OPJ/APJ. Si le conducteur veut se réserver une expertise ultérieure : réquisition d'un médecin pour prélèvement sanguin + examen clinique (demande possible dans les 5 jours suivant la notification des résultats)." },
              { titre: "Par prélèvement sanguin", texte: "Obligatoire en cas de décès ou d'impossibilité du prélèvement salivaire — 2 tubes prélevés (un pour analyse, un conservé pour expertise éventuelle)." },
            ]},
            { titre: "Cumul stupéfiants et alcool", texte: "Une concentration d'alcool supérieure aux taux du code de la route **aggrave** les peines du délit de conduite après usage de stupéfiants (art. L.235-1 al.2 C.R., natinf 23762) — les deux procédures (alcool + stupéfiants) doivent être menées concomitamment." },
          ],
        },
        {
          titre: "La rétention du permis de conduire",
          reference: "Art. L.224-1 à L.224-6, R.224-1 à R.224-5 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Les OPJ et APJ doivent retenir à titre conservatoire le permis (ou autre document justifiant du droit de conduire, hors B.S.R.) dans l'attente d'une éventuelle suspension par le préfet. **Les A.P.J.A. ne peuvent mettre en œuvre cette mesure que dans 2 cas (3 et 5).**" },
            { niveau: "I", titre: "Les 6 cas de rétention", points: ["**1. Conduite sous l'influence de l'alcool** : dépistage/comportement présumant l'état alcoolique ; taux ≥0,40 mg/l ; ivresse manifeste ; refus de dépistage/vérification.", "**2. Conduite après usage de stupéfiants** : dépistage positif ; raisons plausibles de soupçonner l'usage ; refus de vérifications.", "**3. Dépassement de 40 km/h ou plus** de la vitesse maximale autorisée, établi par appareil homologué, véhicule intercepté sur le champ (mesure possible par A.P.J.A.).", "**4. Accident mortel ou corporel** s'il existe des raisons de soupçonner une contravention en matière de téléphone tenu en main, vitesses, croisement, dépassement, intersection ou priorités.", "**5. Usage du téléphone tenu en main**, véhicule intercepté, commis simultanément avec une infraction listée à l'art. R.224-19-1 (non-respect du bord droit, changement de direction sans avertissement, non-respect des distances de sécurité, franchissement de ligne continue, feu rouge/jaune fixe, excès de vitesse, dépassement de véhicule, non-respect d'un STOP/cédez-le-passage, priorité piéton) — mesure possible par A.P.J.A.", "**6. Refus d'obtempérer** (art. L.233-1 et L.233-1-1 C.R.)."] },
            { niveau: "II", titre: "La mise en œuvre de la mesure", points: ["Un **avis de rétention** est rédigé et remis, même sans remise immédiate du titre (mise en demeure de le remettre sous 24h, natinf 6247).", "Le **véhicule est immobilisé d'office**, sauf conducteur qualifié de remplacement.", "Rétention pendant un **délai maximum de 72 heures** (**120 heures** si vérifications par analyses/examens médicaux) — natinf 6246."] },
            { niveau: "III", titre: "La décision du préfet", texte: "Dans le délai de rétention, le préfet **doit** prononcer la suspension immédiate pour : CEEA, CEI, refus de vérifications alcool, conduite après stupéfiants, refus de vérifications stupéfiants. Il **peut** aussi la prononcer pour : excès de vitesse ≥40 km/h, accident mortel/corporel, refus d'obtempérer aggravé, ou rétention liée au téléphone tenu en main + autre infraction.", points: ["Pour CEEA/CEI/refus vérifications alcool, l'arrêté peut autoriser la conduite des seuls véhicules équipés d'un anti-démarrage par éthylotest électronique.", "**Durée de suspension** : maximum 6 mois, portée à **1 an** en cas d'accident mortel/corporel, refus d'obtempérer aggravé, CEEA/CEI, conduite après stupéfiants ou refus de vérifications (art. L.224-2 et L.224-8 C.R.)."] },
            { titre: "À défaut de décision dans les délais", texte: "Le permis est remis à disposition, tenu au service désigné pendant les 12h suivant la fin de la rétention (prorogé jusqu'à 12h le lendemain si la rétention expire entre 18h et 22h)." },
          ],
        },
        {
          titre: "Le permis à points",
          reference: "Art. L.223-1 à L.223-9, R.223-1 à R.223-4 du Code de la route",
          plan: [
            { titre: "Principe", texte: "À l'obtention du premier droit de conduire (hors catégorie AM), le permis est affecté d'un capital initial de **6 points**. Pendant le délai probatoire, l'affectation du nombre maximal (**12 points**) intervient progressivement si aucune infraction à retrait de points n'est commise." },
            { niveau: "I", titre: "Le retrait de points", points: ["**Délits** : retrait de **6 points**.", "**Contraventions** : retrait de **1, 2, 3, 4 ou 6 points**.", "**Infractions simultanées** : retrait cumulé plafonné à **8 points maximum**.", "Le retrait s'opère quand la sanction devient **définitive** : amende forfaitaire payée, composition pénale exécutée, émission du titre exécutoire de l'amende majorée, ou décision judiciaire définitive."] },
            { titre: "Perte totale des points", texte: "L'invalidation du permis pour solde nul et l'injonction de le restituer sont notifiées par courrier avec accusé de réception. **Le droit de conduire est perdu à compter de cette notification**. Le retrait de points ne concerne que les infractions commises avec un véhicule pour lequel un permis est exigé." },
            { niveau: "II", titre: "Les délits liés à l'invalidation pour solde nul", points: ["**Conduite malgré injonction de restituer le permis** résultant du retrait total des points (natinf 22873, art. L.223-5 C.R.) — contrôle alcoolémie obligatoire.", "**Refus de restituer le permis** malgré l'injonction suivant la perte totale des points, dans le délai de 10 jours francs (natinf 11049).", "**Conduite malgré l'interdiction d'obtenir la délivrance** d'un nouveau permis (natinf 5709) — interdiction de 6 mois ou 1 an à compter de la restitution (art. L.223-5/II C.R.).", "Si la période d'interdiction est arrivée à son terme sans nouveau permis obtenu : **conduite sans permis** (natinf 7536)."] },
            { niveau: "III", titre: "Les délits de « trafic de points »", reference: "Art. L.223-9 C.R.", texte: "Répriment la vente/l'achat de points, ou le fait d'en proposer, dans le but de désigner une tierce personne comme auteur d'une contravention dans une requête en exonération/réclamation (art. 529-10/1°b C.P.P.).", points: ["Suppose l'existence d'une **rémunération ou d'une proposition de rémunération** (natinf 28714 à 28720).", "L'infraction d'origine doit être une contravention n'ayant **pas donné lieu à interpellation** (vitesse, distances de sécurité, voies réservées, feux, ceinture/casque, téléphone, lignes continues, sens interdit, priorité piéton, passages à niveau, ponts, bande d'arrêt d'urgence, plaques...), le titulaire du certificat d'immatriculation étant destinataire de l'avis et pouvant déclarer l'identité du conducteur réel.", "**Aggravé** si commis de façon habituelle ou par diffusion d'un message au public (natinf 28718, 28719, 28720).", "**Non réprimée** : la désignation d'un conducteur dans le cadre familial ou amical, sans contrepartie."] },
            { niveau: "II", titre: "La durée du délai probatoire et l'affectation progressive", points: ["**3 ans** (cas général) : +2 points par an.", "**2 ans** (avec formation complémentaire, ou catégorie B après A.A.C.) : +2 points la 1re année puis +4 la 2e.", "**1 an et 6 mois** (catégorie B après A.A.C. + formation complémentaire) : +3 points la 1re année puis au terme des 6 mois suivants.", "La formation complémentaire peut être suivie entre le 6e et le 12e mois après l'obtention du permis."] },
            { niveau: "III", titre: "La reconstitution du nombre de points", reference: "Art. L.223-6 C.R.", points: ["**Reconstitution automatique totale** : après 3 ans sans nouvelle infraction à retrait (si l'infraction d'origine était un délit ou une contravention de 4e/5e classe), ou 2 ans pour les autres classes (non applicable pendant le délai probatoire).", "**Retrait d'1 seul point** : réattribué après **6 mois**.", "**Points non réattribués autrement** (contraventions des 4 premières classes) : réattribués après **10 ans**.", "**Stage de sensibilisation** : récupère **4 points** dans la limite du plafond — volontaire (1 fois/an) ou obligatoire (infraction ayant retiré ≥3 points en période probatoire, se substitue à l'amende)."] },
            { titre: "La pratique du policier", texte: "Le policier doit informer le contrevenant que l'infraction entraîne un retrait de points, sans obligation de préciser le nombre (art. L.223-3 C.R.). Sur un PV « ordinaire », une formulation type doit figurer, précisant les règles de retrait (6 points pour un délit, jusqu'à 6 pour une contravention, cumul plafonné à 8), l'existence du fichier S.N.P.C., et le droit d'accès aux informations (art. L.225-3 C.R.)." },
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "Contrôle routier et pièces afférentes à la conduite et à la circulation des véhicules",
      fiches: [
        {
          titre: "Le cadre légal du contrôle routier",
          reference: "Art. R.233-1 et R.233-3 du Code de la route — Art. R.211-14-0 et suivants du Code des assurances",
          plan: [
            { titre: "Principe", texte: "Les OPJ et APJ peuvent **interrompre d'initiative** la progression d'un véhicule à moteur (léger, poids lourd, deux-roues...), **en l'absence d'infraction préalable**, pour contrôler les pièces afférentes à la conduite et à la circulation." },
            { niveau: "I", titre: "Les pièces contrôlables", points: ["**Le titre d'autorisation de conduire** : permis de conduire ou certificat équivalent, B.S.R. (art. R.233-1 C.R.) — à titre expérimental, présentation possible en version numérique via « France identité ».", "**L'attestation d'équipement anti-démarrage par éthylotest électronique**, si le conducteur y est soumis (condamnation, décision préfectorale).", "**Le certificat d'immatriculation** du véhicule, et de la remorque si PTAC >500 kg (récépissé de perte/vol valable 1 mois).", "**L'attestation d'assurance.**", "**Le triangle de présignalisation** et **le gilet de haute visibilité** (art. R.416-19 C.R.)."] },
            { niveau: "II", titre: "Les délits liés au contrôle routier", points: ["**Refus d'obtempérer** à une sommation de s'arrêter émanant d'un agent identifiable (natinf 50, 25124, 34489).", "**Refus de se soumettre aux vérifications** relatives au véhicule ou au conducteur (natinf 179)."], texte: "Les A.P.J.A. ne sont pas habilités à constater ces délits par PV." },
            { titre: "Non-présentation et non-justification", texte: "La non-présentation immédiate entraîne l'obligation de justifier la possession du document dans les **5 jours** (**12 jours** dans le cadre du PVe). Pour le B.S.R., la non-présentation immédiate n'est **pas réprimée**, mais son titulaire doit pouvoir le justifier sous 5 jours (natinf 21213)." },
            { titre: "L'ouverture du capot moteur", texte: "**La fouille ou la visite du coffre ne sont pas autorisées** lors d'un simple contrôle routier. En revanche, le policier peut demander l'**ouverture du capot moteur** pour vérifier la conformité du numéro d'identification du véhicule avec le certificat d'immatriculation." },
            { titre: "Conséquences possibles du contrôle", points: ["Vérification du respect de la réglementation sur le contrôle technique.", "Vérification des équipements réglementaires (pneumatiques, éclairage...).", "Constatation de l'interdiction de fumer en présence d'un mineur dans le véhicule (Code de la santé publique)."] },
          ],
        },
        {
          titre: "Le permis de conduire",
          reference: "Art. L.221-1, L.221-2, R.221-1 à R.222-7 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Nul ne peut conduire un véhicule pour lequel un permis est exigé sans être titulaire de la catégorie correspondante, ni si son permis fait l'objet d'une mesure administrative ou judiciaire." },
            { niveau: "I", titre: "Les mesures affectant le permis", enfants: [
              { titre: "La rétention", texte: "Mesure conservatoire obligatoire, 72h (ou 120h) maximum, dans l'attente d'une suspension administrative (art. L.224-1 à L.224-4/L.224-6 C.R.)." },
              { titre: "La suspension", texte: "Par le **préfet** (mesure de sûreté administrative, durée max 6 mois ou 1 an) ou par la **juridiction pénale** (peine alternative ou complémentaire, durée max 3 ou 5 ans)." },
              { titre: "L'annulation", texte: "Par le **préfet** (suite à contrôle médical d'aptitude) ou par la **juridiction pénale** (avec interdiction possible de solliciter un nouveau permis, durée max 3, 5 ou 10 ans)." },
              { titre: "L'invalidation", texte: "Intervient lorsque le solde de points est nul (voir fiche « Le permis à points »)." },
            ]},
            { niveau: "II", titre: "Les catégories de permis de conduire", points: ["**A1** (16 ans) : motocyclettes légères ≤125 cm³ (puissance ≤11 kW), tricycles à moteur ≤15 kW.", "**A2** (18 ans) : motocyclettes ≤35 kW (rapport puissance/poids ≤0,2 kW/kg).", "**A** (20 ans, ou A2 depuis 2 ans + formation) : toutes motocyclettes, tricycles >15 kW.", "**B1** (16 ans) : quadricycles lourds à moteur.", "**B** (17 ans, ou 18 ans si conduite accompagnée) : véhicules ≤3,5 T pour 8 passagers maximum ; autorise aussi quadricycles, tricycles/motos légères sous conditions, véhicules agricoles ≤40 km/h.", "**BE** (18 ans) : ensemble B + remorque ≤3,5 T.", "**C1** (18 ans) : véhicules >3,5 T et ≤7,5 T pour 8 passagers max. **C1E** (18-21 ans) : C1 + remorque.", "**C** (18 ou 21 ans selon formation) : véhicules >3,5 T pour 8 passagers max. **CE** : C + remorque >750 kg.", "**D1** (21 ans) : véhicules ≤16 passagers, longueur ≤8m. **D1E** : D1 + remorque.", "**D** (24, 23, 21 ou 20 ans selon formation/qualification) : véhicules >8 passagers. **DE** : D + remorque."] },
            { titre: "Nota", texte: "Les permis délivrés avant le 19 janvier 2013 restent valables et devront être échangés contre un nouveau modèle avant le 19/01/2033." },
            { niveau: "III", titre: "Les délits de « défaut de permis »", points: ["**Conduite sans permis** (natinf 7536) — A.F.D. possible.", "**Conduite avec un permis d'une catégorie n'autorisant pas la conduite** (natinf 22872).", "**Conduite sans être titulaire du permis correspondant, en faisant usage d'un permis faux ou falsifié** (natinf 32042, art. L.221-2-1 C.R.).", "**Conduite malgré suspension administrative ou judiciaire** (natinf 5707).", "**Conduite malgré annulation judiciaire** (natinf 5708).", "**Conduite malgré interdiction d'obtenir la délivrance** du permis (natinf 5709).", "**Conduite malgré suspension judiciaire** (natinf 7953, art. 434-41 C.P.)."], texte: "Les A.P.J.A. ne sont pas habilités à constater ces délits par PV." },
            { niveau: "IV", titre: "La reconnaissance des permis délivrés à l'étranger", enfants: [
              { titre: "Permis délivré par un État de l'U.E. ou de l'E.E.E.", texte: "Reconnu en France sous réserve d'être en cours de validité. Échange en permis français possible sans nouvel examen si résidence normale en France ; **obligatoire** en cas d'infraction ayant entraîné restriction/suspension/retrait du droit de conduire ou retrait de points (natinf 21944 en l'absence d'échange)." },
              { titre: "Permis délivré par un État hors U.E./E.E.E.", texte: "Reconnu pendant **1 an** après acquisition de la résidence normale en France. Au terme du délai, le permis n'est plus reconnu et le titulaire perd tout droit de conduire (natinf 7536). Échange possible pendant 1 an sans nouvel examen si accord de réciprocité." },
            ]},
            { niveau: "V", titre: "Les visites médicales d'aptitude", reference: "Art. R.221-10, R.221-11 C.R.", texte: "Obligatoires pour la délivrance/prorogation de certaines catégories, selon le handicap, l'âge ou le type de véhicule (natinf 7538 si non-respect ; conduite sans attestation préfectorale : natinf 28159, 22874 à 22877, 27746 selon le véhicule — taxi, ambulance, ramassage scolaire, transport public, VTC).", points: ["Catégories A/B pour véhicules aménagés handicap : sans limitation de durée.", "Catégorie A (transport onéreux 2/3-roues) et catégorie B (taxi, VTC, ambulance, ramassage scolaire, transport public) : tous les 5 ans avant 60 ans, tous les 2 ans entre 60 et 76 ans, tous les ans après 76 ans.", "Catégories C1/C1E/C/CE et D1/D1E/D/DE : tous les 5 ans avant 60 ans, tous les ans à partir de 60 ans."] },
            { niveau: "VI", titre: "Les mentions additionnelles ou restrictives", texte: "Restrictions codifiées apposées sur le permis (natinf 25611 en cas de non-respect), fixées par arrêté : ex. 01 (correction de la vision), 45 (side-car uniquement), 62 (rayon de trajets limité), 63 (sans passager), 67 (pas d'autoroute), 69 (éthylotest anti-démarrage), 96 (remorque B 750kg-4T250), 105/106 (dispense/soumission art. R.413-5), 109 (quadricycle léger pour catégorie AM)." },
          ],
        },
        {
          titre: "Le brevet de sécurité routière (B.S.R.)",
          reference: "Art. R.211-2 du Code de la route",
          plan: [
            { titre: "Champ d'application", texte: "Exigé pour la conduite d'un cyclomoteur ou d'un quadricycle léger à moteur par un conducteur non titulaire du permis de conduire." },
            { titre: "Les infractions liées au B.S.R.", points: ["**Conduite avant 14 ans** : conduite de cyclomoteur ou de quadricycle léger par un mineur de moins de 14 ans (natinf 11384, 21214).", "**Défaut de B.S.R.** : conduite sans brevet ni titre européen équivalent, pour un conducteur non titulaire du permis (natinf 11385, 25341) — immobilisation possible.", "**Non-justification dans les 5 jours** de la possession du B.S.R., d'un titre équivalent ou du permis (natinf 21213)."] },
          ],
        },
        {
          titre: "Les certificats d'immatriculation",
          reference: "Art. R.322-1 à R.322-8 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Les véhicules à moteur (sauf cyclomobiles légers et EDPM), les remorques de PTAC >500 kg et les semi-remorques doivent être immatriculés. Le certificat comporte le numéro à reporter sur les plaques (natinf 7543). Depuis le 15 avril 2009, le numéro est attribué à titre définitif." },
            { niveau: "I", titre: "La série normale", texte: "Composition : **2 lettres - 3 chiffres - 2 lettres** (ex : AA-111-AA). Les lettres I, O et U sont exclues (confusion avec 1, 0 et V) ; l'association « SS » est interdite (code pénal)." },
            { niveau: "II", titre: "Les usages particuliers de la série normale", points: ["**Administration civile de l'État** ; **véhicule militaire.**", "**Véhicule agricole** : numéro d'exploitation attribué par le ministre de l'Intérieur.", "**Véhicule de démonstration** : date de fin de validité d'usage.", "**Véhicule de collection** : intérêt historique, ≥30 ans, non produit, état d'origine maintenu — usage personnel sans restriction géographique.", "**Véhicule en transit temporaire / importé en transit** : exonération douanière, validité limitée (6 mois prorogeable pour le transit temporaire).", "**Véhicule zone franche** (pays de Gex, Haute-Savoie) : exemption de droits de douane pour les résidents de ces zones."] },
            { niveau: "III", titre: "La série diplomatique", texte: "Comporte 2 numéros : le numéro définitif du véhicule et un numéro spécifique lié au statut diplomatique.", points: ["**Séries CMD/CD** : personnel diplomatique ou assimilé.", "**Série C** : fonctionnaires du corps consulaire.", "**Série K** : fonctionnaires internationaux."] },
            { niveau: "IV", titre: "Les certificats provisoires d'immatriculation", texte: "Le **C.P.I.** est délivré dans l'attente du certificat définitif et permet de circuler pendant **1 mois** (8 mois pour la location courte durée, 3 mois pour l'attente d'une immatriculation diplomatique)." },
          ],
        },
        {
          titre: "Le contrôle technique des véhicules légers, des véhicules motorisés à deux ou trois roues et quadricycles à moteur",
          reference: "Art. R.323-22 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Vérifie le bon état de marche et d'entretien du véhicule, réalisé dans un centre agréé à l'initiative du propriétaire." },
            { niveau: "I", titre: "Les véhicules légers (VP, CTTE)", enfants: [
              { titre: "Catégories concernées", texte: "Voitures particulières et camionnettes (rubrique J1 du certificat), hors série diplomatique. **Exclus** : dépannage, transport public <10 places, transport sanitaire, auto-écoles, taxis/VTC, véhicules de collection." },
              { titre: "Périodicité", texte: "Au plus tard dans les **6 mois précédant le 4e anniversaire** de la 1re mise en circulation, puis **tous les 2 ans**, et avant toute mutation d'un véhicule de plus de 4 ans." },
              { titre: "Contrôle des émissions polluantes (camionnettes)", texte: "Visite complémentaire dans les 2 mois précédant l'expiration du délai d'1 an après chaque contrôle technique." },
            ]},
            { niveau: "II", titre: "Les véhicules motorisés à 2/3 roues et quadricycles (catégorie L)", texte: "Catégories : L1e (cyclomoteur ≤50cm³), L2e (cyclomoteur 3 roues), L3e (motocyclette), L4e (side-car), L5e (tricycle), L6e (quadricycle léger).", enfants: [
              { titre: "Périodicité", texte: "Au plus tard dans les **6 mois précédant le 5e anniversaire** de la 1re mise en circulation, puis **tous les 3 ans**, et avant toute mutation d'un véhicule de plus de 5 ans." },
            ]},
            { niveau: "III", titre: "Les conséquences du contrôle", texte: "Un PV liste les défauts constatés ; une contre-visite (délai max 2 mois) est requise en cas de défaillance majeure ou critique.", points: ["Timbre **A** : résultat favorable (validité 2 ans VL / 3 ans 2-3 roues).", "Timbre **S** : défaillance majeure (validité 2 mois).", "Timbre **R** : défaillance critique (validité limitée au jour du contrôle).", "Mention « report de la visite » si l'état du véhicule ne permet pas la vérification.", "Si la contre-visite n'est pas faite sous 2 mois : nouveau contrôle technique complet requis."] },
          ],
        },
        {
          titre: "L'assurance obligatoire",
          reference: "Art. L.211-1, R.211-14-0 à R.211-21-6 du Code des assurances — Art. L.324-1, L.324-2 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Toute personne physique ou morale (autre que l'État) doit être couverte par une assurance responsabilité civile pour faire circuler ou stationner un véhicule terrestre à moteur (immatriculé ou non) ou une remorque (natinf 6163)." },
            { niveau: "I", titre: "Véhicules à moteur immatriculés", texte: "Le conducteur est présumé satisfaire à l'obligation d'assurance si la consultation du **fichier des véhicules assurés (FVA)** confirme la couverture (l'assureur dispose de 72h après souscription pour l'alimenter). À défaut, la présomption peut résulter d'un justificatif d'assurance mentionnant sa durée de validité (**15 jours maxi**), ou être prouvée par tout moyen auprès de l'autorité judiciaire." },
            { niveau: "II", titre: "Véhicules à moteur non immatriculés (E.D.P.M., cyclomobiles légers)", texte: "L'assureur doit délivrer sans frais un document justificatif et un certificat d'assurance.", points: ["**L'attestation d'assurance** : à présenter à tout contrôle. Non-présentation (natinf 6168) → obligation de justifier sous 5 jours (12 jours en PVe, natinf 6164) ; à défaut, seule la contravention natinf 6164 est maintenue.", "**Le certificat d'assurance** : doit être apposé en cours de validité sur le véhicule (natinf 6166)."] },
            { niveau: "III", titre: "Véhicules étrangers (immatriculés ou non)", texte: "Le conducteur doit produire une **carte internationale d'assurance (« carte verte »)** valide, ou une attestation d'**assurance frontière**. À défaut, il doit prouver par tout autre moyen que le véhicule est assuré." },
            { titre: "Le défaut d'assurance (délit)", reference: "Natinf 6163", texte: "**Circulation avec un véhicule à moteur sans assurance** — A.F.D. possible, contrôle alcoolémie obligatoire, immobilisation, mise en fourrière possible avec accord du procureur (art. L.325-1-1 C.R.). **C'est un délit non puni d'emprisonnement** (donc sans coercition). Les A.P.J.A. ne sont pas habilités à le constater par PV." },
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "Équipements des véhicules et de leurs conducteurs/passagers",
      fiches: [
        {
          titre: "Les pneumatiques",
          reference: "Art. R.314-1 et R.314-3 du Code de la route",
          plan: [
            { titre: "Exigences générales", points: ["Sculptures apparentes sur toute la surface de roulement.", "Aucune toile apparente en surface ou en fond de sculptures.", "Aucune déchirure profonde sur les flancs.", "Profondeur des rainures principales **≥1,6 mm** (**≥1 mm** pour les véhicules de PTAC >3,5 T).", "Indicateurs d'usure situés dans les rainures principales pour les voitures particulières et leurs remorques."] },
            { titre: "Interdictions de montage", points: ["**2 pneumatiques de structure ou de type différents sur le même essieu** (dérogation temporaire pour la roue de secours).", "Pneumatiques portant les indications Max.30km/h, Max.10km/h, TA, AGRI ou AGRO."] },
            { titre: "Dispositions hivernales (1er novembre au 31 mars)", points: ["Dans les massifs montagneux désignés par arrêté préfectoral : dispositifs antidérapants amovibles (chaînes/chaussettes) pour au moins 2 roues motrices, **ou** 4 pneumatiques hiver (véhicules ≤8 places ou utilitaires légers ; véhicules PTAC >3,5 T avec remorque : chaînes/chaussettes obligatoires quel que soit l'équipement).", "Pneumatiques à clous autorisés uniquement en période hivernale, pour VP, utilitaires légers et transport en commun.", "Usage des chaînes autorisé uniquement sur routes enneigées."] },
            { titre: "Nota pratique", texte: "Plusieurs pneumatiques non conformes sur un même véhicule = **une seule contravention** (Cass. crim. 25/05/1994). Noter au PV le numéro du/des pneumatique(s) non conforme(s) (gravé sur le flanc)." },
          ],
        },
        {
          titre: "Éclairage et signalisation",
          reference: "Art. R.313-1 à R.313-23, R.416-4 à R.416-20, R.412-10, R.414-4 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Tout véhicule à moteur ou remorque ne peut être pourvu que des dispositifs d'éclairage/signalisation autorisés et installés conformément au code de la route (natinf 22830), en état de fonctionnement et respectant les conditions d'efficacité réglementaires." },
            { niveau: "I", titre: "L'équipement obligatoire", points: ["Feu de route conforme (natinf 22832), feu de croisement conforme (natinf 22833), feu de position avant conforme (natinf 22834).", "Feu de position arrière conforme (natinf 22835), feu stop conforme (natinf 22837), feux indicateurs de direction conformes (natinf 22842).", "Signal de détresse conforme (natinf 22843), feu de brouillard arrière conforme (natinf 22838).", "Dispositif d'éclairage de la plaque d'immatriculation arrière conforme (natinf 22840).", "Catadioptres arrière conformes (natinf 22844) et catadioptres latéraux conformes (natinf 22846).", "Triangle de présignalisation conforme (natinf 26986)."] },
            { niveau: "II", titre: "Les règles d'utilisation", enfants: [
              { titre: "De jour", texte: "Les motocyclettes (1re MEC après le 01/01/65), motocyclettes légères (après le 01/01/88) et cyclomoteurs (après le 01/07/04) doivent circuler avec le(s) feu(x) de croisement ou de circulation diurne allumés (natinf 238, 26165)." },
              { titre: "De nuit ou visibilité insuffisante", points: ["Véhicules à moteur et ensembles : feux de position arrière allumés (natinf 22892), éclairage de plaque allumé (natinf 22893), feux de position des remorques allumés (natinf 22895), feux d'encombrement allumés.", "Cyclomoteurs et quadricycles légers : feu(x) de croisement allumés (natinf 22887).", "Autres véhicules : feux de croisement allumés s'ils risquent d'éblouir (natinf 6114/22897), en agglomération sur route éclairée (natinf 22888), hors agglomération sur route éclairée en continu (natinf 22888), ou si visibilité réduite par les conditions atmosphériques (natinf 22889).", "Interdiction de circuler sans éclairage/signalisation en un lieu dépourvu d'éclairage public (natinf 11052)."] },
              { titre: "Feux de brouillard", texte: "Les feux avant peuvent remplacer/compléter les feux de croisement en cas de brouillard, neige ou forte pluie, et compléter les feux de route hors agglomération sur routes étroites/sinueuses. Les feux arrière ne peuvent être utilisés qu'en cas de brouillard ou de chute de neige (natinf 22890)." },
              { titre: "Feux indicateurs de direction", texte: "Usage obligatoire pour tout changement de direction ou ralentissement (natinf 217), et avant tout dépassement (natinf 11054)." },
              { titre: "Signal de détresse", texte: "Usage obligatoire (natinf 6290) en cas de circulation contrainte à allure fortement réduite, ou si le véhicule est le dernier d'une file circulant à allure fortement réduite." },
              { titre: "Présignalisation d'un véhicule immobilisé", texte: "Si le véhicule immobilisé constitue un danger (intersections, virages, sommets de côte, passages à niveau, visibilité insuffisante) ou en cas de chargement tombé sur la chaussée, le conducteur doit assurer la présignalisation par feux de détresse + triangle et revêtir un gilet de haute visibilité (natinf 22799), sauf mise en danger manifeste. Sur autoroute, présignalisation par feux de détresse obligatoire en cas d'immobilisation de nécessité (natinf 7574)." },
            ]},
          ],
        },
        {
          titre: "Le chargement",
          reference: "Art. R.312-19 à R.312-22 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Le chargement d'un véhicule ne doit pas être une cause de dommage ou de danger." },
            { niveau: "I", titre: "Les précautions d'arrimage", points: ["Le chargement débordant ou pouvant déborder le contour extérieur (oscillations) doit être **solidement amarré** (natinf 22595).", "Les pièces de grande longueur doivent être amarrées entre elles et au véhicule, sans déborder le contour latéral dans leurs oscillations (natinf 22595).", "Chaînes, bâches et accessoires mobiles/flottants doivent être fixés, sans sortir du contour du chargement ni traîner au sol (natinf 22596)."] },
            { niveau: "II", titre: "Largeur et longueur maximum (hors transport exceptionnel)", points: ["**Largeur maximale : 2,55 m** (natinf 22597 si dépassement ≤20%, natinf 22598 au-delà de 20%).", "**Vers l'avant** : le chargement ne doit pas dépasser l'aplomb du véhicule (natinf 22599).", "**Vers l'arrière** : le chargement ne doit pas dépasser de plus de **3 mètres** l'extrémité du véhicule/de la remorque (natinf 22601 si ≤20%, natinf 22602 au-delà) et ne doit pas traîner au sol (natinf 22600)."] },
          ],
        },
        {
          titre: "Les plaques",
          reference: "Art. R.317-8 à R.317-11 du Code de la route",
          plan: [
            { niveau: "I", titre: "La plaque du constructeur", texte: "Tout véhicule à moteur, remorque ou semi-remorque agricole doit être muni d'une plaque comportant le nom/la marque du constructeur, le type, le numéro d'identification du véhicule (V.I.N., inscrit rubrique E du certificat), et des informations techniques (poids, niveau sonore...). Le V.I.N. est aussi frappé à froid sur un élément indémontable. Non-conformité : natinf 22628." },
            { niveau: "II", titre: "La plaque de tare (chargement et encombrement)", texte: "Obligatoire pour tout véhicule à moteur ou remorque de PTAC >3,5 T, fixée en évidence côté droit.", points: ["Poids à vide (P.V.), poids total autorisé en charge (P.T.A.C.), poids total roulant autorisé (P.T.R.A.).", "Longueur, largeur, surface.", "Non-conformité : natinf 7541."] },
            { niveau: "III", titre: "La plaque d'immatriculation", points: ["Tout véhicule à moteur (sauf matériels de travaux publics) doit porter 1 ou 2 plaques ; remorques >500 kg et semi-remorques : plaque obligatoire ; remorques ≤500 kg : plaque reproduisant le numéro du tracteur.", "Chaque plaque doit reproduire le numéro du certificat d'immatriculation (natinf 45, 48, 25123).", "Conformité aux modèles réglementaires — dimensions/caractères/couleur (natinf 24030), lisibilité (natinf 24028), fixation inamovible (natinf 24029).", "Composition (série normale, depuis 2009) : numéro en caractères noirs sur fond blanc rétro-réfléchissant (2 lettres-3 chiffres-2 lettres), symbole européen + lettre F, identifiant territorial (logo région + n° département)."] },
            { niveau: "IV", titre: "Les délits relatifs aux plaques", points: ["**Défaut de plaque + fausse déclaration** : contravention 4e classe (natinf 7542) ou délit (natinf 49) selon le contexte.", "**Usage de fausse plaque** (natinf 48, art. L.317-2 C.R.) : délit.", "**Plaque inexacte** — mise en circulation avec plaque/inscription inexacte (natinf 45, art. L.317-4 C.R.) : délit, retrait de 6 points.", "**Usurpation de plaque** — numéro attribué à un autre véhicule (natinf 25123, art. L.317-4-1 C.R.) : délit, notamment en cas de volonté d'échapper à des poursuites (ex : radars automatiques)."] },
          ],
        },
        {
          titre: "Les miroirs rétroviseurs / systèmes de vision indirecte",
          reference: "Art. R.316-6 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Tout véhicule à moteur (sauf véhicules/appareils agricoles sans cabine fermée) doit être muni d'un ou plusieurs systèmes de vision indirecte permettant au conducteur de surveiller l'arrière depuis son siège (natinf 22627)." },
            { titre: "Nombre et emplacement selon le véhicule", points: ["Véhicule particulier : 1 intérieur + 1 latéral extérieur gauche.", "Véhicule particulier (carrosserie commerciale/break, conduite accompagnée, ou remorque dépassant la largeur/masquant la visibilité) : 1 intérieur + 2 latéraux.", "Transport en commun de personnes : 2 latéraux.", "Transport de marchandises PTAC >3,5T : 1 latéral (+ 1 si transport de personnes).", "Tricycle à moteur avec cabine, quadricycle à moteur : 2 latéraux (transport de marchandises).", "Motocyclette, cyclomoteur, tricycle sans cabine : 1 latéral extérieur gauche."] },
          ],
        },
        {
          titre: "Les essuie-glaces",
          reference: "Art. R.316-4 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Le pare-brise des véhicules à moteur (sauf cyclomoteurs 2/3 roues non carrossés, quadricycles légers non carrossés et motocyclettes) doit être muni d'au moins un essuie-glace à surface d'action, puissance et fréquence suffisantes pour une vision distincte de la route." },
            { titre: "Le lave-glace", texte: "Le pare-brise doit aussi être équipé d'un dispositif lave-glace complétant l'action de l'essuie-glace, pour assurer le champ de vision quelles que soient les conditions atmosphériques (natinf 22626 en cas de non-conformité, avec possibilité d'immobilisation)." },
          ],
        },
        {
          titre: "Nuisances causées par les véhicules (bruit, usage intempestif de l'avertisseur sonore)",
          reference: "Art. R.318-1, R.318-3, R.416-1, R.416-2 du Code de la route",
          plan: [
            { niveau: "I", titre: "Les émissions de bruit", reference: "Art. R.318-3 C.R.", texte: "Les véhicules ne doivent pas émettre de bruits susceptibles de gêner les usagers ou les riverains.", enfants: [
              { titre: "Origine du bruit déterminable", texte: "Échappement absent/libre (natinf 22656), pouvant être interrompu par le conducteur (natinf 22657), ou non entretenu/modifié (natinf 22658) — contravention relevée + fiche d'immobilisation jusqu'au lieu de réparation." },
              { titre: "Origine du bruit non décelable", texte: "Fiche de présentation à la Brigade de contrôle technique pour vérification par sonomètre sous 40 jours (natinf 6210, 21937, 21938). Si niveau anormalement élevé confirmé : PV (natinf 6126) et immobilisation (fiche de circulation provisoire) en attente de réparation." },
            ]},
            { niveau: "II", titre: "L'usage intempestif de l'avertisseur sonore", reference: "Art. R.416-1, R.416-2 C.R.", texte: "Réservé aux avertissements nécessaires hors agglomération ou au danger immédiat en agglomération (natinf 22882 usage abusif de jour). **De nuit**, utilisation seulement en cas d'absolue nécessité (natinf 22883)." },
          ],
        },
        {
          titre: "La ceinture de sécurité / systèmes de retenue pour enfant",
          reference: "Art. R.412-1, R.412-1-1, R.412-2 du Code de la route",
          plan: [
            { niveau: "I", titre: "La ceinture de sécurité", points: ["Port obligatoire pour tout conducteur/passager d'un véhicule à moteur réceptionné avec cet équipement (natinf 12929/12930).", "**Un seul occupant par siège équipé d'une ceinture** (natinf 26813).", "Le nombre de passagers est limité au nombre de places assises du certificat d'immatriculation (natinf 32933).", "Pour un véhicule ≤9 places : le conducteur doit s'assurer que tout passager mineur est attaché (natinf 11065).", "**Interdit** de transporter un enfant de moins de 3 ans sur un siège non équipé de ceinture (natinf 27193)."] },
            { titre: "Dérogations au port de la ceinture", points: ["Morphologie manifestement inadaptée.", "Contre-indication médicale certifiée (symbole d'exemption).", "Véhicules d'intérêt général prioritaire (police, gendarmerie, douanes, pompiers, SMUR) en intervention urgente.", "Taxis en service ; véhicules de services publics à arrêts fréquents en agglomération ; livraisons porte-à-porte en agglomération."] },
            { niveau: "II", titre: "Les systèmes de retenue pour enfants", texte: "Concerne tout véhicule sauf autobus/autocars PTAC >3,5 T.", points: ["**Moins de 10 ans** : système homologué adapté à la taille/au poids.", "**10 à 18 ans** : système homologué ou ceinture de sécurité.", "**Interdiction du siège avant** pour les moins de 10 ans, sauf : système face à l'arrière avec airbag désactivé, absence de siège arrière, siège arrière équipé indisponible ou déjà occupé par d'autres enfants en système de retenue."] },
            { titre: "Dérogations au système de retenue", points: ["Taille adaptée au port de la ceinture classique.", "Certificat médical d'exemption.", "Transport en taxi ou en transport en commun."] },
          ],
        },
        {
          titre: "Le casque et les gants de protection",
          reference: "Art. R.431-1 à R.431-1-2 du Code de la route",
          plan: [
            { titre: "Le casque", texte: "Tout conducteur ou passager d'une motocyclette, d'un cyclomoteur, d'un tricycle ou d'un quadricycle à moteur doit être coiffé d'un **casque homologué et attaché** (natinf 12931 moto, 12932 cyclo, 22921 tricycle/quad pour le conducteur ; 12933, 22922 pour le passager)." },
            { titre: "Les gants de protection", texte: "Port obligatoire de gants conformes à la réglementation relative aux équipements de protection individuelle, pour le conducteur (natinf 32034 moto, 32035 tricycle/quad, 32033 cyclo) comme pour le passager (natinf 32032)." },
          ],
        },
        {
          titre: "Le casque de protection « cycliste »",
          reference: "Art. R.431-1-3 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Le conducteur et le passager d'un cycle âgés de **moins de 12 ans** doivent porter un casque « cycliste » conforme (marquage CE) et attaché. **Le non-respect de cette obligation par le mineur lui-même n'est pas réprimé.**" },
            { titre: "Obligations des personnes majeures", points: ["Le conducteur majeur transportant un passager de moins de 12 ans doit s'assurer qu'il est coiffé d'un casque conforme et attaché (natinf 32253).", "La personne majeure accompagnant un ou plusieurs conducteurs de cycle de moins de 12 ans doit s'assurer que chacun porte un casque conforme (natinf 32254)."] },
          ],
        },
        {
          titre: "Le gilet de haute visibilité",
          reference: "Art. R.416-19, R.412-43-3, R.431-1-1 du Code de la route",
          plan: [
            { niveau: "I", titre: "Conducteur d'un véhicule à moteur", points: ["Doit disposer d'un gilet conforme (sauf véhicules agricoles) : sur soi ou en rangement pour les 2/3-roues et quadricycles non carrossés, à portée de main pour les autres véhicules (natinf 26987).", "Présentation obligatoire à toute réquisition ; en cas de non-présentation immédiate, **pas d'obligation de justifier sa possession**.", "**Doit être revêtu** en cas d'arrêt d'urgence sur chaussée/abords, avec présignalisation par feux de détresse + triangle (natinf 26985)."] },
            { niveau: "II", titre: "Conducteur d'un E.D.P.M. ou cyclomobile léger", texte: "Port obligatoire de nuit ou en cas de visibilité insuffisante de jour (gilet ou équipement rétro-réfléchissant, natinf 33361). Dispositif d'éclairage complémentaire non éblouissant/non clignotant autorisé en complément." },
            { niveau: "III", titre: "Conducteur ou passager d'un cycle", texte: "Port obligatoire hors agglomération, de nuit ou en cas de visibilité insuffisante de jour (natinf 26988)." },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "Règles d'usage des voies",
      fiches: [
        {
          titre: "Principes généraux de circulation",
          reference: "Art. R.412-6 à R.412-16 du Code de la route",
          plan: [
            { titre: "Comportement général", texte: "Tout conducteur doit adopter un comportement prudent et respectueux, avec une prudence accrue envers les usagers vulnérables. Il doit se tenir en état/position d'exécuter commodément toutes les manœuvres (natinf 6090) — champ de vision et possibilités de mouvement non réduits par passagers, objets ou vitres non transparentes." },
            { titre: "Interdictions au conducteur en circulation", points: ["Usage d'un téléphone tenu en main (natinf 23800).", "Port à l'oreille d'un dispositif émettant du son, sauf appareil correcteur de surdité (natinf 31063).", "Appareil à écran en fonctionnement dans le champ de vision, hors aide à la conduite/navigation (natinf 26963).", "Position ou manœuvre acrobatique/imprudente non conforme aux conditions normales d'utilisation (natinf 35564)."] },
            { titre: "Obligation de circuler sur la chaussée", texte: "Sauf nécessité absolue ou aménagement particulier — près du bord droit, en marche normale (natinf 6092/6093), sauf trajectoire cycles/EDPM ou giratoire à plusieurs voies." },
            { titre: "Voies réservées et espaces interdits", points: ["Voies réservées (transport public natinf 24090, véhicules d'intérêt général natinf 24091, piste/bande cyclable natinf 32512) : interdites aux autres catégories.", "Voies vertes et aires piétonnes : interdites aux véhicules motorisés (natinf 24089).", "Bandes d'arrêt d'urgence : circulation interdite (natinf 6292)."] },
            { titre: "Avertissement préalable", texte: "Tout changement de direction ou ralentissement doit être signalé aux autres usagers, notamment en se portant à gauche, en traversant la chaussée, ou en reprenant sa place après un arrêt (natinf 217)." },
            { titre: "Transport en commun et distances de sécurité", points: ["En agglomération, faciliter la sortie des véhicules de transport en commun de leurs arrêts (natinf 11084).", "**Distance de sécurité** (natinf 6096) : au moins la distance parcourue en 2 secondes — 50 km/h=28m, 90 km/h=50m, 110 km/h=62m, 130 km/h=73m.", "Hors agglomération, pour les véhicules >3,5T ou >7m se suivant à la même vitesse : au moins **50 mètres**.", "Distances renforcées possibles sur ouvrages à risques (tunnels, ponts — natinf 23082)."] },
          ],
        },
        {
          titre: "Intersections et priorités de passage",
          reference: "Art. R.412-29 à R.412-33, R.415-1 à R.415-15 du Code de la route",
          plan: [
            { titre: "Règles générales", points: ["Vérifier que la chaussée à traverser est libre avant de s'engager dans une intersection (natinf 12868).", "Ne pas s'engager si le véhicule risque d'y être immobilisé et de gêner les autres voies (natinf 10093).", "Ne pas s'engager entre les deux lignes d'arrêt d'une intersection à feux si risque d'immobilisation (natinf 22795, sauf cycles/EDPM autorisés)."] },
            { titre: "Obligations de céder le passage", points: ["À une intersection signalée « cédez le passage » (natinf 6111).", "Aux EDPM/cycles/cyclomoteurs traversant sur une piste cyclable (natinf 26958).", "Aux véhicules circulant sur une route à grande circulation (natinf 22917).", "Aux usagers du carrefour giratoire (natinf 6091).", "En accédant à une route via un trottoir, chemin de terre ou aire de stationnement, à vitesse permettant l'arrêt (natinf 28030).", "Aux piétons engagés ou manifestant l'intention de traverser, en zone de rencontre ou aire piétonne (natinf 202, 26959, 26960, 28031).", "Aux véhicules d'intérêt général prioritaires usant de leurs avertisseurs (natinf 11077)."] },
            { titre: "La priorité à droite", texte: "Le conducteur venant de la gauche cède le passage à celui venant de la droite, sauf signalisation contraire (natinf 207)." },
            { titre: "Le panneau STOP", texte: "Arrêt obligatoire à la limite de la chaussée abordée (natinf 203), engagement possible seulement sans danger et après avoir cédé le passage (natinf 6112)." },
            { titre: "Les feux de signalisation", points: ["**Rouge** (fixe ou clignotant) : arrêt absolu (natinf 210).", "**Jaune fixe** : arrêt obligatoire, sauf impossibilité de s'arrêter en sécurité (natinf 6118).", "**Jaune clignotant** : signale un danger, autorise le passage sous réserve des règles de priorité."] },
            { titre: "Autoroutes et voies spécialisées", points: ["Bretelle de raccordement : céder le passage aux véhicules de l'autoroute (natinf 22918).", "Voies pour véhicules lents : céder le passage à leur extrémité (natinf 6115).", "Passage à niveau : ne jamais s'y engager si barrières fermées/en mouvement, ou sans certitude qu'aucun train n'approche si non gardé (natinf 11059)."] },
          ],
        },
        {
          titre: "Croisement",
          reference: "Art. R.414-1 à R.414-3 du Code de la route",
          plan: [
            { titre: "Définition", texte: "Il y a croisement entre deux véhicules circulant en sens inverse sur une même chaussée." },
            { titre: "Règle générale", texte: "Les croisements s'effectuent **à droite** (natinf 22910) : chaque conducteur serre sa droite autant que possible (natinf 11066). Certaines intersections aménagées permettent le croisement à gauche (signalées par panneau)." },
            { titre: "Chaussée étroite", texte: "Sur une chaussée dont la largeur/le profil/l'état ne permet pas un croisement facile et sûr, les véhicules de plus de 2m de large ou 7m de long (sauf transport en commun en agglomération) doivent céder le passage aux véhicules de dimensions inférieures (natinf 22911)." },
          ],
        },
        {
          titre: "Dépassement",
          reference: "Art. R.414-4 à R.414-17 du Code de la route",
          plan: [
            { titre: "Règle générale", texte: "Les dépassements s'effectuent **à gauche** (natinf 6102), sauf si le véhicule précédent a signalé son intention de tourner à gauche (natinf 11067)." },
            { titre: "Obligations du dépassant", points: ["**Avant** : s'assurer de pouvoir reprendre sa place rapidement (natinf 22060) ; s'assurer ne pas être soi-même sur le point d'être dépassé (natinf 22900).", "**Pendant** : avertir par les feux indicateurs (natinf 11054) ; laisser une distance latérale suffisante (natinf 11055) ; ne pas gêner la circulation en sens inverse (natinf 11056) ; ne pas emprunter la voie la plus à gauche sur chaussée à double sens de plus de 2 voies (natinf 6108).", "**Après** : revenir à droite sans provoquer le ralentissement du véhicule dépassé (natinf 11058)."] },
            { titre: "Obligations du véhicule dépassé", texte: "Serrer à droite (natinf 6110) et ne pas accélérer (natinf 6109)." },
            { titre: "Dépassements interdits", points: ["Visibilité insuffisante sur chaussée à double sens (natinf 11057).", "Intersections non protégées, sauf dépassement de 2-roues (natinf 6105).", "Traversées de voies ferrées sans barrières (natinf 11070).", "Train/tramway à l'arrêt côté montée/descente des voyageurs (natinf 11069).", "Engin de service hivernal en action sur chaussée enneigée/verglacée (natinf 23271).", "Par un véhicule >3,5T ou ensemble >7m sur chaussée enneigée/verglacée (natinf 23269).", "Interdiction signalée par l'autorité de police (natinf 10097)."] },
            { titre: "Cas particuliers", points: ["À l'approche d'un passage piéton : dépassement possible seulement si aucun piéton n'est engagé (natinf 10096).", "Véhicule d'intérêt général en approche : réduire, s'arrêter ou se garer pour faciliter son passage (natinf 22914).", "Véhicule à feux spéciaux/détresse, immobilisé ou à faible allure : réduire la vitesse avant dépassement (natinf 32934)."] },
          ],
        },
        {
          titre: "Sens de circulation",
          reference: "Art. R.412-26 à R.412-28-1 du Code de la route",
          plan: [
            { titre: "Obligations", points: ["Respecter la signalisation imposant une direction (natinf 11083).", "Respecter la signalisation interdisant une direction (natinf 256, sens interdit).", "Contourner par la **droite** tout obstacle (ouvrage, borne, terre-plein) sur la chaussée, sauf disposition contraire de l'autorité de police (natinf 6087)."] },
          ],
        },
        {
          titre: "Entrave / trouble à la circulation routière",
          reference: "Art. L.412-1 et R.412-51 du Code de la route",
          plan: [
            { niveau: "I", titre: "Le délit d'entrave à la circulation", texte: "Constitué par l'action intentionnelle de placer sur une voie ouverte à la circulation publique un objet faisant obstacle au passage des véhicules, ou d'employer un moyen quelconque pour y faire obstacle (véhicules, panneaux, arbres abattus, chaussée défoncée...). **La tentative est punissable** (natinf 2271, natinf 11050 pour la tentative). **Vise exclusivement l'entrave à la circulation des véhicules**, pas celle des piétons/animaux. Les A.P.J.A. ne sont pas habilités à le constater par PV." },
            { niveau: "II", titre: "Les contraventions de trouble à la circulation", enfants: [
              { titre: "Le refus d'obtempérer à un ordre d'enlever un objet", texte: "Placer un objet troublant la circulation ET ne pas obtempérer à l'injonction de l'enlever (natinf 6196) — mise en fourrière possible si commis à l'aide d'un véhicule." },
              { titre: "L'embarras de voie publique", texte: "Déposer/laisser sans nécessité des matériaux ou objets entravant la libre circulation (natinf 6069, art. R.644-2 C.P.)." },
              { titre: "L'occupation du domaine public", texte: "Non conforme à l'arrêté d'autorisation, portant atteinte à la libre circulation (natinf 34557, art. R.644-2-1 C.P.)." },
            ]},
          ],
        },
        {
          titre: "Vitesses des véhicules",
          reference: "Art. R.413-1 à R.413-19 du Code de la route",
          plan: [
            { niveau: "I", titre: "Vitesses maximales autorisées — véhicules légers", points: ["Autoroute : 130 km/h (110 par temps de pluie).", "Route à 2 chaussées séparées par terre-plein central : 110 km/h (100 pluie).", "Autres routes : 80 km/h (90 si 2 voies dans le même sens et arrêté le permettant).", "Conducteurs en délai probatoire : 110 km/h sur autoroute (100 si limite <130), 100 km/h sur route à 2 chaussées, 80 km/h ailleurs."] },
            { niveau: "II", titre: "Vitesses maximales — véhicules lourds et transport en commun", points: ["Transport en commun PTAC ≤10T : 100 km/h autoroute, 90 km/h route à 2 chaussées, 80 km/h ailleurs.", "Transport en commun PTAC >10T : 90 km/h (100 avec ABS).", "Véhicules lourds PTAC/PTRA ≤12T : 90 km/h autoroute, 80 km/h ailleurs.", "Véhicules lourds PTAC/PTRA >12T : 90 km/h autoroute, 80 km/h route à caractère prioritaire, 60 km/h autres routes.", "Transport de marchandises dangereuses PTAC >12T : 80 km/h autoroute, 60-70 km/h ailleurs."] },
            { niveau: "III", titre: "Autres véhicules et zones spécifiques", points: ["Cyclomoteurs/quadricycles légers : 45 km/h. EDPM : 25 km/h.", "Agglomération : 50 km/h par défaut ; 20 km/h en « zone de rencontre » ; 30 km/h en « zone 30 » ; 70 km/h sur sections à accès limités et protégés ; 70 km/h sur le boulevard périphérique de Paris.", "Brouillard (visibilité <50m) : 50 km/h sur tout le réseau."] },
            { niveau: "IV", titre: "Vitesse anormalement réduite", reference: "Natinf 6289", texte: "Interdiction de gêner la marche normale des autres véhicules en circulant sans raison valable à vitesse anormalement réduite, ou à moins de 80 km/h sur la voie la plus à gauche d'une autoroute en bonnes conditions et circulation fluide." },
            { niveau: "V", titre: "Vitesse excessive eu égard aux circonstances (défaut de maîtrise)", reference: "Natinf 213", texte: "Le conducteur doit rester constamment maître de sa vitesse et l'adapter à l'état de la chaussée, aux difficultés de circulation et aux obstacles prévisibles, pour immobiliser son véhicule dans l'espace libre devant lui.", points: ["Croisement/dépassement de piétons, cyclistes, animaux, véhicules à faible allure ou en détresse, transports en commun aux arrêts.", "Dépassement de convois à l'arrêt.", "Route non entièrement dégagée ou risquant d'être glissante ; visibilité insuffisante.", "Virages, descentes rapides, sections étroites/encombrées/bordées d'habitations.", "Sommets de côtes et intersections sans visibilité ; usage des feux de croisement."] },
            { niveau: "VI", titre: "Dépassement de la vitesse maximale autorisée — répression graduée", points: ["**<5 km/h** : contravention 3e classe (>50 km/h) ou 4e classe (≤50 km/h).", "**5 à <20 km/h** : contravention 3e/4e classe, retrait 1 point.", "**20 à <30 km/h** : contravention 4e classe, retrait 2 points.", "**30 à <40 km/h** : contravention 4e classe, retrait 3 points, contrôle alcoolémie obligatoire.", "**40 à <50 km/h** : contravention 4e classe, retrait 4 points, rétention du permis et immobilisation.", "**≥50 km/h** : **DÉLIT**, A.F.D. possible, retrait 6 points, rétention du permis et immobilisation. En cas de récidive sous 5 ans : 6 mois - 7 500 € (art. 132-10 C.P.), les APJA ne peuvent pas le constater."] },
          ],
        },
        {
          titre: "Circulation sur autoroutes et bretelles de raccordement",
          reference: "Art. R.412-8, R.412-22, R.421-1 à R.421-10 du Code de la route",
          plan: [
            { titre: "Accès interdit", points: ["Piétons (natinf 22803), animaux (natinf 22804).", "Véhicules sans moteur ; véhicules à moteur non immatriculés ; cyclomoteurs.", "Tricycles à moteur ≤15 kW et ≤550 kg à vide (catégorie L5e, natinf 13319) ; quadricycles à moteur.", "Tracteurs, matériels agricoles et de travaux publics (sauf autorisation).", "Ensembles de véhicules à plusieurs remorques ou transport exceptionnel soumis à autorisation."] },
            { titre: "Bretelles et bifurcations", points: ["Bretelle de raccordement : céder le passage aux véhicules de l'autoroute (natinf 22918).", "Bretelle de sortie/bifurcation signalée : s'engager sur la voie indiquée et achever la manœuvre au plus tard aux signaux de début de bretelle (natinf 13318, 13319)."] },
            { titre: "Interdictions absolues", points: ["Circuler sur la bande d'arrêt d'urgence (natinf 6292).", "Franchir/chevaucher sans nécessité absolue la ligne de la bande d'arrêt d'urgence (natinf 28649).", "Circuler sur la bande centrale séparative (natinf 6117).", "Faire demi-tour ou marche arrière (natinf 6212)."] },
          ],
        },
        {
          titre: "Lignes continues et discontinues",
          reference: "Art. R.412-18 à R.412-23 du Code de la route",
          plan: [
            { titre: "Ligne continue axiale ou séparative", texte: "Franchissement et chevauchement **interdits** (natinf 11325 franchissement, 11326 chevauchement). **Exception** : chevauchement autorisé pour dépasser en sécurité un EDPM ou un cycle." },
            { titre: "Ligne discontinue", texte: "Franchissement et chevauchement autorisés en cas de dépassement ou de traversée de chaussée (natinf 11081, si non justifié)." },
            { titre: "Ligne discontinue et continue accolées", texte: "Franchissement/chevauchement autorisés uniquement pour le conducteur dont le véhicule est le plus proche de la ligne discontinue." },
          ],
        },
        {
          titre: "Règles de circulation des engins de déplacement personnel motorisés (E.D.P.M.)",
          reference: "Art. R.412-43-1 à R.412-43-3, R.317-23-1, R.321-4-2 du Code de la route",
          plan: [
            { titre: "Âge minimum", texte: "Les conducteurs d'E.D.P.M. doivent être âgés d'au moins **14 ans**." },
            { niveau: "I", titre: "En agglomération", texte: "Circulation autorisée sur bandes/pistes cyclables (natinf 33353 ; emprunter celle de droite si deux pistes). En leur absence : routes ≤50 km/h (circulation de front interdite, natinf 33352), aires piétonnes (sauf interdiction), accotements revêtus (natinf 33354)." },
            { niveau: "II", titre: "Hors agglomération", texte: "Circulation **interdite**, sauf sur voies vertes et pistes cyclables (natinf 33354)." },
            { niveau: "III", titre: "Interdictions générales", points: ["Transporter un passager (natinf 33362).", "Pousser/tracter une charge ou un véhicule (natinf 33357, 33358).", "Se faire remorquer (natinf 33359).", "Utiliser un EDPM dont la vitesse par construction dépasse 25 km/h, ou débridé (natinf 33351, 33350)."] },
            { niveau: "IV", titre: "Circulation de nuit ou visibilité insuffisante", texte: "Port obligatoire d'un gilet de haute visibilité ou équipement rétro-réfléchissant (natinf 33361), complétable par un éclairage non éblouissant/non clignotant." },
            { niveau: "V", titre: "Dispositions particulières sur autorisation de l'autorité de police", points: ["Circulation sur trottoir à l'allure du pas, sans gêne pour les piétons (natinf 33355, 33356).", "Circulation sur routes ≤80 km/h sous conditions : casque attaché (natinf 33583), gilet/équipement rétro-réfléchissant (natinf 33586), éclairage complémentaire (natinf 33587), feux de position allumés jour et nuit (natinf 33585).", "L'accompagnateur majeur d'un mineur doit s'assurer du port du casque (natinf 33584)."] },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "Arrêt et stationnement des véhicules",
      fiches: [
        {
          titre: "Définitions",
          reference: "Art. R.110-2 du Code de la route",
          plan: [
            { titre: "Le stationnement", texte: "Immobilisation d'un véhicule sur la route, en dehors des circonstances caractérisant l'arrêt." },
            { titre: "L'arrêt", texte: "Immobilisation momentanée d'un véhicule sur une route durant le temps nécessaire pour la montée/descente de personnes ou le chargement/déchargement, le conducteur restant aux commandes ou à proximité pour pouvoir le déplacer." },
          ],
        },
        {
          titre: "Les règles générales",
          reference: "Art. R.417-1, R.417-4 du Code de la route",
          plan: [
            { niveau: "I", titre: "En agglomération", points: ["Sur l'**accotement** si non affecté à des usagers particuliers et si l'état du sol le permet.", "**Côté droit** des chaussées à double sens.", "**Côté droit ou gauche** des chaussées à sens unique.", "Le maire peut instaurer un **stationnement unilatéral alterné semi-mensuel** (art. R.417-2 C.R.) : côté impair du 1er au 15, côté pair du 16 à la fin du mois — changement de côté entre 20h30 et 21h."] },
            { niveau: "II", titre: "Hors agglomération", texte: "Seul le stationnement contraire aux règles peut être sanctionné (art. R.417-4 C.R.).", points: ["Placé **autant que possible hors de la chaussée**.", "Si sur la chaussée : côté droit (double sens) ou côté droit/gauche (sens unique)."] },
          ],
        },
        {
          titre: "Le stationnement abusif",
          reference: "Art. R.417-12, R.417-13 du Code de la route",
          plan: [
            { titre: "Définition", points: ["Stationnement ininterrompu en un même point pendant plus de **7 jours** (natinf 7560), ou une durée inférieure fixée par arrêté (natinf 7575).", "Véhicule ou ensemble de plus de **20 m²** dans une zone touristique, maintenu plus de **2 heures** après un premier PV de stationnement très gênant (natinf 21198)."] },
            { titre: "Mesure complémentaire", texte: "La **mise en fourrière** peut être prescrite si le conducteur/titulaire est absent ou refuse de faire cesser le stationnement abusif malgré injonction." },
          ],
        },
        {
          titre: "Arrêt / stationnement gênant",
          reference: "Art. R.417-10 du Code de la route — Art. L.2213-2, L.2213-3 du C.G.C.T.",
          plan: [
            { niveau: "I", titre: "Cas de gêne à la circulation", points: ["Sur les trottoirs pour motocyclette, tricycle à moteur ou cyclomoteur (natinf 31085/31086/31087) — pour les autres véhicules, c'est un stationnement **très gênant**.", "Sur emplacements réservés : transport public de voyageurs (natinf 22811), taxis (natinf 21201), autopartage (natinf 29370), service public (natinf 21199).", "Entre le bord de la chaussée et une ligne continue, si la largeur restante ne permet pas la circulation d'un autre véhicule sans franchir la ligne (natinf 7581).", "Empêchant l'accès ou le dégagement d'un autre véhicule (natinf 7583).", "Sur les ponts (natinf 21202), dans les tunnels/passages souterrains (natinf 21203), sous les passages supérieurs (natinf 21204).", "Sur les bandes d'arrêt d'urgence, sauf nécessité absolue (natinf 22802).", "Sur une voie spécialement désignée par arrêté (natinf 7588)."] },
            { niveau: "II", titre: "Autres cas de stationnement gênant", points: ["Devant les entrées carrossables des immeubles riverains (natinf 7586).", "En double file, sauf EDPM/cycles/cyclos 2 roues/motocyclettes sans side-car (natinf 7587).", "Devant les dispositifs de recharge des véhicules électriques (natinf 22812).", "Sur emplacements réservés aux livraisons (natinf 21290).", "Dans les zones de rencontre, hors emplacements aménagés (natinf 26961).", "Dans les aires piétonnes, sauf EDPM/cyclomobiles légers/cycles sur emplacements aménagés (natinf 26962).", "Au-dessus des accès signalés à des installations souterraines (natinf 21206)."] },
            { titre: "Mesure complémentaire", texte: "La mise en fourrière peut être prescrite si le conducteur/propriétaire est absent ou refuse de faire cesser le stationnement gênant." },
          ],
        },
        {
          titre: "Arrêt / stationnement très gênant",
          reference: "Art. R.417-11 du Code de la route — Art. L.2213-2, L.2213-3 du C.G.C.T., L.241-3 du C.A.S.F.",
          plan: [
            { niveau: "I", titre: "Premiers cas de stationnement très gênant", points: ["Chaussées/voies réservées à certaines catégories, sauf nécessité absolue (natinf 6215, 22813).", "Ensemble de véhicules >20 m² en zone touristique (natinf 20586).", "Emplacements réservés aux détenteurs d'une carte mobilité inclusion « stationnement handicap » (natinf 21200).", "Emplacements réservés au transport de fonds/métaux précieux (natinf 29402).", "Passages réservés à la traversée des piétons (natinf 31088).", "Au droit des bandes d'éveil de vigilance (sauf quai de transport public, natinf 31094).", "À proximité de signaux/panneaux si le gabarit du véhicule masque la signalisation (natinf 31095).", "**L'arrêt** dans ces conditions est également très gênant (natinf 31096)."] },
            { niveau: "II", titre: "Autres cas (véhicules motorisés, hors EDPM/cyclomobiles/cycles à pédalage assisté)", points: ["Sur les trottoirs, sauf motocyclettes/tricycles/cyclomoteurs (gênant seulement pour ceux-ci) — natinf 31089.", "Sur les voies vertes (natinf 31090), bandes et pistes cyclables (natinf 31091).", "Sur 5 mètres en amont des passages piétons dans le sens de la circulation, hors emplacement matérialisé (natinf 31092).", "Au droit des bouches d'incendie (natinf 31093)."] },
            { titre: "Mesure complémentaire", texte: "La mise en fourrière peut être prescrite si le conducteur/titulaire est absent ou refuse de faire cesser le stationnement très gênant." },
          ],
        },
        {
          titre: "Arrêt ou stationnement dangereux",
          reference: "Art. R.417-9 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Tout véhicule à l'arrêt ou en stationnement doit être placé de manière à ne pas constituer un danger pour les usagers." },
            { titre: "Cas visés (lorsque la visibilité est insuffisante)", points: ["À proximité des intersections de routes.", "Des virages.", "Des sommets de côte.", "Des passages à niveau."] },
            { titre: "Mesure complémentaire", texte: "La mise en fourrière peut être prescrite si le conducteur/titulaire est absent ou refuse de faire cesser le stationnement dangereux." },
          ],
        },
        {
          titre: "Arrêt ou stationnement sur un passage piétons ou à ses abords",
          reference: "Art. R.417-5, R.417-11 du Code de la route",
          plan: [
            { titre: "Cas n°1 — empiètement direct sur le passage piéton", reference: "Art. R.417-5 C.R.", texte: "Le véhicule est arrêté ou stationné en empiétant directement sur le passage piétons — natinf 32532 (stationnement), natinf 32533 (arrêt). Si le véhicule n'est pas un engin de déplacement personnel motorisé ou un cycle à pédalage assisté, vérifier également le cas n°3." },
            { titre: "Cas n°2 — stationnement très gênant sur le passage", reference: "Art. R.417-11, 5° C.R.", texte: "Le véhicule est arrêté ou stationné sur un passage réservé à la circulation des piétons — natinf 31088 (stationnement), natinf 31096 (arrêt)." },
            { titre: "Cas n°3 — stationnement très gênant en amont", reference: "Art. R.417-11, 8°c C.R.", texte: "Le véhicule (hors EDPM et cycles à pédalage assisté) est arrêté ou stationné sur une distance de **5 mètres en amont** d'un passage piétons, dans le sens de la circulation, en dehors des emplacements matérialisés à cet effet — natinf 31092 (stationnement), natinf 31096 (arrêt)." },
          ],
        },
        {
          titre: "Arrêt ou stationnement (autoroute)",
          reference: "Art. R.421-1, R.421-5 et R.421-7 du Code de la route",
          plan: [
            { titre: "Principe", texte: "Sauf en cas de **nécessité absolue**, les conducteurs ne doivent pas arrêter ou stationner leur véhicule sur les chaussées, accotements, bandes d'arrêt d'urgence et bretelles de raccordement des autoroutes (natinf 7573)." },
            { titre: "En cas de nécessité absolue d'immobilisation", points: ["Immobiliser le véhicule **en dehors des voies de circulation**, ou à défaut **au plus près du bord droit** de la chaussée.", "**Assurer dans tous les cas la présignalisation** du véhicule.", "S'il n'est pas possible de le remettre en marche par ses propres moyens, faire le nécessaire pour assurer **d'urgence le dégagement de l'autoroute**."] },
            { titre: "Interdiction absolue sur la bande centrale séparative", texte: "Les conducteurs ne doivent **en aucun cas** s'arrêter ou stationner sur la bande centrale séparative des chaussées d'une autoroute (natinf 22919)." },
            { titre: "Mesure complémentaire", texte: "Dans tous ces cas, la **mise en fourrière** peut être prescrite si le conducteur ou le titulaire du certificat d'immatriculation est absent ou refuse, malgré injonction, de faire cesser le stationnement irrégulier." },
          ],
        },
      ],
    },
  ],
};


const DOC_PI_AVANCE = {
  titre: "Le policier en intervention (socle avancé)",
  sections: [
    {
      numero: 1,
      titre: "La circulation et le séjour des étrangers",
      fiches: [
        {
          titre: "L'accord de Schengen",
          definition: "La convention de Schengen repose sur le principe de disparition des frontières intérieures et le renforcement des frontières extérieures, pour assurer la sécurité des citoyens au sein d'un espace de libre circulation. L'« espace Schengen » regroupe 25 États membres de l'Union européenne et 4 États associés (Islande, Norvège, Suisse, Liechtenstein).",
          plan: [
            { niveau: "I", titre: "La libre circulation des personnes", enfants: [
              { niveau: "A", titre: "Suppression des contrôles aux frontières intérieures", texte: "Les frontières intérieures (frontières communes terrestres, aéroports pour vols intérieurs, ports maritimes) peuvent être franchies en tout lieu sans contrôle des personnes, quelle que soit leur nationalité ou leur statut. La suppression des contrôles aux frontières ne fait pas obstacle aux contrôles d'identité ou de régularité du séjour sur l'ensemble du territoire.", points: ["**Nota** : certains territoires ne sont pas couverts (Guadeloupe, Martinique, Réunion, Mayotte, Nouvelle-Calédonie, Polynésie française).", "**Limite 1** : un État peut rétablir temporairement des contrôles pour l'ordre public/la sécurité nationale (événement prévisible ou imprévisible).", "**Limite 2** : les ressortissants de pays tiers soumis à visa ou titulaires d'une carte <1 an doivent effectuer une déclaration d'entrée (D.E.T.) — plus exigée en France depuis 1998.", "**Limite 3** : en cas de rétablissement des contrôles, le périmètre de contrôle (art. L.332-3 CESEDA) s'étend jusqu'à 10 km en deçà de la frontière intérieure terrestre ; un étranger en situation irrégulière dans ce périmètre fait l'objet d'un refus d'entrée."] },
              { niveau: "B", titre: "Une coordination des contrôles aux frontières extérieures", enfants: [
                { niveau: "1", titre: "Les contrôles aux frontières extérieures", texte: "Frontières terrestres/maritimes et aéroports/ports non intérieurs — franchissables uniquement aux points de passage autorisés, aux heures fixées (pour la France : frontière avec le Royaume-Uni via Eurostar/Shuttle et Andorre, frontières maritimes/aériennes extra-Schengen)." },
                { niveau: "2", titre: "Une politique commune de visas", texte: "Harmonisation de la délivrance des visas de court séjour (≤3 mois). Le fichier **Visabio** collecte les données biométriques de tous les demandeurs, vérifiées aux postes de contrôle." },
                { niveau: "3", titre: "Les demandeurs d'asile", texte: "Leur demande est traitée par un seul État de l'espace Schengen (le pays d'entrée)." },
                { niveau: "4", titre: "La lutte contre l'immigration illégale", texte: "Harmonisation des règles communes d'éloignement, de la répression de l'aide à l'immigration illégale, et du rapatriement des étrangers entrés irrégulièrement." },
              ]},
            ]},
            { niveau: "II", titre: "Les mesures compensatoires destinées à préserver la sécurité des citoyens", enfants: [
              { niveau: "A", titre: "Coopération policière et judiciaire", points: ["Les services de police s'accordent assistance pour prévenir et rechercher les infractions (coopération intergouvernementale).", "Mise en commun des informations et coordination des actions, notamment via **EUROPOL**.", "**Droit d'observation transfrontalière** : un enquêteur peut continuer une filature sur le territoire d'un État voisin, sous conditions, pour certaines infractions graves.", "**Droit de poursuite transfrontalière** : possibilité de poursuivre, sans autorisation préalable, l'auteur en fuite au-delà de la frontière, sous conditions."] },
              { niveau: "B", titre: "Le système d'information Schengen (S.I.S.)", texte: "Banque de données commune, mise à jour en permanence, sur les personnes disparues/surveillées/recherchées dans une procédure pénale (et objets recherchés). En cas de recherche positive dans un fichier (FPR...), la réponse Schengen apparaît avec une conduite à tenir. Les **bureaux SIRENE** (policiers, gendarmes, douaniers, magistrats, implantés à la D.N.P.J., actifs 24h/24) apportent un soutien logistique pour l'exécution des conduites à tenir liées aux signalements." },
            ]},
          ],
        },
        {
          titre: "La coopération policière et judiciaire au sein de l'Union Européenne",
          definition: "La création de l'espace Schengen a nécessité un accroissement de la coopération policière et judiciaire entre États membres.",
          plan: [
            { niveau: "I", titre: "La coopération policière", enfants: [
              { niveau: "A", titre: "Le droit d'observation transfrontalière", texte: "Permet à un enquêteur de continuer une filature sur le territoire d'un État voisin, **sans interpellation possible**.", enfants: [
                { niveau: "1", titre: "L'observation dite ordinaire", texte: "Possible au cours d'une enquête judiciaire, sur une personne présumée avoir participé/être susceptible de commettre un fait puni d'une peine (ou permettant son identification). **L'État requis doit accorder son autorisation** (demande transmise via la S.C.C.O.P.O.L. pour les agents français)." },
                { niveau: "2", titre: "L'observation « en urgence »", texte: "Lorsque l'autorisation préalable ne peut être demandée pour des raisons urgentes, l'agent peut continuer au-delà de la frontière pour des infractions limitativement prévues (meurtre, viol, trafic de stupéfiants, vol aggravé...). Le franchissement doit être immédiatement porté à la connaissance de l'autorité centrale du pays concerné, qui en donne ensuite l'autorisation." },
              ]},
              { niveau: "B", titre: "Le droit de poursuite", texte: "Possibilité pour des policiers (O.P.J. ou A.P.J.) poursuivant une personne prise en flagrant délit d'une infraction limitativement prévue (ou en état d'arrestation provisoire/purgeant une peine) de continuer leur poursuite sur le territoire d'un État voisin, **sans autorisation préalable**, à des conditions très strictes, en faisant appel aux autorités compétentes dès le franchissement de la frontière." },
              { niveau: "C", titre: "Les services de coopération policière", texte: "La direction des relations internationales, au sein de la D.N.P.J., coordonne la coopération policière opérationnelle.", enfants: [
                { niveau: "1", titre: "La S.C.C.O.P.O.L.", texte: "Administre le bureau central national-France d'**Interpol** (organisation internationale de coopération policière, 190 pays) et l'unité nationale d'**Europol** (agence européenne de lutte contre la criminalité organisée transfrontalière et le terrorisme)." },
                { niveau: "2", titre: "Le Point de Contact Central (P.C.C.)", texte: "Centralise les demandes nationales de coopération, vérifie leur légalité, fait les premiers recoupements et choisit le canal de coopération adapté." },
                { niveau: "3", titre: "L'unité de coordination et d'assistance Prüm (U.C.A.P.)", texte: "Traite les échanges d'information suite à un « hit » lors des comparaisons automatisées d'ADN ou d'empreintes digitales entre pays de l'UE." },
                { niveau: "4", titre: "L'office N-SIS II", texte: "Chargé du bon fonctionnement et de la sécurité du système N-SIS II." },
              ]},
            ]},
            { niveau: "II", titre: "La coopération judiciaire", points: ["**La demande d'entraide judiciaire** : destinée à une autorité étrangère pour l'exécution d'actes judiciaires, afin de réprimer une infraction existante.", "**Les équipes communes d'enquêtes** : créées en France dans le cadre d'une procédure judiciaire existante relative à une enquête pénale complexe.", "**Les Centres de Coopération Policière et Douanière (C.C.P.D.)** : réunissent police, gendarmerie et douane dans la zone frontalière — dédiés à l'échange d'informations, sans pouvoirs opérationnels.", "**Les commissariats européens** : renfort d'agents des 27 États membres dans les lieux fréquentés par des ressortissants européens lors d'événements ponctuels ou périodes touristiques (réciprocité possible pour des policiers français à l'étranger)."] },
          ],
        },
        {
          titre: "Les différents titres de séjour",
          definition: "Dès que la qualité d'étranger a été établie, il appartient au gardien de la paix d'examiner le titre de séjour présenté.",
          plan: [
            { niveau: "I", titre: "Titres de séjour délivrés aux majeurs", reference: "Art. L.411-1 C.E.S.E.D.A.", enfants: [
              { niveau: "A", titre: "Les différents titres", enfants: [
                { niveau: "1", titre: "La carte de résident", texte: "Délivrée aux étrangers remplissant les conditions légales. **Valable 10 ans.** La carte de résident permanent est délivrée de droit dès son 2e renouvellement." },
                { niveau: "2", titre: "La carte de séjour temporaire", texte: "**Valable 1 an**, pour les étrangers ne remplissant pas les conditions de la carte de résident. Carte plastifiée ou vignette sur passeport (mentions : « salarié », « vie privée et familiale »...)." },
                { niveau: "3", titre: "La carte de séjour pluriannuelle", reference: "Art. L.411-4 C.E.S.E.D.A.", texte: "Mentions variées (« talent », « étudiant-programme de mobilité », « salarié détaché ICT »). **Valable de 2 à 4 ans**, renouvelable." },
                { niveau: "4", titre: "La carte de séjour « retraité »", texte: "**Valable 10 ans**, renouvelée de plein droit. Permet d'entrer en France à tout moment pour des séjours n'excédant pas 1 an." },
                { niveau: "5", titre: "Le certificat de résidence algérien", texte: "Régime particulier issu d'un accord franco-algérien. Tout ressortissant algérien majeur (ou 16-18 ans s'il veut travailler) doit être titulaire d'un titre. Certificat d'**1 an** (« vie privée et familiale », « salarié », « étudiant »...) ou de **10 ans** sous conditions." },
                { niveau: "6", titre: "Les titres délivrés aux résidents de l'U.E. et de l'E.E.E.", texte: "Peuvent séjourner en France avec seulement un passeport/CNI valide. Une carte de séjour « Ressortissant d'un État membre de l'U.E. » peut être délivrée par convenance, ou obligatoirement pour les Bulgares/Roumains souhaitant travailler." },
                { niveau: "7", titre: "Les visas de long séjour (visa D)", texte: "Valent titre de séjour, pour un séjour de plus de 3 mois et jusqu'à 1 an.", points: ["Mentions « vie privée et familiale », « visiteur », « étudiant », « salarié », « travailleur temporaire », « scientifique-chercheur », « stagiaire ».", "Mention « dispense temporaire de carte de séjour ».", "Mention « carte de séjour à solliciter dans les 2 mois suivant l'arrivée ».", "Enregistrement obligatoire auprès de l'**O.F.I.I.**, qui appose une vignette dans le passeport."] },
                { niveau: "8", titre: "Titre « accord de retrait du Royaume-Uni »", texte: "Depuis le 1er janvier 2022, les ressortissants britanniques doivent détenir soit ce titre spécifique, soit un titre de droit commun." },
              ]},
            ]},
            { niveau: "II", titre: "Titres de séjour délivrés aux mineurs", texte: "Les mineurs étrangers résidant en France sont **dispensés de titre de séjour**. Pour faciliter leurs déplacements, ils peuvent obtenir un **Document de Circulation pour Étranger Mineur (D.C.E.M.)** (art. L.414-4 à L.414-9, L.236-1 CESEDA), valable au maximum 5 ans. Un D.C.E.M. délivré par le préfet de Mayotte ne permet la réadmission qu'à Mayotte." },
            { niveau: "III", titre: "Les documents délivrés aux demandeurs d'asile et apatrides", enfants: [
              { niveau: "A", titre: "Définitions", points: ["**Réfugié** : personne craignant d'être persécutée en raison de sa race, religion, nationalité, appartenance à un groupe social ou opinions politiques (convention de Genève).", "**Apatride** : personne qu'aucun État ne considère comme son ressortissant (convention de New York du 28/09/1954).", "**Bénéficiaire de la protection subsidiaire** : ne remplit pas les conditions du statut de réfugié mais est exposé à des menaces graves dans son pays d'origine (peine de mort, tortures, traitements inhumains)."] },
              { niveau: "B", titre: "Les titres de séjour délivrés", texte: "Dépôt d'un dossier auprès de l'**O.F.P.R.A.**, délivrance d'un récépissé valable 3 mois (3 types : dépôt de demande, reconnaissance d'une protection internationale, admission au titre de l'asile)." },
              { niveau: "C", titre: "En cas de décision favorable de l'O.F.P.R.A.", points: ["Réfugiés et apatrides : carte pluriannuelle « bénéficiaire du statut d'apatride » (4 ans) ou carte de résident (10 ans) — art. L.424-1, L.424-18 CESEDA.", "Bénéficiaires de la protection subsidiaire : carte pluriannuelle (4 ans) de plein droit, puis carte de résident (10 ans) après 4 ans de résidence régulière — art. L.424-9, L.424-13 CESEDA."] },
            ]},
            { niveau: "IV", titre: "Les titres provisoires de séjour", enfants: [
              { niveau: "A", titre: "L'autorisation provisoire de séjour (A.P.S.)", texte: "Document autorisant la présence en France pendant sa durée de validité (**15 jours, 1, 3 ou 6 mois**, renouvelable), de couleur rose et verte. Porte la mention « permet d'occuper un emploi » ou « ne permet pas d'occuper un emploi »." },
              { niveau: "B", titre: "Le récépissé de demande de carte de séjour (R.C.S.)", texte: "Délivré à tout étranger déposant une 1re demande ou un renouvellement, permettant de demeurer régulièrement en France durant l'instruction du dossier. Durée minimale **1 mois**, généralement délivré pour **3 mois**, renouvelable." },
            ]},
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "La protection des mineurs",
      fiches: [
        {
          titre: "Le statut juridique du mineur",
          definition: "L'autorité parentale est un ensemble de droits et de devoirs incombant aux parents et ayant pour finalité l'intérêt de l'enfant. Il appartient au père et à la mère, jusqu'à la majorité ou l'émancipation de leur enfant, de le protéger dans sa sécurité, sa santé, sa vie privée et sa moralité, d'assurer son éducation et son développement — sans violences physiques ou psychologiques, en associant l'enfant aux décisions selon son âge et sa maturité.",
          plan: [
            { niveau: "I", titre: "Les droits des mineurs", enfants: [
              { niveau: "A", titre: "Le droit à l'hébergement", reference: "Art. 108-2 C. civ.", texte: "L'enfant trouve sa sécurité en étant hébergé chez ses parents, où il est domicilié. La violation de ce droit est sévèrement punie : abandon/non-représentation d'enfant (art. 227-3, 227-5 C.P.), enlèvement/détournement de mineur (art. 224-5, 227-7, 227-8 C.P.)." },
              { niveau: "B", titre: "Le droit à l'entretien", reference: "Art. 203 C. civ.", texte: "Les époux doivent satisfaire aux besoins vitaux de l'enfant (nourriture, logement, santé, éducation), selon leurs ressources. En cas de dissociation de l'autorité parentale (divorce), l'obligation prend la forme d'une pension alimentaire versée par le parent n'assumant pas la charge principale." },
              { niveau: "C", titre: "Le droit à l'éducation", texte: "Droit et devoir des parents d'assurer l'instruction, la formation professionnelle, civique, morale et religieuse. Le choix des méthodes est laissé aux parents, sauf violences ou contrariété aux bonnes mœurs (intervention du juge via l'assistance éducative). **Art. R.624-7 C.P.** : 750 € d'amende pour non-respect de l'obligation de fréquentation scolaire assidue, sans motif légitime." },
              { niveau: "D", titre: "Le droit à la santé", reference: "Art. 371-1 C. civ.", texte: "Obligation parentale d'assurer et de veiller à la santé des enfants.", points: ["Exemples pernicieux d'ivrognerie habituelle, inconduite notoire, défaut de soins (art. 378-1 C. civ.).", "Violences (art. 222-8, 222-10, 222-12, 222-13, 222-14 C.P.).", "Atteintes à la santé/sécurité/moralité/éducation (art. 227-17 C.P.).", "Privation volontaire d'aliments ou de soins (art. 227-15, 227-16 C.P.) — dont le fait de maintenir un enfant de moins de 6 ans sur la voie publique/transport collectif pour solliciter la générosité des passants.", "Abandon de famille : départ sans subsides (art. 227-17), non-paiement de pension (art. 227-3), inobservation de l'obligation scolaire (art. 227-17-1 C.P., art. L.131-1 C. éduc.)."] },
              { niveau: "E", titre: "Le droit à l'image et au respect de la vie privée", reference: "Art. 372-1 C. civ.", texte: "Les parents protègent ensemble le droit à l'image de l'enfant, en l'associant selon son âge et sa maturité." },
              { niveau: "F", titre: "Le droit au recours à la justice et à la défense de ses intérêts", reference: "Art. 388-1 C. civ.", texte: "Le mineur « capable de discernement » peut être entendu par le juge civil dans toute procédure le concernant. La demande ne peut être écartée que par décision spécialement motivée ; il peut être entendu seul, avec un avocat ou une personne de son choix (sous contrôle du juge)." },
              { niveau: "G", titre: "Le droit à l'aide juridictionnelle", reference: "Art. 9-1 loi n°91-647 du 10/07/1991", texte: "Attribuée de droit au mineur." },
            ]},
            { niveau: "II", titre: "Les devoirs des mineurs", enfants: [
              { niveau: "A", titre: "Le respect des parents", reference: "Art. 371 C. civ.", texte: "L'enfant, à tout âge, doit honneur et respect à ses père et mère." },
              { niveau: "B", titre: "Le devoir d'obéissance", reference: "Art. 371-1 C. civ.", texte: "Respect de l'autorité des parents jusqu'à la majorité ou l'émancipation." },
              { niveau: "C", titre: "Le devoir de domiciliation", reference: "Art. 108-2, 371-3 C. civ.", texte: "Le mineur non émancipé est domicilié chez ses parents (ou celui avec qui il réside/décision de justice). Il ne peut quitter la maison familiale sans permission, ni en être retiré hors des cas prévus par la loi." },
              { niveau: "D", titre: "L'obligation de scolarisation", texte: "L'instruction est obligatoire pour tout enfant, français ou étranger, **entre 3 et 16 ans**." },
            ]},
          ],
        },
        {
          titre: "La protection des mineurs sur la voie publique",
          plan: [
            { niveau: "I", titre: "L'obligation scolaire", reference: "Art. L.131-1 C. éduc.", texte: "Instruction obligatoire de 3 à 16 ans. Si un enfant d'âge scolaire est trouvé sur la voie publique en heures de classe sans motif légitime :", points: ["Relever son identité et sa filiation.", "Le conduire à l'établissement scolaire où il est inscrit.", "Aviser la brigade des mineurs.", "Rédiger une mention de main courante."] },
            { niveau: "II", titre: "Le racket scolaire", reference: "Art. 312-1 à 312-9 C.P.", texte: "L'usage de violence ou de menaces pour commettre des extorsions se répand dans le milieu scolaire ; le personnel enseignant est souvent démuni, les victimes hésitent par peur de représailles. Chaque signalement doit faire l'objet d'une attention particulière, même à faible préjudice. Une observation attentive à la sortie des établissements peut permettre d'identifier les adolescents plus âgés attendant les plus jeunes." },
            { niveau: "III", titre: "La mendicité", reference: "Art. 227-15 al.2 C.P.", texte: "Réprime le fait de maintenir un enfant de moins de 6 ans sur la voie publique ou dans un espace de transport collectif, pour solliciter la générosité des passants — **7 ans et 100 000 € d'amende**." },
            { niveau: "IV", titre: "L'interdiction d'aller et venir la nuit sur la voie publique (couvre-feu)", texte: "Limite la liberté d'aller et venir des mineurs entre **23h et 6h** (sauf accompagnés d'un titulaire de l'autorité parentale).", points: ["**Caractère judiciaire** : sanction éducative individuelle pour un mineur de 13 à 18 ans (art. L.112-2 C.J.P.M.).", "**Caractère administratif** : arrêté à portée générale pour les mineurs de moins de 13 ans (art. L.132-8 C.S.I.)."] },
            { niveau: "V", titre: "L'accès aux salles de cinéma et de spectacle", texte: "Accès interdit aux mineurs de 18, 16 ou 12 ans selon les films — affichage obligatoire aux guichets (contravention de 5e classe en cas de manquement). Le préfet peut interdire l'accès des mineurs de 18 ans à tout établissement de nature à exercer une mauvaise influence (spectacle pornographique/violent, risque de rixes) — affichage obligatoire, contravention de 5e classe en cas de non-respect." },
            { niveau: "VI", titre: "La prostitution des mineurs", texte: "Tout mineur qui se prostitue est réputé en danger, son suivi relève du juge des enfants. Le recours à la prostitution d'un mineur est interdit (art. 225-12-1 C.P.). La mise à disposition d'un mineur à un tiers pour permettre un proxénétisme est un délit distinct (art. 225-4-1, 225-4-2 1° C.P.)." },
            { niveau: "VII", titre: "Les fugues — champ d'application", texte: "Concerne tous les mineurs de 18 ans, sauf les mineurs émancipés de 16 ans au moins, et les jeunes adultes de 18-21 ans placés en établissement spécialisé par décision de justice (assimilables aux mineurs en matière de fugue)." },
            { niveau: "VIII", titre: "Le mineur en fugue", reference: "Art. 26 loi n°95-73 du 21/01/1995, modifié par l'art. 66 loi n°2002-1138 — Art. 56 à 62, 74-1 C.P.P.", enfants: [
              { niveau: "A", titre: "La prise en charge de la disparition", texte: "**La fugue doit toujours être traitée comme une disparition inquiétante**, même si elle semble volontaire ou habituelle — une disparition d'apparence banale peut aboutir à un drame. Sur instructions du procureur, les OPJ (assistés d'APJ) peuvent procéder à des perquisitions, saisies, réquisitions, auditions, mais **pas de garde à vue**. Applicable aussi à un majeur dont la disparition est inquiétante/suspecte (âge, état de santé).", points: ["Renseignements à recueillir : identité/filiation, lieu de résidence des parents, photographie.", "Signalement descriptif (âge réel/apparent, tenue, signes particuliers).", "Situation scolaire, effets emportés (sac, téléphone, argent...).", "Endroits fréquentés, dernier lieu vu, fréquentations.", "Moyen de locomotion éventuel, fugues antérieures.", "**Inscription systématique au F.P.R.**"] },
              { niveau: "B", titre: "La découverte et la prise en charge du fugueur", texte: "Le conduire au service, aviser la brigade des mineurs et suivre ses directives. **Ce n'est pas une interpellation mais une mesure de protection** : attente dans un lieu neutre (éviter la vue de scènes violentes ou de gardés à vue). Rédaction d'un rapport/PV, cessation des recherches au F.P.R.", points: ["Le magistrat doit être informé : l'adresse d'un mineur disparu ne peut être communiquée au représentant légal qu'avec l'autorisation du juge des enfants (appréciation du danger).", "Le fugueur ne peut quitter les locaux que sous la conduite de ses parents ou d'une personne responsable."] },
            ]},
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "L'accident de la circulation",
      fiches: [
        {
          titre: "Technique du plan des lieux",
          plan: [
            { niveau: "I", titre: "Rappel du principe général", texte: "Le croquis est **obligatoire** pour : dommages corporels (blessures ou décès), dégâts importants au domaine public, transport de marchandises dangereuses, implication d'un véhicule des forces armées alliées, ou d'un véhicule de l'État/collectivité publique avec dégâts matériels importants.", points: ["Il montre la position des véhicules, corps, traces, indices par rapport aux lieux.", "Il doit être réalisé **à l'encre**, pour éviter toute falsification.", "**Confidentialité** : si une partie se présente au commissariat pour voir le croquis, il ne faut pas le lui montrer — seul son conseil (avocat/assureur) peut en obtenir communication auprès d'un magistrat."] },
            { niveau: "II", titre: "Techniques du croquis", enfants: [
              { titre: "Les points fixes et les cotes", texte: "Le relevé topographique s'appuie sur des points fixes quasi définitifs à matérialiser (angles de murs, bornes, pylônes, plaques d'égout, numéros d'habitation, point kilométrique, signalisation verticale...). Toute distance relevée est représentée par une **cote** (trait plein avec pointes de flèche aux extrémités), la valeur chiffrée étant disposée horizontalement." },
              { titre: "Méthodes de représentation", texte: "Le document présente plusieurs méthodes standardisées (coordonnées directes, coordonnées rectangulaires, méthode mixte) et des signes conventionnels prescrits pour une représentation schématique fidèle, destinées à servir de support à une éventuelle reconstitution judiciaire." },
            ]},
          ],
        },
        {
          titre: "Les renseignements à recueillir sur les lieux d'un accident « corporel » de la circulation",
          reference: "Art. 20 C.P.P. — Art. L.130-3 du Code de la route",
          definition: "Les gardiens de la paix recherchent et constatent les infractions au code de la route et les atteintes involontaires à la vie/l'intégrité commises à l'occasion d'accidents de la circulation. Dès la sécurisation des lieux, ils procèdent aux constatations (alcoolémie, stupéfiants, rétention du permis...) et recueillent méthodiquement les renseignements déterminants pour la procédure, le plan accident et le B.A.A.C. (bulletin d'analyse des accidents corporels, alimentant le fichier national).",
          plan: [
            { niveau: "I", titre: "Les lieux de l'accident", enfants: [
              { niveau: "A", titre: "La localisation", points: ["**La commune** : si l'axe de la route est une limite communale, c'est la commune où circulait l'usager présumé responsable.", "**En/hors agglomération.**", "**En intersection ou à proximité** : moins de 50 m en agglomération, moins de 150 m hors agglomération.", "**La ou les voies de circulation** : nature, nom, catégorie administrative et numéro (ex : RD1089).", "**L'emplacement du point de choc initial** : numéro/nature/nom de voie, coordonnées GPS, PK ou PR."] },
              { niveau: "B", titre: "Les caractéristiques de la chaussée", points: ["**Régime de circulation** : sens unique/bidirectionnelle, chaussées séparées, voie à affectation variable.", "**Nombre de voies** : générales ou spéciales (pistes/bandes cyclables, voies réservées).", "**Régime de priorité** : feux, priorité à droite, stop, cédez-le-passage, route prioritaire, giratoire à feux.", "**Profil** : plat, pente, sommet/bas de côte. **Tracé** : rectiligne, courbe, en S.", "**État de la surface** : sèche, mouillée, inondée, enneigée, boueuse, verglacée, corps gras, dégradée.", "**Aménagements particuliers** : souterrain, tunnel, pont, bretelle, passage à niveau, carrefour aménagé, zone piétonne/péage, chantier."] },
              { niveau: "C", titre: "Conditions atmosphériques et luminosité", texte: "Météo (éblouissant, pluie, neige, brouillard) et luminosité (aube, jour, crépuscule, nuit avec/sans éclairage) peuvent favoriser l'accident ou aggraver ses conséquences." },
            ]},
            { niveau: "II", titre: "Le(s) véhicule(s) impliqué(s)", points: ["**Accident sans collision** : un seul véhicule sans choc (sortie de route, tonneau).", "**Accident avec collision** : contre un obstacle fixe (arbre, glissière, bâtiment...) ou mobile (véhicule, piéton, animal), collision entre 2 véhicules (frontale, arrière, latérale), ou collisions à 3 véhicules et plus (en chaîne ou multiples).", "Chaque véhicule impliqué est identifié par une lettre (A à Z) ; **A = conducteur présumé responsable.**"], enfants: [
              { niveau: "A", titre: "Les éléments d'identification", points: ["Catégorie (rubrique J1 du certificat d'immatriculation), numéro d'immatriculation, date de 1re mise en circulation.", "Nom/adresse du propriétaire, code CNIT ou type mine.", "Si non immatriculé (EDPM, cycle, mini-moto) : genre, marque, modèle, couleur."] },
              { niveau: "B", titre: "Les autres éléments relatifs au véhicule", points: ["Sens de circulation, manœuvre principale effectuée.", "Conformité de l'assurance et du contrôle technique.", "État du véhicule et du chargement (arrimage, pneumatiques, éclairage).", "Point de choc initial pour chaque véhicule.", "Conséquences sur l'état du véhicule et mesures prises (repris par le conducteur ou enlevé par dépanneuse)."] },
            ]},
            { niveau: "III", titre: "Les personnes concernées", enfants: [
              { niveau: "A", titre: "Les usagers", texte: "Conducteur, passager, ou piéton (assimilés : personne conduisant à pied une poussette/à la main un cycle, personne en fauteuil roulant à l'allure du pas, personne sortie de son véhicule).", points: ["Petite identité, état (indemne/blessé/décédé), gravité des dommages, lieu d'hospitalisation.", "Nature du trajet (domicile/travail, domicile/école...).", "Résultat du contrôle alcoolémie et dépistage stupéfiants obligatoires.", "**Pour un conducteur** : responsabilité présumée, permis (n°/validité/catégorie), rétention éventuelle si soupçons d'infraction (téléphone, vitesse, priorités...), infractions commises, équipements de sécurité utilisés.", "**Pour un passager** : place occupée, équipements de sécurité.", "**Pour un piéton** : localisation sur la chaussée, manœuvre au moment du choc, infraction commise."] },
              { niveau: "B", titre: "Les témoins", texte: "Personnes présentes sans être impliquées, pouvant apporter des éléments utiles à la compréhension des faits (vitesse excessive, dépassement dangereux, refus de priorité, téléphone, éclairage défaillant...)." },
            ]},
          ],
        },
        {
          titre: "L'avis à famille",
          definition: "À la suite d'une mission de secours, le gardien de la paix peut être amené à prévenir la famille des personnes secourues. Cette tâche, qui fait partie intégrante de la mission de service public, doit être accomplie avec tact, psychologie et professionnalisme.",
          plan: [
            { niveau: "I", titre: "Les cas nécessitant l'avis à famille", points: ["Personne **décédée** à l'occasion de faits ayant entraîné l'intervention de la police.", "Personne **admise à l'hôpital** pour blessures/malaise, sauf refus d'un majeur.", "**Obligatoire pour un mineur.**"], texte: "Mission incombant d'abord au chef d'intervention/de poste, relevant de toute la chaîne hiérarchique. L'**O.P.J., systématiquement avisé, décide** de l'avis à famille — accidents de circulation, chutes, malaises, accidents du travail..." },
            { niveau: "II", titre: "La réalisation de l'avis", texte: "**L'appel téléphonique** concerne exclusivement les blessures non mortelles. **Le déplacement au domicile** est systématique en cas de décès, et semble opportun pour des blessures graves, notamment d'un enfant." },
            { niveau: "III", titre: "Les précautions élémentaires", points: ["S'assurer de l'identification de la victime.", "Obtenir un maximum de renseignements sur les conditions du décès (sans forcément les évoquer lors de l'avis).", "**Ne pas intervenir seul** : au moins 2 personnes, avec répartition des rôles.", "Entrer si possible au domicile ; à défaut, se placer hors de la vue du public.", "S'assurer au préalable de la présence d'un tiers pouvant accompagner la famille.", "Prévenir d'éventuelles réactions (envisager un soutien médical si nécessaire).", "Annoncer les faits avec pondération, progressivement, en langage clair et simple.", "Rester un moment pour anticiper les réactions (évanouissement, crise de nerfs...).", "**Ne jamais quitter les lieux en laissant la personne seule** — s'assurer de la présence d'un tiers."] },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "L'intervention en matière d'usage de stupéfiants",
      fiches: [
        {
          titre: "L'amende forfaitaire délictuelle en matière d'usage illicite de stupéfiants",
          reference: "Art. L.3421-1 C.S.P. — Art. 495-17 à 495-25, D.45-3 à D.45-21, A.36-14 à A.36-18 C.P.P.",
          definition: "Lorsque la loi le prévoit, l'action publique peut être éteinte par le paiement d'une amende forfaitaire délictuelle (A.F.D.). Lorsque le délit d'usage illicite de stupéfiants (art. L.3421-1 al.1 C.S.P., natinf 180) est constaté, l'A.F.D. peut être mise en œuvre (al.3), par procès-verbal électronique.",
          plan: [
            { niveau: "I", titre: "Champ d'application — l'A.F.D. ne doit PAS être mise en œuvre si", points: ["Le mis en cause est **mineur**.", "Plusieurs infractions simultanées, dont l'une au moins ne peut donner lieu à AFD.", "L'auteur est **dépositaire de l'autorité publique/mission de service public**, ou personnel de transport dont les fonctions mettent en cause la sécurité du transport (que les faits soient en service ou non)."] },
            { niveau: "II", titre: "L'A.F.D. ne peut PAS non plus être mise en œuvre (sous réserve des instructions du parquet local) si", points: ["Plusieurs délits forfaitisables sont constatés.", "Plusieurs types de produits différents sont découverts.", "Des investigations complémentaires sont nécessaires (soupçon de trafic, procédure incidente).", "Le mis en cause **conduit un véhicule** (délit distinct prévu par le code de la route).", "Il **ne peut justifier de son identité** ou ne déclare aucune adresse postale (identité établie par titre sécurisé + filiation complète).", "Il **conteste les faits** ou refuse de renoncer au droit de contester la destruction des stupéfiants saisis.", "Il **ne dispose pas de ses pleines capacités** de compréhension/décision (langue française insuffisante, troubles psychiques, consommation récente).", "Il **ne possède pas de produits stupéfiants** (les seuls aveux ne suffisent pas à une condamnation).", "Il est **notoirement connu** des services pour plusieurs procédures stupéfiants antérieures.", "Il semble nécessiter une **prise en charge sanitaire/sociale** (addiction, désociabilisation).", "Il possède une quantité **supérieure à 50 g de cannabis, 5 g de cocaïne, ou 5 cachets/5 g d'ecstasy** (dérogation exceptionnelle possible par le procureur, ex : rave-party)."] },
            { niveau: "III", titre: "Modalités de constatation", enfants: [
              { titre: "A. Le cadre juridique de constatation", texte: "Renseigné par l'OPJ/APJ dans le PVe. Uniquement en cas de constatation flagrante : soit d'initiative (art. 53 C.P.P., après contrôle d'identité éventuel), soit à la suite d'un contrôle sur réquisitions du procureur (art. 78-2/78-2-2 C.P.P.)." },
              { titre: "B. Le lieu de rédaction du PVe", texte: "Doit se faire **sur les lieux de constatation**. Retour au service exceptionnellement possible pour des considérations d'ordre public (protection des agents), à condition que le mis en cause accepte librement de suivre les policiers." },
              { titre: "C. La description précise des produits", texte: "Champs prévus (nature : cannabis/cocaïne/ecstasy ; type : résine/herbe/poudre ; conditionnement : barrette/sachet) + champ libre (odeur, apparence, objets liés à la consommation)." },
              { titre: "D. Gestion des produits et du matériel saisis", texte: "Saisie et destruction des produits/accessoires (grinder, feuilles, pipe...) selon des conditions fixées avec le procureur. Le consentement du mis en cause à la destruction doit être acté dans le PVe. **Aucun scellé ni échantillonnage.**" },
            ]},
            { niveau: "IV", titre: "Montant de l'amende forfaitaire", reference: "Art. L.3421-1 al.3 C.S.P.", texte: "**A.F. minorée : 150 €. A.F. « ordinaire » : 200 €. A.F. majorée : 450 €.**" },
            { niveau: "V", titre: "Paiement ou contestation", points: ["**Amende minorée** : paiement entre les mains de l'agent, ou sous **15 jours** à compter de l'envoi de l'avis (art. 495-18 al.2 C.P.P.).", "**Paiement ou requête en exonération** : sous **45 jours** après l'envoi de l'avis.", "**Amende majorée** : à défaut de paiement/requête, réclamation possible sous **30 jours**.", "**Modes de paiement** identiques à l'amende forfaitaire contraventionnelle (télépaiement, chèque, virement international).", "**Requête/réclamation** : LRAR ou via antai.fr. Dispense de consignation si récépissé de plainte pour usurpation d'identité (art. 434-23 C.P.)."] },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "L'intervention dans un débit de boissons",
      fiches: [
        {
          titre: "Intervention dans un débit de boissons",
          definition: "L'intervention dans un débit de boissons requiert la plus grande vigilance compte tenu de l'aspect particulier de l'établissement, de la configuration des lieux, du nombre de consommateurs et de leur état d'excitation/ébriété éventuel. Elle est toujours potentiellement dangereuse.",
          plan: [
            { niveau: "I", titre: "Les cas d'intervention", points: ["Contrôle ordonné par la hiérarchie : contrôle d'identité.", "Sur réquisition d'un particulier (consommateur ou non) : différend, tapage.", "Sur réquisition du débitant ou son représentant : différend, bagarre.", "En cas d'infraction : fermeture tardive, tapage, bagarre, ivresse.", "Trouble à l'ordre public : tapage, bagarre.", "Constatation de crimes et délits : interpellation des auteurs.", "Contrôles de police administrative : sécurité/hygiène/salubrité, pièces administratives, réglementation générale."] },
            { niveau: "II", titre: "Principes de base", points: ["Recueillir un maximum d'informations : propriétaire/gérant, personnel, disposition interne (sous-sol, étage, arrière-salle) et externe (arrière-cour, parking), nature de la clientèle.", "Se concerter avant l'action sur le mode d'intervention et la répartition des rôles.", "**Intervention à 3 ou 4 fonctionnaires, jamais seul.**", "Signes conventionnels possibles pour se prévenir mutuellement d'un fait suspect.", "S'équiper préalablement de tous les matériels de protection individuels et collectifs.", "Aviser systématiquement le P.C. radio du lieu et du motif avant toute action.", "**Arrivée discrète**, sans avertisseurs sonores/lumineux ; mémoriser les issues (portes, fenêtres) ; examiner si possible à travers les baies vitrées la disposition des lieux, le nombre et l'ambiance des consommateurs avant d'entrer."] },
          ],
        },
        {
          titre: "Le contrôle des débits de boissons",
          definition: "Le contrôle des établissements recevant du public (débits de boissons, restaurants...) figure parmi les missions des services de police. Les gardiens de la paix doivent bien connaître les règles juridiques et administratives applicables, respecter les règles de sécurité et rester vigilants durant les contrôles.",
          plan: [
            { niveau: "I", titre: "Conditions d'intervention", enfants: [
              { niveau: "A", titre: "Les règles horaires", texte: "Le policier doit respecter les heures d'ouverture/fermeture fixées par arrêtés municipaux/préfectoraux. En dehors, la pénétration relève des règles d'introduction dans un lieu privé.", points: ["La jurisprudence admet l'intervention hors heures légales si : la porte n'est pas verrouillée et l'établissement éclairé (même sans consommateur) ; le débitant fait sortir les personnes au moment de la constatation ; les personnes présentes sont des invités/amis/voisins du débitant.", "Après l'heure de fermeture, le policier peut requérir l'ouverture si les constatations extérieures laissent présumer une infraction en cours.", "**Fermeture tardive** : établissement considéré comme fermé seulement si les portes sont réellement closes ; un rideau baissé à moitié interdisant l'accès normal ne suffit pas à le considérer fermé."] },
              { niveau: "B", titre: "Les conditions de lieu", texte: "Les débits de boissons sont des lieux ouverts au public. La jurisprudence admet aussi l'intervention dans : la cuisine attenante, une salle louée pour une réunion privée, une pièce personnelle de l'exploitant où se trouvent des consommateurs, sa chambre à coucher s'il y a invité des consommateurs. Une terrasse sur la voie publique est soumise à une **autorisation d'occupation temporaire** du maire/préfet, sans porter atteinte à la libre circulation." },
            ]},
            { niveau: "II", titre: "Les contrôles de police administrative", enfants: [
              { niveau: "A", titre: "Le contrôle des pièces administratives", points: ["**Permis d'exploitation** (formation obligatoire, valable 10 ans).", "**Récépissé de déclaration administrative** délivré par la mairie (justifie la licence).", "Extrait du registre du commerce et des sociétés.", "Attestation notariale de propriété/gérance du fonds de commerce."] },
              { niveau: "B", titre: "Le contrôle de la réglementation générale", points: ["Respect des heures d'ouverture/fermeture.", "Protection des mineurs (présence comme employé/client, interdiction de vente d'alcool).", "Publicité obligatoire (étalage de 10 boissons non alcooliques), affichage anti-tabac, affichage des prix.", "Vente des boissons, employés, jeux de hasard (certains autorisés localement, ex : loto).", "Non-respect d'une sanction de fermeture, installation de terrasse.", "Affiche « protection des mineurs et répression de l'ivresse publique ».", "Mise à disposition de dispositifs de dépistage de l'alcoolémie."] },
              { niveau: "C", titre: "Les contrôles de sécurité, hygiène et salubrité", texte: "Prévention incendie (dégagement des issues, éclairage de sécurité, affichage des consignes) et respect du règlement sanitaire départemental (aération, propreté, protection des denrées)." },
            ]},
          ],
        },
      ],
    },
    {
      numero: 6,
      titre: "Les malades mentaux",
      fiches: [
        {
          titre: "Intervenir auprès de personnes ne jouissant pas de toutes leurs capacités mentales",
          definition: "Si la plupart des urgences sont dues à l'alcoolisme, notamment dans les violences intrafamiliales, le gardien de la paix peut aussi se trouver face à des usagers dont le comportement incohérent traduit des difficultés de type psychiatrique.",
          plan: [
            { niveau: "I", titre: "Les caractéristiques générales", texte: "Un malade mental est avant tout quelqu'un qui souffre (angoisse) et en rupture de compréhension ordinaire par rapport à son environnement. Sa perception des faits est soit partiellement décalée, soit complètement distordue, ce qui entraîne des difficultés de communication.", points: ["**Dangerosité** : les malades mentaux les plus dangereux (pour eux-mêmes ou autrui) ne sont pas forcément ceux qui s'agitent/crient le plus — un malade étranger crie souvent pour se faire « mieux comprendre ».", "**Ne pas se fier aux apparences** : une personne apathique n'est pas forcément inoffensive, un silence n'indique pas forcément quelque chose à cacher — l'angoisse peut paralyser ponctuellement l'expression avant de laisser place à un désordre comportemental plus important."] },
            { niveau: "II", titre: "Avant l'intervention", points: ["Se renseigner le plus possible sur les caractéristiques de la personne (tentatives de suicide/agression antérieures) et de son entourage.", "Identifier les **personnes compétentes affectivement** (mère, époux, ami) qui savent « le prendre ».", "Identifier les **personnes compétentes professionnellement** (médecin habituel, spécialiste).", "Ces renseignements facilitent aussi le dialogue en attendant l'intervention des personnes compétentes."] },
            { niveau: "III", titre: "Les conseils pratiques", points: ["**Ne jamais laisser la personne crier seule dans un coin** : lui parler calmement, maintenir le dialogue et un environnement éclairé (silence et obscurité augmentent l'angoisse).", "Rester neutre, courtois, éviter toute ironie et particulièrement toute grivoiserie ou réflexion à connotation sexuelle (risque de perception fantasmatique de viol/insultes).", "**Ne jamais mentir** mais mesurer la vérité à dire (ex : dire qu'on le conduit à l'hôpital, où il se sentira en sécurité, plutôt que d'inventer un mensonge qu'il découvrira vite).", "Ne jamais se moquer ou « bousculer » un malade mental, comme on ne le ferait pas pour une souffrance physique.", "La fermeté reste possible si nécessaire, avec un usage de la force adapté pour éviter tout danger.", "Dédramatiser la situation vis-à-vis du malade et de son entourage, sans perdre de vue la sécurité de tous."] },
          ],
        },
        {
          titre: "L'admission en soins psychiatriques sans consentement",
          definition: "La maladie mentale se caractérise par une perturbation des facultés mentales affectant pensées, sentiments et comportement, au point de rendre la conduite incompréhensible. Les personnes en soins avec leur consentement sont dites en « soins psychiatriques libres » et disposent des mêmes droits que les autres malades. La notion de « soins sans consentement » permet l'accès aux soins de personnes présentant des troubles mais ne pouvant y consentir.",
          plan: [
            { niveau: "I", titre: "Les soins psychiatriques sans consentement", texte: "Offrent une prise en charge en hospitalisation complète ou sous une autre forme (hospitalisation partielle, consultations, soins à domicile), adaptée et proportionnée à l'état du patient.", enfants: [
              { niveau: "A", titre: "Sur demande d'un tiers ou en cas de péril imminent", reference: "Art. L.3212-1 à L.3212-12 C.S.P.", enfants: [
                { niveau: "1", titre: "Sur demande d'un tiers", texte: "Décision du directeur d'un établissement autorisé en psychiatrie, si 2 conditions cumulatives : troubles mentaux rendant le consentement impossible ; état imposant des soins immédiats avec surveillance constante justifiant une hospitalisation complète.", points: ["Demande manuscrite signée par le tiers (famille, tuteur...).", "Accompagnée de **2 certificats médicaux récents** (<15 jours), circonstanciés, rédigés par des médecins différents."] },
                { niveau: "2", titre: "En cas de péril imminent", texte: "Décision du directeur d'établissement si : troubles rendant le consentement impossible ; impossibilité d'obtenir une demande d'un tiers ; péril imminent pour la santé constaté par certificat médical. **Un seul certificat médical** (<15 jours) suffit." },
              ]},
              { niveau: "B", titre: "Sur décision du représentant de l'État", reference: "Art. L.3213-1 à L.3213-11 C.S.P.", texte: "Depuis 2011, décision du **préfet** (et non plus « hospitalisation d'office »).", enfants: [
                { niveau: "1", titre: "Procédure normale (décision directe du préfet)", texte: "Arrêté préfectoral, au vu d'un certificat médical circonstancié (ne pouvant émaner d'un psychiatre de l'établissement d'accueil), si les troubles mentaux compromettent la sûreté des personnes **ou** portent gravement atteinte à l'ordre public." },
                { niveau: "2", titre: "Procédure d'urgence (mesure provisoire du maire ou du commissaire à Paris)", reference: "Art. L.3213-2 C.S.P.", texte: "En cas de danger imminent pour la sûreté des personnes, attesté par un **avis médical** (la « notoriété publique » a été jugée inconstitutionnelle par le Conseil constitutionnel, décision QPC du 06/10/2011), le maire ou le commissaire à Paris arrête toutes mesures provisoires nécessaires. Information transmise sous **24h** au préfet, qui prend un arrêté ; à défaut, les mesures provisoires sont caduques après **48h**." },
              ]},
              { niveau: "C", titre: "Période initiale d'observation et de soins", texte: "**72 heures**, avec examen par un psychiatre et certificats médicaux à 24h puis 72h, suivis d'un avis motivé sur la forme de prise en charge. Si hospitalisation complète, le **juge des libertés et de la détention** est avisé (contrôle avant 15 jours, puis certificat mensuel). L'hospitalisation en psychiatrie ne concerne pas les mineurs de moins de 16 ans (pris en charge en hôpital de médecine générale)." },
            ]},
            { niveau: "II", titre: "Le rôle des services de police", texte: "Prendre en charge le malade mental pour un temps aussi court que possible, sous surveillance permanente et directe, avec le respect impératif des précautions de sécurité.", points: ["Pratiquer une **fouille de sécurité** lors de l'appréhension, retirer tout objet dangereux.", "Si un séjour au commissariat est indispensable : isolement, surveillance constante par plusieurs policiers, **jamais dans les locaux de garde à vue**.", "**Le transport vers l'établissement psychiatrique n'incombe pas à la police** — sauf convention particulière, il revient à l'établissement de destination.", "**Évasion d'un malade** (hospitalisation complète) : inscription au F.P.R. précisant sa dangerosité et le type de réactions à craindre ; cessation de recherches en cas de découverte."] },
          ],
        },
      ],
    },
    {
      numero: 7,
      titre: "L'intervention en présence d'un animal",
      fiches: [
        {
          titre: "Lutte contre la maltraitance animale",
          reference: "Art. 515-14 C. civ. — Art. 521-1 à 522-2 C.P. — Art. L.214-1, R.215-4, L.215-11 C.R.P.M.",
          definition: "Les animaux sont des êtres vivants doués de sensibilité (art. 515-14 C. civ.) et doivent être placés par leur propriétaire dans des conditions compatibles avec les impératifs biologiques de leur espèce. Depuis le 01/10/2022, tout acquéreur d'un animal de compagnie doit signer un certificat d'engagement et de connaissance des besoins de l'espèce. Un référent « maltraitance animale » est désigné dans chaque commissariat (instruction DNPJ n°08-2025 du 16/05/2025).",
          plan: [
            { niveau: "I", titre: "Les atteintes à la vie d'un animal", enfants: [
              { niveau: "A", titre: "Les atteintes volontaires", reference: "Art. 522-1 C.P.", texte: "Donner volontairement la mort, sans nécessité, à un animal domestique/apprivoisé/en captivité, hors activités légales (sauf tradition locale ininterrompue pour courses de taureaux ou combats de coqs). **6 mois - 7 500 €.**" },
              { niveau: "B", titre: "Les atteintes involontaires", reference: "Art. R.653-1 C.P.", texte: "Par maladresse, imprudence, inattention, négligence ou manquement à une obligation de sécurité/prudence. **Contravention de 3e classe.**" },
            ]},
            { niveau: "II", titre: "Les sévices graves ou actes de cruauté", enfants: [
              { niveau: "A", titre: "Définition", reference: "Art. 521-1 C.P.", texte: "**Sévices graves** : mauvais traitements d'une particulière gravité. **Actes de cruauté** : agissements destinés à faire souffrir, actes volontaires à caractère sadique pour le plaisir de causer une souffrance, ou violence particulièrement odieuse exercée par plaisir sadique. Réprimés qu'ils soient commis publiquement ou non.", points: ["Infraction simple : **521-1 al.1 : 3 ans - 45 000 €.**", "Aggravée (détenu par un agent en mission de service public, par son propriétaire/gardien, en présence d'un mineur) : **521-1 al.2/3/5 : 4 ans - 60 000 €.**", "Aggravée (ayant entraîné la mort) : **521-1 al.4 : 5 ans - 75 000 €.**"] },
              { niveau: "B", titre: "Les atteintes sexuelles sur un animal", reference: "Art. 521-1-1 C.P.", texte: "Tout acte de nature sexuelle sur un animal domestique/apprivoisé/en captivité.", points: ["Infraction simple : **521-1-1 al.1 : 3 ans - 45 000 €.**", "Aggravée (par le gardien/propriétaire, en présence d'un mineur, en réunion) : **521-1-1 al.3 : 4 ans - 60 000 €.**", "**Proposition ou sollicitation** d'atteinte sexuelle (art. 521-1-3) : **1 an - 15 000 €.**"] },
              { niveau: "C", titre: "L'abandon d'un animal", reference: "Art. 521-1 al.13 et 15 C.P.", texte: "Délaissement volontaire dans la nature, sans soins, livré à lui-même (hors animaux destinés au repeuplement).", points: ["Infraction simple : **al.13 : 3 ans - 45 000 €.**", "Aggravée (exposant à un risque immédiat/imminent de mort) : **al.15 : 4 ans - 60 000 €.**"] },
              { niveau: "D", titre: "Expérience ou recherche sur des animaux vivants", reference: "Art. 522-2 C.P.", texte: "Sans respecter les prescriptions des art. R.214-87 à R.214-137 C.R.P.M. **3 ans - 45 000 €.**" },
              { titre: "La diffusion d'images (complicité et délit distinct)", reference: "Art. 521-1-2 C.P.", texte: "**Enregistrer volontairement** des images de sévices graves/actes de cruauté/atteintes sexuelles est un **acte de complicité**, puni des mêmes peines (sauf si l'enregistrement contribue à un débat public d'intérêt général ou sert de preuve en justice). **La diffusion sur internet** de ces images est un délit distinct : **2 ans - 30 000 €.**" },
            ]},
            { niveau: "III", titre: "Les mauvais traitements envers un animal", texte: "L'OIE (Organisation mondiale de la santé animale) définit 5 besoins fondamentaux dont le non-respect caractérise la maltraitance :", points: ["Absence de faim, de soif, de malnutrition (accès à l'eau/nourriture appropriée).", "Absence de peur et de détresse (dispositifs d'attache, dimension des cages/enclos).", "Absence de stress physique/thermique (abri, taille des enclos, surpopulation, propreté, lumière du jour).", "Absence de douleurs, lésions, maladies (coups, mutilations, maigreur, manque de soin).", "Liberté d'expression d'un comportement normal de l'espèce (stéréotypies locomotrices ou orales en cas d'inadaptation)."], enfants: [
              { niveau: "A", titre: "Les cas de mauvais traitements (contravention de 4e classe)", reference: "Art. R.654-1, R.215-4 C.R.P.M.", points: ["Exercer volontairement, sans nécessité, des mauvais traitements (autres que sévices graves/actes de cruauté).", "Enregistrer volontairement des images de mauvais traitements (complicité ; la diffusion sur internet est un **délit**).", "Priver l'animal de nourriture/abreuvement nécessaires.", "Le laisser sans soins en cas de maladie/blessure.", "Le placer dans un habitat/environnement inadapté (exiguïté, climat, matériel).", "Utiliser des dispositifs d'attache/clôture/cage inadaptés, sauf nécessité absolue.", "Garder en plein air bovins/ovins/caprins/équidés sans protection climatique ou de contention suffisante.", "Pratiquer le tir aux pigeons vivants (art. R.214-35 C.R.P.M.).", "Utiliser un aiguillon (pointe métallique/lame) pour exciter ou déplacer les animaux."] },
              { niveau: "B", titre: "Les mauvais traitements par un professionnel", reference: "Art. L.215-11 C.R.P.M.", texte: "Exercer ou laisser exercer, sans nécessité, des mauvais traitements — vise les exploitants d'établissements de vente/toilettage/transit/garde/éducation/dressage/sécurité privée/fourrière/refuge/abattage/transport/élevage. Vise aussi les manèges à poneys interdits (art. L.214-10-1 C.R.P.M., dispositif rotatif d'attache fixe)." },
            ]},
            { niveau: "IV", titre: "Obligations des détenteurs de chiens, chats et furets", enfants: [
              { niveau: "A", titre: "Acquisition à titre onéreux ou gratuit", texte: "Signature d'un certificat d'engagement (délivré par titulaire ACACED ou équivalent), cession possible seulement **7 jours** après. À la remise : certificat de cession, attestation d'identification, certificat vétérinaire (chiens/chats)." },
              { niveau: "B", titre: "Identification et enregistrement", texte: "Obligatoire aux frais du détenteur, avant cession ou pour les chiens >4 mois, furets >7 mois (depuis le 01/11/2021), chats >7 mois.", enfants: [
                { niveau: "1", titre: "Procédure", texte: "Marquage (tatouage ou puce électronique) + enregistrement au fichier national + établissement de la carte d'identification." },
                { niveau: "2", titre: "Carte d'identification", texte: "Certificat provisoire puis carte définitive sous 8 jours (identification, coordonnées du détenteur, description de l'animal). En cas de perte : version dématérialisée ou réimpression par un vétérinaire." },
              ]},
            ]},
          ],
        },
        {
          titre: "Protocole sanitaire en cas de morsure",
          definition: "Tout animal ayant mordu ou griffé une personne doit être soumis à un protocole sanitaire pour vérifier qu'il n'est pas porteur du virus de la rage. Le suivi est enregistré auprès du gestionnaire du fichier national d'identification.",
          plan: [
            { niveau: "I", titre: "Conduite à tenir envers l'animal mordeur", enfants: [
              { niveau: "A", titre: "L'animal est connu", reference: "Art. L.223-10, R.223-35 C.R.P.M.", texte: "Le propriétaire, à ses frais, doit le soumettre à la surveillance d'un vétérinaire sanitaire, même si non suspect de rage et même vacciné (surveillance **15 jours**). **3 visites obligatoires** au même vétérinaire :", points: ["1re visite dans les **24h** suivant la morsure → certificat provisoire.", "2e visite au plus tard **7 jours** après → second certificat provisoire.", "3e visite **15 jours** après → certificat définitif d'absence de symptômes.", "Les certificats sont établis en **5 exemplaires** : 3 au propriétaire (pour la personne mordue et le maire), 1 au directeur des services vétérinaires, 1 conservé 1 an par le vétérinaire.", "**Interdiction pendant la surveillance** : se dessaisir de l'animal, le vacciner, l'abattre sans autorisation du préfet."] },
              { niveau: "B", titre: "L'animal est inconnu ou en fuite", texte: "La personne mordue est adressée par le médecin à un **centre antirabique**, qui décide de l'attitude à adopter selon les risques de contamination." },
              { niveau: "C", titre: "L'animal est mort", reference: "Art. R.223-36 C.R.P.M.", texte: "La tête ou le cadavre est adressé à un organisme/laboratoire agréé, pour vérifier l'absence du virus de la rage. La vaccination de la personne mordue est débutée en attendant les résultats, puis arrêtée si la contamination est écartée." },
            ]},
          ],
        },
        {
          titre: "Les chiens d'attaque, de garde ou de défense",
          reference: "Art. L.211-12 et suivants du Code rural et de la pêche maritime",
          definition: "Le code rural classe certains chiens considérés comme les plus dangereux en 2 catégories : 1re catégorie (chiens d'attaque) et 2e catégorie (chiens de garde ou de défense). Les détenteurs sont soumis à des règles particulières (attestation d'aptitude, permis de détention, accès à certains lieux).",
          plan: [
            { niveau: "I", titre: "Les catégories de chiens dangereux", enfants: [
              { niveau: "A", titre: "1re catégorie (chiens d'attaque)", texte: "Chiens issus de croisements incontrôlés, sans papiers du Livre des origines français (LOF), assimilables par leurs caractéristiques morphologiques aux races Staffordshire Terrier/American Staffordshire Terrier (« pit-bull »), Mastiff (« boerbull »), Tosa-Inu." },
              { niveau: "B", titre: "2e catégorie (chiens de garde ou de défense)", texte: "Chiens de races reconnues par la Société Centrale Canine, avec papiers du LOF (certificat de naissance + pedigree) : Staffordshire Terrier/American Staffordshire Terrier, Rottweiler (classé systématiquement en 2e catégorie même sans papiers), Tosa-Inu.", points: ["Un vétérinaire agréé peut réaliser une **diagnose** pour déterminer la catégorie.", "Pour les chiens nés à l'étranger : document généalogique reconnu par la F.C.I."] },
            ]},
            { niveau: "II", titre: "Obligations des personnes autorisées à détenir un chien de 1re ou 2e catégorie", enfants: [
              { niveau: "A", titre: "Personnes ne pouvant pas détenir ces chiens", reference: "Art. L.211-13 C.R.P.M.", points: ["Personnes de moins de 18 ans.", "Majeurs en tutelle, sauf autorisation du juge des tutelles.", "Personnes condamnées pour crime ou à une peine d'emprisonnement (bulletin n°2 du casier judiciaire).", "Personnes s'étant vu retirer la propriété/garde d'un chien par le maire ou le préfet de police (Paris)."] },
              { niveau: "B", titre: "Obligations du propriétaire ou détenteur", texte: "Permis de détention délivré par le maire, sur présentation de :", points: ["Identification (tatouage/puce).", "Certificat de vaccination antirabique valide.", "Attestation d'assurance responsabilité civile.", "Certificat vétérinaire de stérilisation (1re catégorie).", "**Attestation d'aptitude** (formation théorique/pratique, frais à charge du propriétaire).", "**Évaluation comportementale** obligatoire par un vétérinaire agréé, entre 8 mois et 1 an (permis provisoire avant 8 mois, expirant au 1er anniversaire).", "Permis, assurance et vaccination doivent pouvoir être présentés aux forces de l'ordre à tout moment (art. R.215-2 C.R.P.M.). En cas de défaut, mise en demeure d'1 mois par le maire/préfet ; à défaut de régularisation, placement en dépôt et euthanasie possible sans nouvelle mise en demeure (art. L.211-14 C.R.P.M.)."] },
              { niveau: "C", titre: "Détenteur à titre temporaire", texte: "Doit pouvoir présenter l'original/copie du permis de détention (ou provisoire) au nom du propriétaire, à toute réquisition des forces de l'ordre." },
              { niveau: "D", titre: "Interdiction du commerce des chiens de 1re catégorie", texte: "Acquisition, cession (sauf fourrière/association), importation et introduction sur le territoire sont **interdites**." },
            ]},
            { niveau: "III", titre: "Règles relatives à la présence de chiens de 1re ou 2e catégorie dans certains lieux", reference: "Art. L.211-16 C.R.P.M.", texte: "Les chiens de 1re catégorie sont notamment interdits, même muselés et tenus en laisse, dans les transports en commun et divers lieux publics — se référer au fascicule pour le détail complet des lieux visés par l'article." },
          ],
        },
      ],
    },
    {
      numero: 8,
      titre: "Les autres interventions",
      fiches: [
        {
          titre: "Intervention sur les lieux d'un sinistre",
          definition: "L'intervention de police sur les lieux d'un sinistre se situe en renfort des services spécialisés, mais répond aussi à des missions précises. En présence d'un incendie ou d'une explosion due au gaz, les gardiens de la paix interviennent pour porter secours et effectuer les premières constatations, et rendre compte à la hiérarchie pour faciliter l'enquête et renseigner les familles.",
          plan: [
            { niveau: "I", titre: "Analyser la situation", texte: "Dès l'arrivée, donner un premier bilan (blessés, tués, ampleur) pour permettre au C.I.C. d'évaluer les moyens nécessaires et d'aviser les secours — messages radio clairs et concis. Signaler tout bruit d'explosion, fumée, nuage coloré, liquide répandu, bruits anormaux, fuite de gaz ou odeurs particulières. Rendre compte immédiatement à l'arrivée d'un gradé/officier/commissaire." },
            { niveau: "II", titre: "Secourir les victimes", texte: "En attendant les personnels spécialisés (pompiers, SAMU), prodiguer les premiers soins. **Aucune conduite à l'hôpital ne doit être effectuée d'initiative par les services de police.** Rendre compte au C.I.C. de la destination des blessés et informer des besoins de relogement éventuels." },
            { niveau: "III", titre: "Mettre en place un périmètre de sécurité", texte: "Établir un périmètre selon la configuration des lieux, en anticipant les risques d'extension du sinistre, avec des zones réservées au stationnement des secours.", points: ["En cas de fuite de gaz/vapeurs inflammables : **aucun appareil de transmission** dans le périmètre (radio ou téléphone mobile, même éteint).", "Éloigner ou arrêter toute source d'étincelles/chaleur — interdiction de faire fonctionner des véhicules automobiles.", "Assurer/dévier la circulation, faire déplacer les véhicules en stationnement."] },
            { niveau: "IV", titre: "Préserver les traces et indices", texte: "Conserver les lieux en l'état pour l'enquête judiciaire. Seuls les services de secours aux personnes peuvent approcher avant l'identité judiciaire — tous les mouvements de personnel doivent être dirigés et contrôlés." },
            { niveau: "V", titre: "Effectuer les constatations", points: ["Localisation du/des foyer(s) et description (couleur des fumées/flammes, odeurs, hauteur/rapidité de propagation).", "Recherche de supports/matières inflammables et indices de mise à feu intentionnelle (allumettes, liquides inflammables, bouteilles de gaz).", "État des lieux avant extension (accès ouverts/fermés, traces d'effraction, mise en scène, sabotage des installations de détection).", "Modifications apportées par les sapeurs-pompiers.", "Personnes présentes, en particulier comportements inhabituels du public (agitation, fascination).", "Résumé des témoignages (identité, adresse, qualité, précisions, valeur du témoignage).", "De retour au service, rédaction d'un PV de saisine-constatations, même si des constatations plus détaillées seront ensuite rédigées par l'O.P.J. saisi de l'enquête."] },
          ],
        },
        {
          titre: "Intervention sur une alarme dans un établissement à caractère financier ou commercial",
          definition: "Les interventions dans les établissements à caractère financier ou commercial doivent être abordées avec la plus grande prudence, selon des règles strictes pour éviter tout risque inutile, tant pour les policiers que pour les personnes.",
          plan: [
            { niveau: "I", titre: "La procédure d'alarme", points: ["Procéder à un **contre-appel téléphonique** (n'est pas une garantie totale).", "Dépêcher un équipage en tenue, armé et équipé, informé du résultat de la vérification avant son arrivée."] , enfants: [
              { titre: "Les conditions d'approche", points: ["Arriver discrètement, ne pas stationner devant l'établissement, jamais d'avertisseurs sonores/lumineux.", "Observer de l'extérieur entrées/sorties, comportement de la clientèle/du personnel, ambiance générale.", "Au moindre doute : aviser le C.I.C., éviter d'être repéré, position de protection/observation/attente, écarter discrètement passants et curieux.", "**La pénétration dans les locaux n'a lieu que sur ordre du C.I.C.**, une fois la certitude acquise que tout risque est écarté.", "Les vérifications administratives du compteur (alarme injustifiée) ne sont pas urgentes.", "**Toute intervention sur alarme est une mission à haut risque**, quel que soit le nombre de déclenchements intempestifs antérieurs."] },
            ]},
          ],
        },
        {
          titre: "Les principes de levée de doute lors d'agressions armées",
          plan: [
            { niveau: "I", titre: "L'intervention lors d'une agression armée suspectée ou confirmée", enfants: [
              { titre: "Ce qu'il ne faut PAS faire", points: ["Passer devant l'établissement avec un véhicule sérigraphié ou en uniforme dans un véhicule banalisé.", "Effectuer une approche avec avertisseurs sonores/lumineux.", "Traverser la rue dans l'alignement de l'établissement (guetteur probable).", "Tenter de pénétrer dans l'établissement, chercher à bloquer les agresseurs ou provoquer un affrontement.", "Faire courir des risques démesurés aux tiers/policiers.", "**Tirer des coups de feu d'intimidation** — toujours inefficaces, dangereux, susceptibles d'être mal interprétés."] },
              { titre: "Ce qu'il est préconisé de faire", points: ["S'équiper des matériels de protection individuels et collectifs.", "Agir selon les instructions précises du C.I.C., en écoute permanente.", "Approche discrète, du même côté que l'établissement, dans le sens de la circulation.", "Garer le véhicule dans une zone masquée, moteur en fonctionnement, conducteur au poste.", "Mettre en place un dispositif d'observation/protection/intervention.", "Envoyer discrètement un observateur repérer un éventuel guetteur, rendre compte immédiatement au C.I.C.", "Observer entrées/sorties, comportement de la clientèle, allées et venues.", "Si l'agression est confirmée : interdire toute approche aux passants/curieux.", "En cas de fuite des agresseurs : « photographier » sans intervenir (nombre, signalement, attitude, direction, véhicules, armement visible), informer en continu le C.I.C.", "Intervention sur place seulement sur ordre de l'autorité supérieure, une fois les conditions de sûreté réunies (tactique, moment, effectifs, moyens, unités spécialisées).", "Définir le rôle de chacun avant toute intervention, respecter les principes de progression/pénétration/interpellation.", "Rendre compte au C.I.C. au fur et à mesure de l'évolution."] },
            ]},
            { niveau: "II", titre: "L'arrivée fortuite d'une patrouille sur les lieux d'une agression", texte: "Après avoir pris toutes les précautions de sécurité, rendre compte en situant exactement les faits, observer les malfaiteurs et leurs moyens sans éveiller leur attention, communiquer rapidement et clairement au C.I.C. qui apprécie la situation et achemine des renforts.", points: ["Instructions possibles : interception à un endroit choisi, ou report de l'interpellation en cas d'otages (suivre pour identifier véhicules/complices/repaires).", "**Si l'intervention est inévitable** (policiers repérés ou départ des malfaiteurs) : utiliser l'effet de surprise, manifester la qualité de policier (brassard pour les civils), sommer de se rendre.", "Le sang-froid, la détermination et l'organisation rigoureuse impressionnent davantage les malfaiteurs que des coups de feu d'intimidation inefficaces.", "Intervention dans le cadre juridique de la **légitime défense**, sans risques inconsidérés pour les tiers."] },
            { niveau: "III", titre: "L'alerte par des témoins ou la victime", texte: "Recueillir rapidement le maximum de renseignements et les coordonnées du correspondant. Même sans certitude, considérer la probabilité d'une agression en cours. Le manque de précision (nombre de malfaiteurs, moyens, complices) doit inciter à une prudence accrue — la victime/le témoin ne peut tout voir/savoir/entendre, et ses propos peuvent être influencés par l'émotion, la peur ou le chantage. Appliquer les principes de base en gardant à l'esprit que les renseignements ne sont pas forcément complets." },
            { niveau: "IV", titre: "L'alerte par télésurveillance", texte: "La télésurveillance à distance offre une fiabilité supérieure au système filaire, avec une possible « levée de doute » par écoute/vidéo effectuée par la centrale de réception avant d'alerter la police. Le contrôle de la réalité de l'alarme par contre-appel à la centrale est nécessaire, mais les indications de la centrale suffisent à mettre en action les services même sans déclenchement de l'alarme filaire.", points: ["La plus grande prudence s'impose, dispositif comparable à celui d'une alerte par témoin/victime.", "Mesures préparatoires/conservatoires possibles en parallèle de l'avis aux services spécialisés.", "Dispositif de quadrillage/bouclage conforme à la note PN/CAB n°0273 du 09/02/1995 (prises d'otages)."] },
            { titre: "Premières mesures des premiers intervenants", points: ["Écarter toute personne de la zone dangereuse.", "Recueillir les premiers renseignements (nombre d'auteurs, personnalité...).", "S'organiser selon l'arrivée progressive des renforts.", "Garder son sang-froid.", "**Ne jamais intervenir « à chaud » et physiquement** — action réservée aux services spécialisés (RAID...). Ne pas interpeller sur l'instant n'est pas un échec : les renseignements fournis permettent souvent une interpellation dans de meilleures conditions.", "Informer immédiatement le C.I.C. dès les premières informations obtenues."] },
          ],
        },
        {
          titre: "Intervention suite à la violation par le porteur d'un bracelet anti-rapprochement — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source consacre une fiche à la conduite à tenir en cas de violation, par le porteur d'un bracelet anti-rapprochement, d'une mesure d'interdiction de se rapprocher de la personne protégée. Cette section du fascicule original se présente sous forme d'un schéma/infographie dont le contenu textuel n'a pas pu être extrait de façon exploitable pour cette fiche. Se référer au fascicule original (pages 99-100) pour le détail de la procédure applicable." },
          ],
        },
        {
          titre: "Le plan Vigipirate",
          definition: "Le plan Vigipirate est un plan gouvernemental relevant du Premier ministre, outil central de lutte contre le terrorisme. Son dispositif permanent de vigilance, de prévention et de protection associe tous les acteurs du pays (collectivités, opérateurs, citoyens). Alimenté par les services de renseignement, il repose sur un socle permanent couvrant tous les grands domaines d'activité (transports, santé, énergie, alimentation...) ; des mesures additionnelles adaptatives sont activées en cas d'évolution de la menace.",
          plan: [
            { niveau: "I", titre: "Principes et objectifs", enfants: [
              { titre: "Les 3 piliers", points: ["**Vigilance** : connaissance de la menace terroriste et juste prise en compte pour ajuster comportements et mesures de protection.", "**Prévention** : sensibilisation des agents, opérateurs et citoyens ; connaissance du dispositif national ; préparation des moyens de réponse.", "**Protection** : large éventail de mesures adaptables en permanence, réduisant les vulnérabilités sans contraintes disproportionnées."] },
              { titre: "Les 3 démarches de mise en œuvre", points: ["Évaluer la menace terroriste en France et envers les intérêts français à l'étranger.", "Connaître les vulnérabilités des principales cibles potentielles pour les réduire.", "Adapter la posture Vigipirate en déterminant un dispositif répondant au niveau de risque."] },
              { titre: "Les 3 objectifs", points: ["Développer une culture de la sécurité au sein de la société.", "Créer des niveaux mieux adaptés à la menace.", "Mettre en œuvre de nouvelles mesures découlant des évolutions législatives."] },
            ]},
            { niveau: "II", titre: "Les acteurs de la sécurité nationale", points: ["**L'État** : le Premier ministre décide la mise en œuvre, le ministre de l'Intérieur veille à l'exécution opérationnelle, chaque ministre met en œuvre les mesures de son domaine ; localement, les préfets de département (sous coordination des préfets de zone) veillent à l'information et à la cohérence.", "**Les collectivités territoriales** : protection de leurs installations/infrastructures/réseaux, continuité des services publics, protection de leurs agents, sécurité des rassemblements qu'elles organisent/accueillent.", "**Les entreprises** : veillent à leur propre sécurité et à celle des personnes accueillies.", "**Les citoyens** : contribuent par un comportement responsable à la vigilance, la prévention et la protection collective.", "**Les acteurs à l'étranger** : la sécurité des ressortissants français relève d'abord de l'État où ils se trouvent ; tout opérateur/entreprise doit assurer la sécurité de ses employés."] },
            { niveau: "III", titre: "Les 3 niveaux d'alerte", texte: "Matérialisés par un logo visible dans l'espace public :", points: ["**Vigilance** : niveau socle, pouvant être renforcé temporairement/géographiquement/sectoriellement face à une menace particulière ou une vulnérabilité ponctuelle.", "**Sécurité renforcée – Risque attentat** : pour faire face à un niveau élevé de la menace terroriste.", "**Urgence attentat** : activé après un ou plusieurs attentats, ou en cas de menace imminente caractérisée."] },
          ],
        },
      ],
    },
  ],
};


const DOC_PI_INITIAL = {
  titre: "Le policier en intervention (socle initial)",
  sections: [
    {
      numero: 1,
      titre: "La prise de service",
      fiches: [
        {
          titre: "La prise de service : l'appel",
          definition: "Afin d'assurer la continuité du service, les gardiens de la paix et les policiers adjoints effectuent souvent leur mission par cycle de travail (« roulement »), ce qui oblige à prévoir un dispositif d'information de tout le personnel. Ceci se réalise à un moment privilégié : l'appel.",
          plan: [
            { titre: "Principe", texte: "Effectué à la prise de service par le chef de section/brigade, l'appel constitue le moment favorable pour la circulation d'information au sein du service et la prise des ordres des autorités supérieures. Le policier doit se présenter à l'heure prévue en tenue d'uniforme (s'il est affecté dans un corps en tenue), muni des équipements réglementaires." },
            { titre: "Le rôle du chef d'unité à l'occasion de l'appel", points: ["Procède à l'appel nominal.", "Effectue une rapide inspection et fait rectifier les détails de la tenue.", "S'assure que tous sont porteurs de leur arme, gilet pare-balles et équipements réglementaires.", "Donne lecture des ordres/instructions/télégrammes reçus depuis la dernière prise de service, fait prendre en note les consignes particulières (recherches, fiches d'intervention).", "Indique à chacun le service à effectuer durant la vacation (et les suivantes le cas échéant), rappelle les consignes.", "Prend en compte les demandes (congés, repos, candidatures) et recueille les informations utiles au service."] },
          ],
        },
        {
          titre: "Les principaux registres du poste",
          plan: [
            { niveau: "I", titre: "La main courante", texte: "Livre journal tenu dans tout commissariat/poste de police, sur lequel les agents de tous grades relatent **succinctement** leurs diligences ainsi que les faits, plaintes et démarches qui en sont à l'origine." },
            { niveau: "II", titre: "Le registre des personnes gardées à vue", reference: "Art. 64 C.P.P.", texte: "Tenu par le chef de poste (ou des policiers dédiés si les geôles sont importantes) — **à ne pas confondre** avec le registre à disposition de l'O.P.J. dans son service. Recense identité, date/heure de la mesure, repas, fouilles, entretiens, déplacements..." },
            { niveau: "III", titre: "Le registre d'écrou", texte: "Concerne les individus en état d'ivresse :", points: ["Arrêtés en ivresse publique et manifeste.", "Auteurs de conduite en état d'ivresse.", "Arrêtés pour un autre délit et gardés à vue, mais dont les droits seront notifiés après complet dégrisement."] },
            { niveau: "IV", titre: "Le registre des objets trouvés", texte: "Lorsqu'une personne remet un objet trouvé, un inventaire détaillé est effectué en sa présence ; elle signe ensuite le registre. Dans certaines villes, cette charge peut incomber au personnel de mairie." },
            { niveau: "V", titre: "Le registre de l'armement collectif", texte: "Les armes collectives sont conservées à l'armurerie, mises à disposition à titre provisoire (gardes statiques, patrouilles, maintien de l'ordre) puis restituées. Le chef de poste doit pouvoir préciser à tout moment le nombre d'armes en service et leur affectation exacte. Toujours placées sous la responsabilité d'un fonctionnaire ; mouvements enregistrés par détenteurs dépositaires et usagers." },
            { niveau: "VI", titre: "Le registre d'ordre", texte: "Consigne les directives données par le chef de service au personnel des unités de voie publique (notes de service, télégrammes...)." },
          ],
        },
        {
          titre: "Les applications « main courante » et « déclaration d'usagers »",
          definition: "La main courante remplit plusieurs fonctions : gestion chronologique des événements, gestion des emplois et activités du personnel, diffusion et partage d'information en police judiciaire. La réception des déclarations d'usagers s'effectue sur une application dédiée.",
          plan: [
            { niveau: "I", titre: "La gestion chronologique des événements", texte: "Saisie de tous les événements traités (d'initiative ou sur réquisition) par tous les services de sécurité publique et unités de renfort (CRS, EGM, polices municipales). Chaque intervention fait l'objet d'une fiche complète.", points: ["Heure de saisine, heure d'arrivée sur les lieux/d'intervention.", "Équipage intervenant (composition du véhicule).", "Nature des faits et secteur (découpage en secteurs, quartiers sensibles).", "Identité des personnes concernées.", "Le « film » constitué par l'ensemble des événements peut être consulté par les chefs de service/d'unité, offrant une « grille de lecture » des interventions dans le temps et l'espace."] },
            { niveau: "II", titre: "La gestion des emplois", texte: "Saisie de l'ensemble des heures de travail de tous les fonctionnaires, sans distinction de corps/service, avec transmission des informations à l'échelon central de chaque direction." },
            { niveau: "III", titre: "La réception des déclarations d'usagers", texte: "L'application « déclaration d'usagers » reçoit les doléances **sans caractère pénal** (abandon de domicile conjugal, conflits de voisinage, différend locatif). Une victime ne souhaitant pas porter plainte peut aussi faire une déclaration pour une infraction peu importante à faible préjudice. Certaines déclarations peuvent donner lieu à des interventions, voire des verbalisations (ex : rondes suite à nuisances sonores)." },
          ],
        },
        {
          titre: "Les mesures de sécurité — La fouille intégrale",
          plan: [
            { niveau: "I", titre: "Les mesures de sécurité", enfants: [
              { niveau: "A", titre: "La palpation de sécurité", texte: "Mesure **administrative** visant la sécurité des policiers, de la personne contrôlée/interpellée, et du public. Détecte sur la personne ou ses accessoires tout objet dangereux. Guidée par la **nécessité et la proportionnalité**, mise en œuvre avec discernement, dans le respect de la dignité.", points: ["En flagrant délit : le policier peut palper immédiatement les individus interpellés et leur ôter armes/objets dangereux.", "Lors de la surveillance de personnes interpellées/retenues, à chaque déplacement ou interruption de surveillance : palpation pour s'assurer de l'absence d'objet dangereux."] },
              { niveau: "B", titre: "La fouille de sécurité", texte: "Mesure **administrative** réalisée sur une personne retenue (garde à vue, IPM, mandat de justice), juste avant son placement en local de rétention, motivée par des circonstances particulières :", points: ["Conditions de l'interpellation (tentative de fuite, violences).", "Nature et gravité des faits reprochés.", "Personnalité et comportement de l'intéressé (antécédents, âge, état de santé apparent, agressivité, objets dangereux trouvés lors de la palpation, signes de consommation d'alcool/stupéfiants).", "**Le déshabillage complet est interdit** — possible jusqu'aux sous-vêtements ou l'ultime couche de vêtements (accessoires vestimentaires, soutien-gorge si son port peut constituer un danger). Tout déshabillage doit être mentionné dans le registre administratif avec ses raisons. Effectuée par un policier du **même sexe** que la personne. **Nota transgenres** : peuvent demander que l'opération soit réalisée par un homme ou une femme — la DGPN préconise d'en tenir compte dans la mesure du possible."] },
            ]},
            { niveau: "II", titre: "La fouille intégrale", reference: "Art. 63-7 C.P.P.", texte: "**Moyen de recherche de la preuve, et non une mesure de sécurité.** N'est possible que si la palpation ou les moyens de détection électronique ne peuvent être réalisés — recherche d'objets utiles à la manifestation de la vérité ou dont la détention constitue une infraction. Décidée par un O.P.J. pour les nécessités de l'enquête.", points: ["**En flagrant délit** : réalisée par un O.P.J. sur une personne du même sexe ; l'A.P.J. peut le seconder sur instructions (art. 20 C.P.P., D.13 C.P.P.).", "**En enquête préliminaire** : assimilée à une perquisition, effectuée par un O.P.J. ou un A.P.J. sous son contrôle, avec l'**assentiment exprès et manuscrit** du mis en cause.", "Implique le retrait de tous les vêtements avec mise à nu, dans un **local fermé**, par une personne du même sexe."] },
          ],
        },
        {
          titre: "La gestion humaine et matérielle de la garde à vue",
          definition: "Les gardiens de la paix, assistés des policiers adjoints, ont la charge des mesures de surveillance et de sûreté des personnes en garde à vue, ainsi que de l'alimentation, du repos et de l'hygiène. La garde à vue doit s'exécuter dans des conditions assurant le respect de la dignité de la personne.",
          plan: [
            { niveau: "I", titre: "Les responsables du déroulement de la mesure", texte: "Principe de double responsabilité :", enfants: [
              { titre: "L'O.P.J., décideur de la mesure", texte: "Responsable de son accomplissement juridique. Renseigne le registre spécial de garde à vue. Rédige à l'attention du gradé/officier de garde à vue un billet (identité, motif, cadre d'enquête, consignes particulières : attitude agressive, intentions de suicide/évasion)." },
              { titre: "L'officier ou le gradé de garde à vue", texte: "En charge du suivi administratif de l'ensemble des personnes en GAV, en liaison avec les O.P.J. ; contrôle quotidiennement les conditions matérielles (sécurité, dignité)." },
            ]},
            { niveau: "II", titre: "La prise en charge des personnes gardées à vue", reference: "Art. R.434-17 C.S.I.", texte: "Le policier doit être attentif à l'état physique/psychologique de la personne et préserver sa vie, sa santé et sa dignité.", enfants: [
              { niveau: "A", titre: "Les règles administratives", enfants: [
                { titre: "1. Le billet d'ordre", texte: "Document remis par l'O.P.J., à conserver à disposition des policiers en charge de la surveillance." },
                { titre: "2. Le registre des personnes gardées à vue", texte: "Doit mentionner : informations de l'ordre de garde à vue, éventuelle fouille de sécurité avec déshabillage (et ses raisons), objets provisoirement soustraits, et tous les événements/horaires (visite avocat/médecin, sortie audition/perquisition, repas...)." },
              ]},
              { niveau: "B", titre: "Les conditions matérielles", enfants: [
                { titre: "1. L'alimentation", texte: "Repas chauds aux heures habituelles (sauf exceptions circonstancielles), menus adaptés aux principes religieux dont la personne fait état." },
                { titre: "2. L'hygiène", texte: "Cellules maintenues propres, disposant des éléments d'hygiène nécessaires ; locaux permettant le repos auquel le gardé à vue peut prétendre." },
                { titre: "3. Mise à disposition d'effets personnels durant l'audition", reference: "Art. 63-6 C.P.P.", texte: "Le gardé à vue peut disposer d'objets nécessaires au respect de sa dignité (lunettes, appareil auditif), pour s'assurer qu'il entend/comprend/signe en connaissance de cause — retirés à l'issue de chaque acte, avec vigilance sur les retraits/restitutions successifs." },
              ]},
              { niveau: "C", titre: "Les mesures de sécurité", texte: "S'assurer de l'absence d'objet dangereux. **En aucun cas fouille intégrale** — seules les mesures strictement nécessaires (palpation, retrait d'objets/effets dangereux comme lacets/ceinture/écharpe, fouille de sécurité)." },
              { niveau: "D", titre: "La surveillance", texte: "Empêcher toute évasion — risques accrus lors des entrées/sorties (cellule, toilettes), pose/retrait des menottes, déplacements (passages devant issues), et à chaque prise en charge.", enfants: [
                { titre: "1. La surveillance dans les cellules", enfants: [
                  { titre: "Généralités", texte: "Individus en mauvaise santé/émotifs peuvent mal supporter la détention — rendre compte de tout signe inquiétant. Malaise/crise d'épilepsie : appel immédiat pompiers/SAMU. **Aucune initiative seul** (simulation possible à des fins d'évasion). Attention particulière aux mineurs (détention dans un local différent des adultes). Tout incident : avis au chef de poste/gradé GAV/OPJ. Dégradations dangereuses signalées pour mesures nécessaires." },
                  { titre: "Le placement sous vidéosurveillance", reference: "Art. L.256-1 à L.256-5 C.S.I.", texte: "Complète, sans s'y substituer, la surveillance humaine — contrôle en temps réel, enregistrement des séquences (sans le son), le simple renvoi d'images sans enregistrement est proscrit. S'applique aux GAV et retenues douanières.", points: ["Décidé par le chef de service responsable des lieux (ou son représentant), en lien avec l'O.P.J., motivé par des raisons sérieuses de risque suicidaire/agression/évasion.", "Durée limitée au strict nécessaire, **maximum 24h**, renouvelable par périodes de 24h jusqu'à la fin de la garde à vue.", "Notification à la personne (par le chef de service ou, à défaut, l'OPJ/APJ/assistant d'enquête) : droit de demander l'arrêt de la mesure à l'autorité judiciaire ; droit sur la conservation des enregistrements ; droits informatique et libertés (accès, rectification, effacement, limitation — hors opposition).", "Autorité judiciaire informée sans délai ; représentants légaux du mineur/tuteur/curateur et avocat informés sans délai (sauf report autorisé par le magistrat).", "Mesure administrative, décorrélée de la procédure judiciaire — notification et avis consignés dans un formulaire administratif spécifique, non intégrés à la procédure."] },
                ]},
                { titre: "2. La surveillance pendant les déplacements", points: ["Palpation de sécurité préconisée entre chaque mouvement (audition, entretien, examen médical...).", "**Menottage toujours dans le dos** si nécessaire (chaînette côté main gauche pour un droitier, inversement pour un gaucher).", "Faire marcher l'interpellé du côté opposé aux fenêtres, éviter les points hauts dominant un vide.", "Dans les cages d'escalier : progression côté mur, pas côté rampe.", "Éviter, si possible, la traversée de locaux/couloirs où se trouvent témoins, complices ou victimes."] },
              ]},
            ]},
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "La patrouille",
      fiches: [
        {
          titre: "La patrouille",
          definition: "La patrouille est l'activité la plus fréquente et l'une des plus importantes des gardiens de la paix assistés des policiers adjoints. Destinée à la surveillance générale de la voie publique, au secours des personnes, au maintien de l'ordre et à la tranquillité/salubrité publique, elle est le domaine où le policier a le plus de responsabilités et d'initiative — une tâche d'équipe soumise à des règles strictes.",
          plan: [
            { niveau: "I", titre: "Les buts de la patrouille", points: ["**ÊTRE VU** : la dissuasion et la prévention sont les buts primordiaux — présence et passage à faible allure dissuadent le délinquant, rassurent et protègent les usagers.", "**VOIR ET AGIR** : remarquer tout ce qui trouble l'ordre public, intervenir et faire cesser les troubles, renseigner le public, faciliter la circulation."], texte: "La patrouille n'est pas une « promenade » — c'est l'une des images du public sur la Police en général. Elle doit toujours disposer d'un moyen radio ; toute intervention doit être annoncée (localisation précise et motif)." },
            { niveau: "II", titre: "Les différentes formes de patrouille", texte: "Peut s'effectuer à pied, en deux-roues (cyclomoteur, moto, VTT), ou en automobile/fourgon. L'efficacité n'est pas liée au nombre de kilomètres parcourus.", enfants: [
              { niveau: "A", titre: "La patrouille à pied", texte: "Généralement 2-3 fonctionnaires en tenue, sur un itinéraire prévu ou au gré du personnel. Répond parfaitement aux critères VOIR/ÊTRE VU/AGIR OU ASSISTER, mais secteur limité.", points: ["Tenue adaptée, armement et moyens matériels (gilets pare-balles, radio).", "**Ne jamais progresser groupés** — alignements et hauteurs différents.", "Dans les quartiers sensibles : vigilance sur les zones de danger potentiel, distance de sécurité contre les jets de projectiles.", "**Surveillance des « points hauts »** (étages, fenêtres, toits, halls, coursives, passerelles, buttes) — recul suffisant par rapport à un immeuble pour la distance de sécurité et les angles d'observation."] },
              { niveau: "B", titre: "La patrouille sur « deux-roues »", texte: "Adaptée au trafic urbain et à la surveillance de secteurs étendus grâce à la mobilité, mais l'attention nécessaire à la conduite limite l'observation de l'environnement." },
              { niveau: "C", titre: "La patrouille automobile", texte: "Permet de couvrir de grandes distances sans perdre le contact avec le C.I.C. Commandement assuré par un gradé ou le gardien le plus ancien, qui embarque le matériel de protection/intervention nécessaire (précautions de rangement contre les projectiles en cas de freinage brusque).", points: ["Le chef de patrouille reste en liaison permanente avec le C.I.C. : essai radio, indicatif/mission/effectifs au départ, position à chaque point fixe, en intervention ou au retour.", "En quartiers sensibles : itinéraires connus (détour pour éviter zones à risque), stationnement à distance avec échappatoire avant/arrière, chauffeur debout à côté du véhicule (radio en main pour surveiller/demander renfort), jamais de véhicule sans surveillance sauf force majeure (clés retirées, portières/coffre fermés).", "**Nota sécurité** : le véhicule est un moyen de dégagement d'urgence ; la carrosserie peut servir d'abri temporaire contre les projectiles (en restant à l'extérieur) ; en cas de tir par arme à feu, seul le **bloc moteur** offre une protection réelle."] },
            ]},
            { niveau: "III", titre: "Les moyens de la patrouille", texte: "Fixés par le chef de service, à vérifier en bon état avant la mission :", points: ["**Moyens de protection** : signalisation, éclairage, vêtements réflectorisés.", "**Moyens de liaison** : radio.", "**Moyens de riposte** : armes collectives, armes individuelles, bombes lacrymogènes."] },
            { niveau: "IV", titre: "Les principes de la patrouille", points: ["**Liaison radio constante** avec le C.I.C. : essai radio avant le départ, comptes-rendus en temps réel, signalement systématique du retour (momentané ou fin de vacation).", "Accomplir la mission dans un temps et un lieu précis (secteurs de patrouille).", "Rendre compte à la hiérarchie à la fin de la patrouille."] },
          ],
        },
        {
          titre: "La communication radioélectrique",
          definition: "La « radio » est le mode de communication opérationnel entre les agents du terrain, le commandement et le Centre d'Information et de Commandement (C.I.C.). Les messages doivent être brefs, concis, clairs et à caractère opérationnel.",
          plan: [
            { niveau: "I", titre: "Les règles à respecter", points: ["S'assurer du bon fonctionnement des appareils avant la mission.", "Vérifier que le réseau est libre avant tout appel.", "Attendre environ 1 seconde après avoir appuyé sur la touche d'émission (activation des circuits).", "Annoncer son indicatif radio et le motif de l'intervention.", "Parler calmement et distinctement, micro légèrement éloigné (éviter souffle/chuintements).", "Utiliser le **code phonique international** pour épeler noms, prénoms, plaques d'immatriculation.", "Communiquer à l'écart des personnes concernées (confidentialité).", "**Ne jamais mentionner le nom** des policiers/autorités — seulement leur indicatif radio.", "Supprimer les communications inutiles.", "Signaler à la station de base tout retrait du réseau et tout retour."] },
            { niveau: "II", titre: "Les termes de procédure radiotéléphonique", points: ["« Parlez » ou « transmettez », « Comment me recevez-vous ? », « Je vous reçois fort et clair ».", "« Attente », « Correction / répétez », « J'épelle », « Je décompose ».", "« Collationnez » : répétition totale/partielle d'une communication reçue, pour vérifier sa bonne réception.", "« Correct », « Reçu », « Terminé »."] },
            { titre: "Le code phonétique international", texte: "Les noms propres, groupes de lettres et mots pouvant prêter à confusion sont épelés lettre par lettre (Alpha, Bravo, Charlie, Delta, Écho, Fox-trot, Golf, Hôtel, India, Juliette, Kilo, Lima, Mike, November, Oscar, Papa, Québec, Roméo, Sierra, Tango, Uniform, Victor, Whisky, X-Ray, Yankee, Zoulou) ; les chiffres sont décomposés (ex : 6 = « deux fois trois », 7 = « quatre et trois »)." },
            { niveau: "III", titre: "Les indicatifs radio", enfants: [
              { niveau: "A", titre: "Principes généraux", texte: "Un indicatif se compose de : (1) lettres identifiant le personnel/équipage/station + (2) numéro du département + (3) chiffres identifiant le service + (4) lettre identifiant le rang/la station. **Indicatif court** (1+3+4) : usage interne au département. **Indicatif long** (1+2+3+4) : usage hors du département." },
              { niveau: "B", titre: "Les indicatifs des stations fixes", texte: "Les C.I.C. utilisent l'indicatif **TN** (ex : TN92 pour le CIC de la DDPN 92). L'incrémentation des circonscriptions/divisions varie selon la taille de la DDPN (ex : TN100/TN200/TN300 pour ≤4 circonscriptions ; incrémentation par 50 au-delà de 8 circonscriptions)." },
              { niveau: "C", titre: "Les indicatifs des autorités", points: ["**Autorités centrales** : le DNSP utilise l'indicatif « JURA » (JURA alpha pour son adjoint, JURA bravo pour l'adjoint renseignement, JURA charlie pour le chef d'État-Major).", "**Autorités zonales** : indicatif **TI** suivi du numéro de zone (ex : TI 2000 = zone Nord, TI 4000 = zone Sud-Est).", "**Autorités départementales** : le D.D.P.N. utilise TI suivi du numéro du département (ex : TI 63), la lettre A pour son adjoint (TI 63 A).", "**Autorités locales** : TI suivi du numéro du service (TI 100 pour le chef de la circonscription siège de la DDPN) pour les commissaires ; lettres dédiées pour les autres grades (TX commandant chef de service, TK commandant, TO capitaine, TL lieutenant — TL S stagiaire, TJ major, TR brigadier-chef)."] },
              { niveau: "D", titre: "Les indicatifs des services", texte: "Les unités sectorisées combinent le type de service et le numéro de secteur (ex : BST 111). Les lettres A à D indiquent un régime cyclique, E à H un régime hebdomadaire.", points: ["Exemples : SVP (service de voie publique), PS (police secours), UAO, BAC, GSP, UOP, BAAJ, CYNO (cynophile), BSR (sécurité routière), BE (équestre), BN (nautique), SIR.", "Services départementaux désignés par tranches : 600 (renseignement territorial), 700 (ordre public et soutien), 800 (sûreté départementale/urbaine), 900 (services centraux DDPN)."] },
              { niveau: "E", titre: "Les indicatifs des véhicules", texte: "Identifiés par des lettres selon le type : **TC** fourgon de patrouille, **TV** voiture légère, **TM** motocyclette, **TSC** scooter." },
            ]},
          ],
        },
        {
          titre: "Les principaux fichiers",
          reference: "Art. R.434-21 C.S.I.",
          definition: "Les policiers doivent connaître et respecter les finalités et les règles d'utilisation des fichiers auxquels ils ont accès.",
          plan: [
            { niveau: "I", titre: "La C.N.I.L.", reference: "Loi n°78-17 du 6/01/1978", texte: "La Commission Nationale Informatique et Libertés protège les droits des usagers en contrôlant le contenu des fichiers informatisés. Elle recense tous les fichiers existants, veille à ce que seules les informations autorisées y figurent, et exerce un contrôle du respect de la vie privée/des libertés/du fonctionnement démocratique — de sa propre initiative ou sur plainte." },
            { niveau: "II", titre: "Les règles de consultation", enfants: [
              { niveau: "A", titre: "Les obligations à respecter", texte: "L'accès s'effectue via **CHEOPS-NG** (circulation hiérarchisée des enregistrements opérationnels de police sécurisée), chaque utilisateur étant habilité selon un profil. Mot de passe personnel, renouvelé tous les **3 mois**, jamais communiqué. **Toutes les consultations sont mémorisées.**", points: ["Une interrogation n'est légale que pour les besoins exclusifs des missions de police administrative/judiciaire (ex : contrôle routier, procédure en cours).", "Les informations restent **confidentielles** — interdiction de les divulguer (presse, entourage, protagonistes d'une enquête).", "L'habilitation peut être contrôlée à tout moment par un magistrat ; son absence sur les pièces de procédure n'entraîne pas nullité (art. 15-5 C.P.P.)."] },
              { niveau: "B", titre: "Les suites du non-respect", points: ["**Sanctions disciplinaires** : usage non conforme = faute professionnelle.", "**Sanctions pénales** : consultation non autorisée, usage détourné, divulgation à des tiers (art. 226-13, 226-17, 226-20 à 226-23 C.P.)."] },
            ]},
            { niveau: "III", titre: "Le fichier des personnes recherchées (F.P.R.)", texte: "Exploité par le SCDC/DNPJ. Centralise les fiches de recherche de personnes majeures/mineures (autorités administratives, militaires/police, judiciaires) sur tout le territoire, avec la conduite à tenir en cas de découverte. Liste des motifs d'inscription à l'art. 230-19 C.P.P. (mandats de recherche, peines alternatives/complémentaires, interdictions de sortie du territoire, FIJAIT, FIJAIS, interdiction de stade, interdictions de paraître/rencontrer, interdiction de manifester, interdiction de détenir un animal).", points: ["Recherche simple (nom obligatoire, prénom, date de naissance), par liste, par signalement, par référence.", "Effacement en cas d'aboutissement de la recherche ou d'extinction du motif."] },
            { niveau: "IV", titre: "Le fichier des objets et véhicules signalés (F.O.Ve.S.)", texte: "Exploité par le SCDC/DNPJ, dans le cadre du NS2I. Découverte/restitution des véhicules volés et objets perdus/volés, surveillance des véhicules/objets signalés. Contient véhicules/bateaux/aéronefs volés ou sous surveillance, et objets identifiables (moyens de paiement, appareils audiovisuels, plaques, armes, bijoux, objets d'art...).", points: ["Recherche simple par catégorie, recherche complexe, recherche par procédure, par fichier, ou par identifiant technique.", "Accès limité pour la police municipale (via un utilisateur habilité, sans divulgation de la surveillance elle-même, sauf danger particulier)."] },
            { niveau: "V", titre: "Le système national du permis de conduire (S.N.P.C.)", texte: "Vérifie si une personne est titulaire d'un permis valable (n°, identité, date/autorité de délivrance, catégorie, validité, restrictions). Interrogation par état civil ou n° de permis, via CHEOPS-NG." },
            { niveau: "VI", titre: "Le système d'immatriculation des véhicules (S.I.V.)", texte: "Identifie un véhicule (certificat d'immatriculation complet + historique). Recherche simple (n° d'immatriculation/série/certificat) ou avancée (véhicule, titulaire, caractéristiques). Permet aussi d'enregistrer/lever une immobilisation." },
            { niveau: "VII", titre: "Autres fichiers relatifs aux véhicules", enfants: [
              { titre: "D.I.C.E.M.", texte: "Identification des propriétaires d'engins motorisés non homologués pour la voie publique (mini-motos, pocket bikes, mini-quads...) — art. L.321-1-1 C.R." },
              { titre: "EUCARIS", texte: "Accès aux bases de données véhicules de certains États membres de l'UE (données techniques, véhicule volé/détruit, propriétaire) — recherche par plaque/châssis + base étrangère à consulter + motif obligatoire." },
              { titre: "EUVID (EUFID)", texte: "Logiciel Europol facilitant le contrôle/l'identification des véhicules et documents associés — informations techniques et modèles de documents d'immatriculation d'une cinquantaine de pays." },
              { titre: "F.N.U.C.I.", texte: "Fichier national unique des cycles identifiés — lutte contre le vol/recel/revente illicite. Identification obligatoire des cycles neufs (depuis 01/01/2021) et d'occasion (depuis 01/07/2021) vendus par un commerçant. Géré par l'APIC, consultable aussi librement en ligne pour vérifier le statut d'un vélo d'occasion." },
              { titre: "F.V.A.", texte: "Fichier des véhicules assurés (AGIRA) — fichier **anonymisé** sans données nominatives sur le propriétaire, seulement sur l'obligation d'assurance. Profil « simplifié » (APJA : immatriculation + date) ou « détaillé » (OPJ/APJ : immatriculation/VIN/n° de police). Alimentation par les assureurs sous 3 jours." },
            ]},
            { niveau: "VIII", titre: "Le traitement d'antécédents judiciaires (T.A.J. / T.P.J.)", texte: "Exploité par le SCDC/DNPJ. Contient les données sur les personnes mises en cause (indices graves et concordants de participation à un crime/délit/contravention 5e classe), les victimes, et les personnes recherchées pour causes de mort/disparition (art. 74, 74-1 C.P.P.). Alimenté automatiquement via les logiciels LRPPN/LRPGN dans le cadre du NS2I.", points: ["Recherches via 3 onglets : **Consultation** (données précises), **Identifier** (données moins précises), **Rapprocher** (croisement de critères, y compris reconnaissance faciale).", "Dans une procédure judiciaire, seules les informations relatives à la procédure en cours peuvent être jointes ; l'édition « antécédents » nécessite une réquisition expresse du magistrat."] },
            { niveau: "IX", titre: "L'application de gestion des dossiers des ressortissants étrangers (A.G.D.R.E.F.)", texte: "Permet de connaître la situation administrative d'un ressortissant étranger (n° du titre de séjour et informations associées)." },
            { niveau: "X", titre: "Le fichier national automatisé des empreintes génétiques (F.N.A.E.G.)", texte: "Exploité par le SNPS. Centralise les données génétiques issues de traces biologiques (cheveux, poils, salive, sang, peau, sperme) découvertes en enquête, et les empreintes de personnes prélevées. Permet le rapprochement entre traces et profils déjà enregistrés." },
            { niveau: "XI", titre: "Le fichier automatisé des empreintes digitales (F.A.E.D.)", texte: "Exploité par le SNPS — fonds dactyloscopique commun police/gendarmerie/douane judiciaire. Contient empreintes digitales/palmaires d'origine inconnue (enquêtes crime/délit, recherche de causes de mort/disparition) et empreintes de personnes mises en cause, détenues, ou de cadavres non identifiés. **Conservation de 15 à 40 ans** selon l'infraction.", points: ["Finalités : identification des auteurs de crimes/délits, identification en détention (récidive), recherche de mineurs/majeurs disparus, identification de personnes décédées (cadre judiciaire ou extrajudiciaire).", "Interrogation via un terminal T41 en service régional de PJ/poste d'identité judiciaire, ou par relevé scanné envoyé par email."] },
            { niveau: "XII", titre: "Le fichier judiciaire national automatisé des auteurs d'infractions terroristes (F.I.J.A.I.T.)", reference: "Loi n°2015-912 du 24/07/2015", texte: "Exploité par le service du casier judiciaire national (ministère de la Justice). Prévient le renouvellement d'infractions terroristes et facilite l'identification de leurs auteurs.", points: ["Inscription sur condamnation (même non définitive), déclaration de culpabilité, décision d'irresponsabilité pénale pour trouble mental, ou décision étrangère équivalente.", "Personnes inscrites : majeurs sur décision judiciaire ; mineurs de 13 à 18 ans sur décision expresse. **Les mineurs de moins de 13 ans ne sont jamais inscrits.**", "Contenu : identité complète, filiation, adresses successives, déplacements transfrontaliers, informations sur la décision (nature, juridiction, peines, infraction, dates)."] },
          ],
        },
        {
          titre: "L'interrogation du F.P.R.",
          plan: [
            { titre: "Renvoi", texte: "Les modalités précises d'interrogation du Fichier des Personnes Recherchées (modes de recherche, conduite à tenir en cas de réponse positive) sont détaillées dans la fiche « Les principaux fichiers » ci-dessus (section III) et dans le mémento des conduites à tenir accessible dans l'aide de l'application CHEOPS-NG." },
          ],
        },
        {
          titre: "La caméra piéton",
          reference: "Art. L.241-1, R.241-1 à R.241-5 du Code de la sécurité intérieure",
          definition: "Dans l'exercice de leurs missions de prévention/protection et de police judiciaire, les agents de la police nationale peuvent procéder, au moyen de caméras individuelles, à un enregistrement audiovisuel de leurs interventions, pour prévenir les incidents et constater des infractions/collecter des preuves. Les enregistrements peuvent aussi servir à la formation et à la pédagogie.",
          plan: [
            { niveau: "I", titre: "Modalités d'utilisation", enfants: [
              { niveau: "A", titre: "Agents concernés", points: ["Personnels actifs (uniforme ou tenue civile, avec brassard apparent).", "Policiers adjoints.", "Réservistes."] },
              { niveau: "B", titre: "Lieux concernés", texte: "Utilisable en tous lieux, publics ou privés, y compris domiciles (captation strictement limitée au périmètre de l'intervention). Information préalable des personnes filmées obligatoire (ou à l'issue de l'intervention si obstacle, ex : état d'ébriété — Cass. crim. 02/05/2024). **Le consentement n'est pas requis**, une opposition ne fait pas obstacle à l'enregistrement. Droit d'accès aux enregistrements exerçable auprès de la CNIL." },
              { niveau: "C", titre: "Conditions d'utilisation", texte: "Seul l'usage d'une caméra en dotation administrative, portée de façon apparente, est autorisé. Mise en service (pré-enregistrement) avec identification de l'agent (n° RIO ou carte agent).", points: ["Mode « enregistrement » activé en cas d'incident (circonstances/comportement), désactivé en fin d'intervention — **les 30 secondes précédant le déclenchement sont sauvegardées**.", "Transmission en temps réel au poste de commandement possible si la sécurité des agents/biens/personnes est menacée."] },
            ]},
            { niveau: "II", titre: "Procédure de traitement des données", enfants: [
              { niveau: "A", titre: "Données enregistrées", reference: "Art. R.241-2 C.S.I.", points: ["Images et sons captés.", "Jour et plages horaires d'enregistrement.", "Identification de l'agent porteur et de la caméra, lieu de collecte.", "Identification des utilisateurs du logiciel d'exploitation.", "Motif d'export, nom de l'agent/service demandeur, n° de procédure."] },
              { niveau: "B", titre: "Stockage et conservation", reference: "Art. R.241-3, R.241-4 C.S.I.", texte: "Transfert sur support sécurisé à chaque fin de vacation (effacement automatique de la caméra). **Conservation 1 mois**, sauf utilisation dans une procédure." },
              { niveau: "C", titre: "Consultation", reference: "Art. R.241-3, R.241-3-1, R.241-5 C.S.I.", texte: "Accès pour les chefs de service et gestionnaires désignés, extraction possible pour une procédure judiciaire/administrative/disciplinaire ou une action de formation.", points: ["Destinataires possibles : I.G.P.N., autorité hiérarchique disciplinaire, agents de formation.", "Usage pédagogique : enregistrements **anonymisés**.", "Accès direct des agents porteurs après transfert, pour la recherche d'auteurs, la prévention de troubles imminents, le secours aux personnes, l'établissement fidèle des faits.", "Toutes les opérations (collecte, modification, consultation, communication, effacement) sont enregistrées et **conservées 3 ans**."] },
            ]},
            { titre: "L'utilité opérationnelle (fiche AMARIS)", texte: "La caméra piéton renforce la sécurité juridique et physique des policiers, aide à prouver la réalité d'une infraction et la légitimité de l'action, et peut réduire la tension d'un individu virulent. L'activation conforme à la doctrine d'emploi doit devenir un **réflexe**." },
          ],
        },
        {
          titre: "Les équipements de sécurité",
          definition: "Pour intervenir en sécurité sur un accident ou un contrôle routier de jour comme de nuit, les policiers disposent de vêtements/matériels rétro-réfléchissants ou fluorescents et de moyens lumineux spécifiques.",
          plan: [
            { niveau: "I", titre: "Les vêtements réfléchissants", points: ["**La chasuble réfléchissante** : gilet sans manche, ouvert sur les côtés, matière réfléchissante, inscription « POLICE » sur les deux faces.", "**L'imperméable de signalisation** : jaune fluorescent, gris rétro-réfléchissant et bleu police."] },
            { niveau: "II", titre: "Les matériels réfléchissants", texte: "Revêtement de peinture aux mêmes propriétés réfléchissantes : panneaux « tri-flash », « police ralentir », « halte police », et cônes de Lubeck." },
            { niveau: "III", titre: "Les moyens lumineux", points: ["**Palette de signalisation** (feu clignotant, disques oranges/rouges) : ralentissement ou arrêt des véhicules.", "**Raquette de signalisation** (feux rouge/orange, fixes ou clignotants) : à main ou sur mât démontable.", "**Bâton lumineux** : balancé à bout de bras dans un plan vertical.", "**Projecteur « LAP »** (feu blanc fixe) : éclaire la zone accidentée — **jamais pour obtenir un ralentissement** (seul le feu jaune orangé signifie « RALENTIR », art. 7-1 arrêté du 24/11/1967)."] },
            { niveau: "IV", titre: "Les feux spéciaux des véhicules", points: ["**Gyrophares** : lumière bleue.", "**Rampe spéciale** : feux à faisceaux tournants/clignotants bleus, éventuellement associés à des feux orangés."] },
            { niveau: "V", titre: "La pratique du policier (conseils)", points: ["S'équiper de sa protection individuelle avant de descendre du véhicule.", "Rester constamment mobile pour accroître sa visibilité.", "N'utiliser que la palette/raquette pour obtenir un ralentissement.", "**Ne jamais diriger le phare LAP** vers les usagers (éblouissement, usage non réglementaire).", "Utiliser des cônes propres et récents (durée de vie du revêtement ≈6 ans).", "Préférer les feux à éclats (propriété « répulsive » : attirent l'attention sans diminuer la capacité de réaction) aux feux fixes/tournants (propriété « attractive » : diminuent la capacité de réaction).", "Éviter un trop grand nombre de feux lumineux (effet attractif néfaste pour la sécurité du personnel)."] },
          ],
        },
        {
          titre: "La conduite des véhicules de police",
          definition: "Un droit de priorité spécial est accordé par le code de la route aux véhicules de police, limité dans le temps et justifié par la seule nécessité de répondre à une situation déterminée. L'urgence n'est pas la norme : la majorité des déplacements se font à allure normale.",
          plan: [
            { titre: "Nota — conduite par les policiers adjoints", reference: "Art. 134-1 R.G.E.P.N.", texte: "Seuls les P.A. titulaires du permis correspondant et dont les aptitudes ont été testées par le service d'emploi peuvent conduire un véhicule administratif." },
            { niveau: "I", titre: "Principe", reference: "Art. R.415-12, R.311-1/6.5 C.R.", texte: "Tout conducteur doit céder le passage aux véhicules d'intérêt général prioritaires annonçant leur approche par avertisseurs spéciaux. Le droit de priorité est subordonné à :", points: ["L'**urgence caractérisée** de la mission.", "L'**utilisation des avertisseurs sonores et lumineux spéciaux** (art. R.313-27, R.313-34 C.R.) — l'usage du gyrophare posé sur le tableau de bord est **proscrit**.", "Le **respect des règles élémentaires de prudence** (ex : marquer un temps d'arrêt avant de franchir un feu rouge fixe).", "La responsabilité individuelle du conducteur peut être retenue en cas d'inobservation de ces règles. **Port de la ceinture obligatoire** (art. R.412-1 C.R.), sauf en intervention d'urgence (art. R.412-1/II 3°) — reste néanmoins recommandé."] },
            { niveau: "II", titre: "La notion d'urgence", texte: "Ne se justifie que si elle apporte une réponse efficace à un danger/une menace pesant sur la vie ou les biens d'autrui — appréciation au cas par cas.", points: ["Urgence : personne en péril (tentative de suicide), balisage rapide d'un accident.", "Pas d'urgence : se rendre sur les lieux d'un cambriolage aux seules fins de constatations.", "Le franchissement de signaux d'arrêt (feu rouge, stop) doit se faire avec la plus grande précaution, à une vitesse permettant l'arrêt immédiat en cas de danger."] },
            { niveau: "III", titre: "L'état de nécessité", reference: "Art. 122-7 C.P.", texte: "Fait justificatif entraînant l'irresponsabilité pénale du policier commettant une infraction au code de la route.", points: ["Danger actuel ou imminent menaçant une personne/un bien.", "Nécessité de commettre l'infraction pour la/le sauvegarder.", "Proportion entre les moyens employés et la gravité de la menace.", "**Absence de faute antérieure** de l'agent (ex : retard volontaire préalable).", "Exonère l'agent pénalement, mais la responsabilité civile de l'administration reste engagée financièrement, et la responsabilité administrative du fonctionnaire peut entraîner une sanction. Éviter tout risque inconsidéré."] },
          ],
        },
        {
          titre: "L'usage des signaux sonores et lumineux",
          reference: "Art. R.311-1, R.313-27, R.313-34, R.432-1 à R.432-4 du Code de la route",
          definition: "Les véhicules d'intérêt général prioritaires (police, gendarmerie, incendie...) sont équipés d'une catégorie d'avertisseurs spéciaux qui leur est réservée ; une catégorie différente est réservée aux véhicules bénéficiant de facilités de passage (ambulances...). En cas d'urgence et avec usage des avertisseurs, certaines règles du code de la route ne s'appliquent pas.",
          plan: [
            { niveau: "I", titre: "Véhicules prioritaires (catégorie A)", texte: "Police (banalisés ou non), unités militaires de sécurité civile, gendarmerie, pompiers, déminage de l'État, douanes, SAMU/SMUR, ministère de la Justice (transport de détenus, rétablissement de l'ordre en établissement pénitentiaire).", points: ["Avertisseurs sonores « deux tons ».", "Gyrophares (fixes ou amovibles), lumière bleue à faisceaux tournants.", "Dérogation à **toutes les règles relatives à l'usage des voies**."] },
            { niveau: "II", titre: "Véhicules bénéficiant de facilités de passage (catégorie B)", texte: "Ambulances, premiers secours à personnes (associations agréées), sociétés gestionnaires d'infrastructures électriques/gazières, surveillance SNCF/RATP, transports de fonds Banque de France, permanence des soins, transport de produits sanguins/organes, engins de service hivernal, intervention sur autoroutes.", points: ["Avertisseurs sonores « trois tons ».", "Feux à éclats (fixes ou amovibles), lumière bleue à faisceaux stationnaires.", "Dérogations limitées à la **vitesse** et à la **circulation sur voies réservées**."] },
          ],
        },
        {
          titre: "Le signalement descriptif",
          definition: "Le policier doit savoir relever rapidement les éléments déterminants d'un signalement descriptif pour identifier une personne ou un véhicule — aller à l'essentiel pour une diffusion immédiate sur les ondes et sensibiliser les patrouilles à proximité.",
          plan: [
            { niveau: "I", titre: "Le signalement d'une personne — 13 rubriques", points: ["**1. Sexe** : masculin, féminin, indéterminé.", "**2. Âge** : mineur/majeur, estimation par tranche (ex : 20-30 ans).", "**3. Taille** : petite/moyenne/grande, estimation chiffrée.", "**4. Corpulence** : mince/maigre/svelte, normale, trapue, forte.", "**5. Type** : caucasien, méditerranéen, moyen-oriental, maghrébin, asiatique/eurasien, amérindien, indo-pakistanais, métis/mulâtre, africain/antillais, polynésien, mélanésien — **tout terme raciste, xénophobe, injurieux ou discriminatoire est prohibé**.", "**6. Cheveux** : couleur, longueur, nature, abondance, coiffure.", "**7. Yeux** : couleur, forme, regard, autres indices (lunettes, borgne...).", "**8. Barbe/moustache** : couleur, longueur, forme.", "**9. Visage** : forme, teint, sourcils, front, bouche, expression, menton, oreilles, autres indices (cicatrices, tatouages...).", "**10. Démarche, silhouette, gestuelle** : lourde/souple, droite/voûtée/déhanchée, droitier/gaucher, tics.", "**11. Voix** : tonalité, intensité, élocution, accent/bégaiement.", "**12. Habillement** : coiffure, nature/type de vêtement, coupe/motif, chaussures, accessoires.", "**13. Autres éléments d'observation** : catégorie socioprofessionnelle présumée, personnes impliquées (nombre, direction de fuite), contexte, type d'arme, moyen de locomotion, présence d'animaux."] },
            { niveau: "II", titre: "Le signalement d'un véhicule", points: ["Numéro d'immatriculation, marque, type, genre.", "Couleur de la carrosserie, catégorie d'immatriculation (française/étrangère).", "Nombre d'occupants, signalement sommaire du conducteur.", "Direction prise.", "Particularités (autocollants, éraflures, chocs apparents)."] },
          ],
        },
        {
          titre: "La palpation de sécurité",
          reference: "Art. R.434-16 C.S.I.",
          definition: "« La palpation de sécurité est exclusivement une mesure de sûreté. Elle ne revêt pas un caractère systématique. Elle est réservée aux cas dans lesquels elle apparaît nécessaire à la garantie de la sécurité du policier ou du gendarme qui l'accomplit ou de celle d'autrui. » Chaque fois que possible, elle est pratiquée à l'abri du regard du public, et exécutée par une personne du même sexe.",
          plan: [
            { niveau: "I", titre: "Définition", texte: "Mesure de protection **peu intrusive** (n'implique ni fouille ni retrait de vêtement), guidée par des considérations objectives sur la dangerosité potentielle. Mesure **administrative, sommaire et externe** : application des mains par-dessus les vêtements/accessoires/objets transportés, pour déceler tout objet dangereux." },
            { niveau: "II", titre: "Distinction avec les autres mesures", points: ["**Fouille de sécurité** : réalisée avant placement en rétention (GAV, IPM, mandat), vérifications plus adaptées, en cas de nécessité seulement — déshabillage complet interdit.", "**Fouille intégrale** (art. 63-7 C.P.P.) : n'est pas une mesure de sécurité mais un moyen de recherche de preuve, pouvant passer par le déshabillage complet et la vérification du contenu des poches/doublures."] },
            { niveau: "III", titre: "Modalités de mise en œuvre", texte: "**Jamais systématique** — le policier agit avec discernement, selon les circonstances de temps et de lieu.", points: ["Technique générale privilégiée ; **palpation rapide** possible si le contexte impose la discrétion, sans nuire à l'efficacité/sécurité — une palpation complète doit ensuite être effectuée dans un lieu approprié dès que le danger est écarté.", "Effectuée par une personne du **même sexe**, sauf situations exceptionnelles de dangerosité/urgence (terrorisme, banditisme).", "Par **un seul agent** (les autres assurent la protection), à travers les vêtements uniquement — **aucune dénudation**.", "Sans caractère vexatoire, sans agressivité ni violence.", "**Ordre d'exécution** : d'abord les zones les plus susceptibles de dissimuler une arme (ceinture abdominale, creux lombaire, aisselles), puis palpation complète par pressions successives, du haut vers le bas.", "Objets suspects découverts : information immédiate des autres policiers, appréhension matérielle pour remise à l'O.P.J. aux fins de saisie. **N'exige pas la qualité d'O.P.J.**"] },
            { niveau: "IV", titre: "Cas pratiques", points: ["Justifiée face à une dangerosité potentielle : indice apparent (forme d'une arme), comportement (alcool, stupéfiants, agressivité), personnalité (antécédents connus).", "**Non justifiée** après un contrôle d'identité n'ayant révélé aucune infraction, sauf survenance ultérieure d'une menace/dégénérescence de la situation.", "Le caractère délicat/dangereux du contrôle doit apparaître dans la procédure.", "Régulière, elle peut fonder une enquête de flagrance (ex : découverte d'une arme illégale).", "Jurisprudence : une saisie incidente (ex : dose d'héroïne) suite à une palpation **non justifiée** peut être annulée ; à l'inverse, la découverte d'un couteau suite à une palpation pour vol roulotte a été jugée régulière (Cass. crim. 27/09/1988) dès lors que les policiers se sont bornés à assurer leur sécurité et celle des tiers.", "Possible aussi lors des déplacements/interruptions de surveillance d'une personne en GAV/retenue."] },
            { titre: "Nota transgenres", texte: "Peuvent demander que l'opération soit réalisée par un homme ou une femme — la DGPN préconise d'en tenir compte dans la mesure du possible." },
            { niveau: "V", titre: "Palpation par des agents privés de sécurité", points: ["Agents de surveillance/gardiennage et services internes de sécurité, en cas de menace grave pour la sécurité publique ou périmètre de protection arrêté par le préfet (art. L.613-2 C.S.I.).", "Agents de sécurité d'une manifestation sportive/récréative/culturelle de plus de 300 spectateurs (art. L.613-3 C.S.I.)."], texte: "Dans tous les cas, **accord exprès** de la personne requis, et agent du **même sexe**." },
          ],
        },
        {
          titre: "Le menottage",
          reference: "Art. 803 C.P.P. — Art. R.434-17, R.434-10 C.S.I.",
          definition: "Mesure de sûreté relevant des pouvoirs de coercition en matière d'arrestation/détention. « Nul ne peut être soumis au port de menottes ou d'entraves que s'il est considéré soit comme dangereux pour autrui ou pour lui-même, soit comme susceptible de tenter de prendre la fuite » (art. 803 C.P.P.). Ne doit jamais être systématique.",
          plan: [
            { niveau: "I", titre: "Fondements juridiques", texte: "La décision d'utiliser les menottes relève du **pouvoir d'appréciation personnel de l'agent** (art. R.434-10 C.S.I. : discernement), selon la personnalité, le comportement, l'état physique de la personne et les circonstances de temps/lieu.", points: ["Appréciation particulièrement fine pour les mineurs, les personnes s'étant volontairement constituées prisonnières, et celles à capacité de mouvement réduite (âge, santé).", "**Exclu envers les simples témoins**, sauf situations circonstanciées (obligation de comparaître, état psychologique).", "**Mineurs** : interpellation en flagrance possible quel que soit l'âge ; menottage **proscrit pour les moins de 13 ans** non mis en cause pour un crime (sauf avis contraire du magistrat) ; discernement requis pour les plus de 13 ans selon la gravité des faits.", "Éviter que la personne menottée soit photographiée/filmée.", "Justification obligatoirement tracée dans le PV d'interpellation (comportement de l'individu, incidents survenus)."] },
            { niveau: "II", titre: "Principes de base", points: ["**Jamais excessivement serré.**", "Ferme mais sans agressivité.", "Menottage à l'écart des tiers si possible ; mise au sol la plus brève possible.", "**Jamais à un point fixe** (poteau, radiateur) ou mobile (véhicule).", "Seules les **menottes administratives en dotation** sont utilisées (responsabilité).", "Une fois commencée, la pose est **poursuivie jusqu'à son terme** — changer de méthode en cours est préjudiciable à la sécurité.", "**Toujours dans le dos.**", "Ne jamais lâcher la menotte libre après la première pose (risque d'arme improvisée).", "**Palpation systématique de la zone lombaire** dès l'individu menotté.", "Pour conduire l'individu : se positionner derrière lui, légèrement à droite (droitier) ou à gauche (gaucher), arme la plus éloignée possible ; appuyer sur les menottes vers le sol en cas d'agressivité pour le déséquilibrer."] },
          ],
        },
        {
          titre: "Policier, je travaille sur la voie publique : puis-je interdire d'être filmé ?",
          definition: "Aujourd'hui, tout le monde peut filmer les policiers en opération sur la voie publique et diffuser les images sur Internet — une situation souvent mal vécue, source de stress et de crainte de diffusion malveillante (diffamation, atteinte à l'intégrité/la dignité).",
          plan: [
            { titre: "Non, je ne peux pas interdire qu'on me filme sur la voie publique", texte: "Dans l'exercice de ma mission sur la voie publique (ou un lieu ouvert au public), je ne peux pas m'opposer à l'enregistrement de mon image, ni demander sa destruction, ni interdire sa diffusion, ni interpeller la personne qui filme sur ce seul motif. Je dois apprendre à travailler sous l'œil de l'objectif." },
            { titre: "Nota — anonymat de certains policiers", texte: "Seuls certains policiers, limitativement énumérés par arrêté, bénéficiant du respect de leur anonymat, peuvent porter plainte pour la diffusion de leur image." },
            { titre: "Cela ne veut pas dire que celui qui filme a tous les droits", points: ["Je peux tenir à distance ou faire reculer celui qui filme, pour me protéger moi-même, protéger mes collègues ou le public (ex : contrôle d'identité, interpellation).", "Je peux faire de même pour préserver la confidentialité de mes propos ou protéger une zone d'enquête (traces, indices, reconstitution). **Attention** : même tenue à distance, la personne peut continuer à filmer.", "Celui qui diffuse l'image peut voir sa responsabilité engagée en cas de préjudice (violences, représailles, atteinte à la dignité) — action en justice possible devant le juge civil."] },
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "L'accident de la circulation",
      fiches: [
        {
          titre: "La sécurité pendant le trajet et sur les lieux du constat d'un accident de la circulation",
          definition: "L'accident corporel de la circulation nécessite l'intervention des services de police pour assurer la sécurité, effectuer l'enquête et, en l'absence des services spécialisés, porter secours. Les policiers effectuent cette mission en équipe sous les ordres du chef de bord. Les accidents de policiers survenus à l'occasion de cette mission représentent 7,2% du total des accidents de fonctionnaires : 16% en allant sur les lieux, 78% en constatant, 6% en revenant.",
          plan: [
            { niveau: "I", titre: "La sécurité pendant le trajet", texte: "Commence dès le début de l'intervention — la parfaite localisation de l'accident et le choix d'un itinéraire adapté aident autant à la rapidité que la conduite en urgence." },
            { niveau: "II", titre: "La sécurité avant les constatations", texte: "Le responsable met en place une signalisation avancée « de danger ».", points: ["Panneau « tri-flash » « accident » installé de part et d'autre de l'obstacle à environ **150 mètres** (augmentée si vitesse élevée, réduite à 50 km/h — jamais plus de **300 m** ni moins de **100 m**).", "Un agent « protecteur » déposé à proximité, équipé d'une palette de signalisation lumineuse balancée à bout de bras dans un plan vertical, pour obtenir ralentissement/arrêt des véhicules."] },
            { niveau: "III", titre: "La sécurité pendant les constatations", texte: "Le véhicule d'intervention (gyrophares bleu et orange allumés) est garé en protection des obstacles s'il arrive le premier, ou stationné sans gêner si des secours sont déjà présents. Porter secours aux blessés en attendant les services spécialisés si arrivée en premier.", enfants: [
              { niveau: "A", titre: "Sécurité des lieux", points: ["Cônes de Lubeck (bandes rouges/blanches) tous les **5 mètres environ** pour baliser les zones d'approche.", "Bandes plastiques réflectorisées sur le véhicule accidenté côté déviation de la circulation.", "Raquette de signalisation à feux fixes/clignotants au droit de l'obstacle, visible des deux sens.", "La nuit : éclairage par projecteurs orientés pour éviter tout éblouissement.", "Vérifier que les contacts des véhicules sont coupés (neutraliser les batteries si besoin), éloigner les fumeurs, contenir les curieux, faciliter la circulation (circulation alternée), appeler des renforts si nécessaire."] },
              { niveau: "B", titre: "Sécurité du personnel", texte: "Port obligatoire, de jour comme de nuit, des équipements réfléchissants (chasuble ou imperméable de signalisation). La nuit, port du bâton lumineux dans la mesure du possible durant les déplacements." },
            ]},
          ],
        },
        {
          titre: "Les différents types d'accidents de la circulation routière",
          definition: "L'accident est un événement imprévu et soudain entraînant des dégâts matériels ou corporels (les actes volontaires — homicides, suicides — sont exclus). Un accident de la circulation implique au moins un véhicule en mouvement sur une voie ouverte à la circulation publique. On distingue 3 catégories selon la nature du dommage.",
          plan: [
            { niveau: "I", titre: "L'accident mortel", texte: "Pour l'intervention policière : accident aux conséquences immédiatement mortelles. Pour les statistiques : est victime d'un accident mortel toute personne décédée dans les **30 jours** suivant l'accident." },
            { niveau: "II", titre: "L'accident corporel", texte: "Sont considérés comme blessés les victimes ayant subi un traumatisme nécessitant des soins médicaux.", points: ["**Blessé non hospitalisé** : ayant reçu des soins, non admis ou admis moins de **24 heures**.", "**Blessé hospitalisé** : admis comme patient plus de **24 heures**."] },
            { niveau: "III", titre: "L'accident matériel", texte: "Donne normalement lieu à un constat amiable entre conducteurs. **L'intervention de la police est nécessaire** dans certains cas :", points: ["Véhicule militaire impliqué.", "Dégâts au domaine public, à la voie publique, aux voies ferrées, aux lignes téléphoniques.", "Véhicule de marchandises dangereuses avec dégâts importants.", "Mort ou blessures d'un animal domestique.", "L'intervention peut aussi être sollicitée : sur réquisition d'un conducteur (dégâts importants, désaccord sur le constat, conducteur étranger), si la fluidité/sécurité du trafic est compromise, ou si l'accident est probablement consécutif à une infraction (ex : conduite en état d'ivresse)."] },
          ],
        },
        {
          titre: "La régulation de la circulation",
          reference: "Art. R.130-10, R.411-28 du Code de la route",
          definition: "Les fonctionnaires de police nationale et les policiers adjoints placés sous leur commandement ont le pouvoir de régler la circulation, sur les lieux d'un accident, dans le cadre d'un contrôle routier, ou pour faciliter l'écoulement du trafic. Les indications données par ces agents prévalent sur toute signalisation, feu ou règle de circulation.",
          plan: [
            { niveau: "I", titre: "La sécurité du policier en régulation", enfants: [
              { niveau: "A", titre: "Le comportement de l'automobiliste", texte: "Fatigue, monotonie, troubles de santé, soucis, alcool diminuent la vigilance. L'automobiliste, surtout sur trajet habituel, ne voit pas toujours le policier — la conduite très automatisée diminue l'attention aux signaux." },
              { niveau: "B", titre: "L'attitude du policier", texte: "Éviter d'être trop statique — attitude dynamique, signaux énergiques et précis, sifflet pour capter l'attention. Attention soutenue lors des « points-écoles » et des services de nuit (visibilité, éblouissement)." },
              { niveau: "C", titre: "Les moyens techniques — 2 objectifs", points: ["**IL DOIT VOIR** : se placer à l'endroit le plus favorable (ex : milieu de l'intersection) pour observer tous les usagers.", "**IL DOIT ÊTRE VU** : équipements adéquats (sifflet, gants blancs, tenues réflectorisées, bâtons lumineux), protections individuelles avant de descendre du véhicule."] },
            ]},
            { niveau: "II", titre: "Le poste de régulation", texte: "Souvent à une intersection à forte circulation, ou sur un rétrécissement temporaire (alternance du passage). Priorité à la visibilité (équipement adapté), position de sécurité sans gêner la progression, attitude dynamique et énergique.", points: ["Le policier peut aussi jouer le rôle d'**aide-régulateur** : surveiller le trafic, intervenir sur les infractions, renseigner le public, arrêter une file sur ordre du régulateur."] },
            { niveau: "III", titre: "Les principes de la mission", points: ["**Priorités de passage alternées**, avec priorité à l'axe le plus chargé sans attentes trop longues sur les voies secondaires.", "**Durée des cycles** : cycle assez long pour résorber chaque file en cas de circulation dense.", "**Dégagement d'une intersection** : priorité à tout conducteur tournant à gauche créant un obstacle au milieu du carrefour ; interdiction de s'engager sans pouvoir poursuivre sa route.", "**Choix du véhicule à arrêter** : éviter les poids lourds/véhicules lents (faible accélération, temps mort) ; prévenir le conducteur suffisamment tôt pour une décélération progressive de sa file."] },
            { niveau: "IV", titre: "La signalisation manuelle", reference: "Art. R.411-28 C.R.", texte: "Les gestes réglementaires des agents habilités prévalent sur toute signalisation, feu ou règle de circulation. Signaux exécutés sans rigidité, avec énergie et précision.", points: ["**Feu vert (signal de passage)** : l'agent ouvre la voie en se plaçant parallèlement à l'axe de marche, bras tendus horizontalement et latéralement."] },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "L'intervention au domicile",
      fiches: [
        {
          titre: "Le domicile — La violation de domicile",
          reference: "Art. 226-4, 432-8 du Code pénal — Art. 59, 59-1, 706-89, 749 et s. du Code de procédure pénale",
          plan: [
            { niveau: "I", titre: "La notion de domicile", reference: "Art. 226-4 C.P.", texte: "Tout local d'habitation contenant des biens meubles appartenant à une personne, qu'elle y habite ou non, résidence principale ou non — l'endroit où une personne a le droit de se dire chez elle, quel que soit le titre juridique d'occupation, la seule condition étant que le lieu protège l'intimité. Étendu aux logements inoccupés contenant des meubles. La Cour de cassation développe aussi la notion de « lieu normalement clos », bénéficiant de la même protection.", enfants: [
              { titre: "Sont considérés comme des domiciles", points: ["L'appartement loué, la maison de campagne/vacances, la demeure temporairement inoccupée.", "Les dépendances (débarras, garage, balcon, terrasse, poulailler, remise) constituant le prolongement de la maison.", "Le box fermé non attenant, un garage en parking souterrain.", "Le logement occupé sans titre mais pacifiquement, la chambre d'hôtel.", "Les locaux professionnels (jurisprudence ancienne) — sauf les lieux ouverts au public pendant les heures d'ouverture.", "Le véhicule réellement aménagé pour l'habitation, la caravane, la roulotte, la tente.", "Le yacht, le voilier, la péniche (navire habitable)."] },
              { titre: "Ne constituent PAS un domicile", points: ["Le logement vide entre deux locations.", "L'immeuble en construction, neuf jamais occupé, ou en démolition.", "Un véhicule non aménagé."] },
            ]},
            { niveau: "II", titre: "La violation de domicile", texte: "Le domicile est « inviolable et sacré ». Toute personne y pénétrant hors des cas prévus par la loi commet une violation de domicile — infraction continue, permettant d'agir en flagrance tant que l'occupation illicite perdure.", enfants: [
              { niveau: "A", titre: "La violation de domicile commise par un particulier", reference: "Art. 226-4 C.P.", enfants: [
                { titre: "Élément légal", texte: "L'article 226-4 du code pénal définit et réprime la violation de domicile par un particulier." },
                { titre: "Élément matériel", points: ["**L'introduction frauduleuse** (al.1) : entrer illicitement, à l'aide de manœuvres/menaces/voies de fait/contrainte (ruse, violences, escalade, fausses clés, effraction), hors les cas prévus par la loi et contre le gré de l'occupant.", "**Le maintien dans le domicile d'autrui** : sans qu'il soit nécessaire que le maintien lui-même résulte de manœuvres/menaces, dès lors qu'il fait suite à une introduction dans ces circonstances."] },
                { titre: "Élément moral", points: ["Conscience de commettre un acte illicite.", "Volonté de pénétrer ou se maintenir malgré l'opposition de l'occupant ou à son insu."] },
                { titre: "Répression", texte: "**226-4 C.P. : 3 ans - 45 000 €.** Aucune circonstance aggravante spécifique, sauf motif discriminatoire (art. 132-76/132-77 C.P., peine maximale relevée). **Tentative : OUI. Complicité : OUI.**" },
              ]},
              { niveau: "B", titre: "La violation de domicile commise par un « fonctionnaire »", reference: "Art. 432-8 C.P.", texte: "« Fonctionnaire » désigne tout agent public ou contractuel dépositaire de l'autorité publique (policier actif ou adjoint) ou chargé d'une mission de service public (sapeur-pompier), agissant dans/à l'occasion de ses fonctions.", enfants: [
                { titre: "Élément légal", texte: "L'article 432-8 du code pénal prévoit et réprime la violation de domicile par un « fonctionnaire »." },
                { titre: "Élément matériel", points: ["Introduction dans un domicile (peut résulter du simple franchissement du seuil).", "Commise par un fonctionnaire agissant dans/à l'occasion de l'exercice de ses fonctions.", "En dehors des cas prévus par la loi et contre le gré de l'habitant."] },
                { titre: "Élément moral", points: ["Conscience d'agir en dehors des cas prévus par la loi.", "Volonté de pénétrer malgré l'opposition de l'occupant."] },
                { titre: "Répression", texte: "**432-8 C.P. : 2 ans - 30 000 €.** Aucune circonstance aggravante spécifique, sauf motif discriminatoire. **Tentative : OUI. Complicité : OUI.**" },
              ]},
            ]},
            { niveau: "III", titre: "Les cas dans lesquels le policier peut pénétrer dans un domicile", texte: "Reposent soit sur l'obligation de porter secours, soit sur la nécessité d'exercer les missions de police.", enfants: [
              { niveau: "A", titre: "Cas d'introduction possibles même en dehors des heures légales (péril et urgence)", enfants: [
                { titre: "1. La réclamation faite de l'intérieur de la maison", reference: "Art. 59 C.P.P.", texte: "Appel au secours (cris, hurlements) — l'introduction est justifiée même si l'appel s'avère fantaisiste." },
                { titre: "2. Maison atteinte ou menacée par un incendie ou une inondation", texte: "Se distingue du cas précédent : la réclamation de l'intérieur n'est pas nécessaire, le péril peut être ignoré des occupants." },
                { titre: "3. Assistance à personne en péril", reference: "Art. 223-6 al.2 C.P.", texte: "Dès lors que des renseignements/indices incitent à croire qu'une personne est gravement en péril (appel sans réponse, odeur suspecte, absence anormale d'une personne seule)." },
                { titre: "4. En matière de police administrative", texte: "En cas de danger imminent pour la sûreté des personnes attesté par certificat médical, le maire (ou les commissaires de police à Paris) décide de mesures provisoires nécessaires — intervention de nuit possible pour conduire une personne en troubles mentaux manifestes en milieu psychiatrique (art. L.3213-2 C.S.P.)." },
                { titre: "5. Visites domiciliaires, perquisitions, saisies", reference: "Art. 59-1, 706-89 C.P.P.", texte: "En flagrance, l'O.P.J. assisté de l'A.P.J., par ordonnance spécialement motivée du JLD à la requête du procureur, peut perquisitionner/saisir en dehors des heures de l'art. 59." },
                { titre: "6. État de nécessité", texte: "Le policier peut pénétrer dans un appartement même vide pour mettre fin à un danger actuel/imminent (fuite de gaz, sirène d'alarme intempestive causant un trouble intolérable au voisinage)." },
              ]},
              { niveau: "B", titre: "Cas d'introduction uniquement pendant les heures légales (6h-21h) par des A.P.J.", reference: "Art. 59 C.P.P.", enfants: [
                { titre: "1. Exécution d'un mandat d'amener, d'arrêt, de recherche", texte: "Seul but : appréhender la personne visée, au dernier domicile connu." },
                { titre: "2. Exécution des décisions portant condamnation." },
                { titre: "3. Exécution d'une contrainte judiciaire", reference: "Art. 749 et s., D.13-4° C.P.P." },
                { titre: "4. La perquisition en enquête préliminaire", reference: "Art. 75, 76 C.P.P.", texte: "Soumise à l'autorisation préalable et écrite de la personne. Pour un crime/délit puni ≥3 ans, seul l'O.P.J. peut perquisitionner sans assentiment, sur autorisation du JLD. Les opérations commencées avant 21h peuvent se poursuivre au-delà." },
              ]},
            ]},
          ],
        },
        {
          titre: "Les bruits et tapages",
          plan: [
            { niveau: "I", titre: "Les bruits de voisinage constatés sans mesure acoustique", texte: "Un bruit de nature à porter atteinte à la tranquillité du voisinage ou à la santé par sa durée, sa répétition ou son intensité.", enfants: [
              { niveau: "A", titre: "Les bruits d'origine domestique", reference: "Art. R.1336-5, R.1337-7 à R.1337-9 C.S.P.", texte: "S'applique à tous les bruits résultant du comportement d'une personne, d'une chose ou d'un animal sous sa responsabilité (cris d'animaux, musique, outils, jeux bruyants, feux d'artifice, fêtes, travaux).", points: ["**Contravention de 4e classe**, amende forfaitaire applicable (art. R.48-1 C.P.P.).", "Peine complémentaire de confiscation possible (sauf si amende forfaitaire).", "Complicité par aide/assistance punie des mêmes peines."] },
              { niveau: "B", titre: "Les bruits de chantier", reference: "Art. R.1336-10, R.1337-6 C.S.P.", texte: "Chantiers soumis à déclaration/autorisation, si le bruit résulte de : non-respect des conditions fixées, insuffisance de précautions, ou comportement anormalement bruyant.", points: ["**Contravention de 5e classe** + confiscation possible + complicité punie de même.", "**Exclus** : bricolage, artisan pour réparation, chantiers non soumis à déclaration (relevant alors des textes sur les bruits domestiques)."] },
            ]},
            { niveau: "II", titre: "Les bruits nécessitant le recours à une mesure acoustique", reference: "Art. R.1336-6 C.S.P.", texte: "Bruits d'activité professionnelle (hors chantier), sportive, culturelle ou de loisirs, organisée habituellement ou soumise à autorisation, sans conditions fixées par les autorités — ainsi que les établissements devant prévoir une isolation acoustique ou diffusant habituellement de la musique amplifiée. **Contravention de 5e classe.**" },
            { niveau: "III", titre: "Les agents habilités à constater", points: ["OPJ, APJ, APJA (selon le CPP).", "Agents des douanes, répression des fraudes, inspecteurs des installations classées, agents assermentés de l'environnement/agriculture/industrie/équipement/transports/mer/santé/jeunesse et sports, inspecteurs de salubrité, agents des collectivités locales (art. L.571-18 C. env.) — après accord du procureur."] },
            { niveau: "IV", titre: "Les bruits réprimés par le Code pénal", reference: "Art. R.623-2 C.P.", texte: "Bruits ou tapages injurieux ou nocturnes troublant la tranquillité d'autrui. Le tapage = série de bruits tumultueux. L'infraction suppose un fait volontaire et personnel de l'auteur.", enfants: [
              { niveau: "A", titre: "Les bruits ou tapages nocturnes", texte: "Entre le coucher et le lever du soleil, sur la voie publique ou à l'intérieur d'un local perceptible par des voisins/passants (même une seule personne troublée), par une ou plusieurs personnes/animal/chose. Constaté par les enquêteurs, mesurable au sonomètre." },
              { niveau: "B", titre: "Les bruits ou tapages injurieux", texte: "Pas nécessairement nocturnes : propos désobligeants, disputes violentes/bruyantes, vociférations, grossièretés, invectives." },
            ]},
            { titre: "Répression des bruits/tapages", points: ["Tapage injurieux diurne : **R.623-2 al.1 : 3e classe, AFD**.", "Tapage nocturne : **R.623-2 al.1 : 3e classe, AFD**.", "Confiscation complémentaire possible (sauf AFD) ; complicité punie de même."] },
          ],
        },
        {
          titre: "Le différend familial",
          definition: "Fait de querelle, dispute, altercation violente entre personnes vivant au sein d'une cellule familiale (mariés, concubins, partenaires PACS, ascendants/descendants). L'intervention doit être conduite avec tact et discernement, pour ramener le calme, protéger les victimes et prévenir la répétition.",
          plan: [
            { niveau: "I", titre: "Les différents types de situations", enfants: [
              { niveau: "A", titre: "En l'absence d'atteinte à la personne", texte: "Situation peu grave (tapage, cris, insultes, bris de meubles), de nature contraventionnelle. Intervention pondérée, correction et froideur efficaces. Renseigner la M.C.I. et rédiger un rapport d'intervention." },
              { niveau: "B", titre: "Les atteintes aux personnes", texte: "Regroupe les actes de contact direct (coup, gifle, bousculade, arme/animal lancé) et les agissements sans contact mais impressionnants (tir dans la direction d'une personne sans l'atteindre)." },
            ]},
            { niveau: "II", titre: "Les violences", enfants: [
              { niveau: "A", titre: "Les atteintes sur un membre du couple", texte: "Mariés, concubins, partenaires PACS (avec/sans communauté de vie), y compris relations passées. Le harcèlement au sein du couple (dégradation des conditions de vie) est un délit. **Les violences au sein du couple relèvent toujours du domaine délictuel, quelle que soit la durée de l'ITT.**", points: ["Sanctions aggravées si commises au sein du couple : tortures/actes de barbarie, violences ayant entraîné la mort sans intention, meurtre, violences volontaires (mutilation, ITT >8j ou ≤8j), viol, agression sexuelle."] },
              { niveau: "B", titre: "Les violences sur les autres personnes du foyer", texte: "Toujours délictuelles, indépendamment de l'ITT, si exercées sur un mineur de 15 ans, un ascendant, ou une personne particulièrement vulnérable (âge, maladie, infirmité, déficience)." },
            ]},
            { niveau: "III", titre: "L'intervention des services de police", texte: "Priorité : sécurité de la victime et des tiers présents ; porter secours, empêcher de nouveaux actes (appréhension d'arme), puis apprécier les suites pénales. **Nota** : la brigade de protection des familles lutte contre les violences faites aux femmes/enfants/personnes âgées.", enfants: [
              { niveau: "A", titre: "Un recueil d'informations primordial", points: ["Lieu précis (adresse, code d'accès, étage).", "Personnes impliquées (nombre, enfants).", "Configuration du logement, état de gravité.", "Présence d'un danger (personne armée, surexcitée, chien).", "Alcoolisme/toxicomanie, précédents éventuels."], texte: "Contact préalable et rapide avec le requérant pour confirmation. **Le requérant ne doit jamais être conduit sur les lieux ni vu par les protagonistes.**" },
              { niveau: "B", titre: "L'intervention", texte: "Mise en place de la **Méthode de Raisonnement Opérationnel (MRO)** : analyse de la situation, cadre juridique, tactique d'action. Grande vigilance : ne pas se positionner face à la porte.", points: ["Si la porte s'ouvre : exposer le motif, demander l'autorisation d'entrer ; sécuriser les lieux, séparer les protagonistes, les entendre séparément si possible.", "Si le différend ne peut être réglé sur place : inviter au service pour des solutions juridiques et coordonnées d'organismes d'assistance.", "Si la porte ne s'ouvre pas : s'enquérir des motifs à travers la porte, insister, rester attentif aux bruits, rendre compte à la station directrice (contre-appel), interroger le voisinage.", "**Prise d'otages ou menace de suicide** : différer l'intervention, dispositif de sécurité renforcé aux abords, empêcher le public d'approcher, faciliter l'arrivée des renforts spécialisés."] },
              { niveau: "C", titre: "Le cadre juridique", texte: "La majorité des interventions relève du flagrant délit. Protection physique de la victime et des enfants en priorité. Rappel à la loi sur les poursuites correctionnelles encourues (violences sur conjoint/concubin/PACS). **Si les violences sont caractérisées en flagrance, quelle que soit leur gravité apparente, le mis en cause doit être interpellé.**" },
              { niveau: "D", titre: "Les devoirs comportementaux des policiers", points: ["**La neutralité** : impartialité, écarter tout parti pris.", "**L'absence de jugement de valeur** : tact envers la victime, dont la vulnérabilité/dépendance financière peut entraîner des revirements.", "**L'information de la victime** : un dépôt de plainte n'entraîne pas nécessairement l'incarcération (autres sanctions : obligation de soin, mise à l'épreuve) ; le mis en cause peut être poursuivi même sans plainte/en cas de retrait ; le dépôt de plainte n'entraîne pas obligatoirement le placement des enfants ; le conjoint violent peut être expulsé du domicile sur décision du JAF."] },
            ]},
            { niveau: "IV", titre: "Le suivi de l'intervention", enfants: [
              { niveau: "A", titre: "En l'absence d'atteinte à la personne", texte: "Main courante informatisée (historique en cas de procédure ultérieure), complétée si besoin d'un rapport d'information. Si un conjoint est rejeté du domicile sans hébergement : orientation vers les structures d'accueil d'urgence ou la plateforme de veille sociale (115, associations)." },
              { niveau: "B", titre: "En cas d'atteinte à la personne", enfants: [
                { titre: "1. Les investigations", texte: "Interpellation de l'auteur si les violences sont caractérisées, O.P.J. avisé immédiatement. Certificat médical de constatations (nombre de jours d'ITT) — orienter de préférence vers une unité médico-judiciaire.", points: ["Art. 10-2 C.P.P. : information du droit à demander une **ordonnance de protection** (mesure d'urgence du JAF : interdiction de contact, de détenir une arme, éviction du domicile), et des peines encourues par l'auteur.", "En cas de retrait de plainte, seul le **procureur** décide de poursuivre ou non."] },
                { titre: "2. La prise en charge de la victime", points: ["Protection et hébergement immédiats si danger, orientation vers associations/travailleurs sociaux.", "**Le départ du domicile est justifié** par les violences subies (avec ou sans les enfants) — dépôt d'une main courante recommandé.", "Possibilité de se domicilier au service enquêteur sans communiquer sa nouvelle adresse.", "Information sur les phases de l'enquête et les mesures prises.", "Pour une victime mariée : possibilité d'expulsion du conjoint violent par le JAF (art. 220-1 C. civ.)."] },
                { titre: "3. L'auteur des faits", texte: "Interdiction d'entrer en contact avec la victime ou de se rendre à son domicile, possible à plusieurs stades de la procédure. Obligation possible de prise en charge sanitaire/sociale/psychologique." },
              ]},
            ]},
            { titre: "Nota — immunité familiale et violences conjugales", reference: "Art. 311-12 C.P.", texte: "L'immunité du vol entre époux **ne s'applique pas** lorsque le vol porte sur des objets/documents indispensables à la vie quotidienne de la victime (identité, moyens de paiement, titres de séjour, moyen de télécommunication)." },
          ],
        },
        {
          titre: "Violences conjugales : conduite à tenir lors des interventions à domicile — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source consacre une fiche à cet extrait de la circulaire INTK2000182J du 20/12/2019 (suivi des mesures du Grenelle de lutte contre les violences conjugales). Cette page se présente sous forme d'infographie dont le contenu textuel n'a pas pu être extrait de façon exploitable. L'essentiel de la doctrine relative à la conduite à tenir lors de ces interventions est cependant déjà couvert de façon approfondie dans la fiche « Le différend familial » ci-dessus. Se référer au fascicule original (page 109) pour le support visuel complet." },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "Les autres interventions",
      fiches: [
        {
          titre: "Primo-intervenant sur une scène d'infraction",
          reference: "Art. 54, D.7, 55, 434-4 du Code de procédure pénale et du Code pénal",
          definition: "Les premières mesures conservatoires prises par un policier dès son arrivée sur les lieux d'un crime ou d'un délit jouent un rôle primordial dans la préservation des traces et indices, essentielles pour la résolution de l'enquête et le futur procès. Les traces peuvent être visibles ou non (traces de pas, de peinture, d'outils, impacts, traces biologiques, papillaires), les indices matériels (arme, douille, cagoule, document).",
          plan: [
            { niveau: "I", titre: "Visite de sécurité", texte: "Seule la nécessité absolue liée à la sûreté ou au secours justifie de pénétrer dans les lieux — vise à secourir une personne ou écarter toute menace. Emprunter, si possible, un seul et unique cheminement distinct de celui vraisemblablement suivi par le/les auteurs." },
            { niveau: "II", titre: "Préservation des lieux", points: ["Évacuer/mettre à distance toute personne présente (témoins, famille, curieux), sans autoriser les témoins directs à quitter les lieux.", "**Ne rien toucher ni manipuler.** En cas de nécessité de déplacement, porter gants/masque et matérialiser précisément l'emplacement d'origine (photos, marquage au sol).", "Ne pas déplacer/manipuler armes et éléments balistiques sans l'autorisation d'un agent PTS, sauf danger réel et immédiat.", "Protéger les traces fragiles contre les intempéries (traces de pas/pneumatiques), photographier les éléments susceptibles de disparaître.", "Mettre en place un périmètre de sécurité (rubalise) où nul ne pénètre avant l'arrivée de la PTS."] },
            { niveau: "III", titre: "Recueil de tous les renseignements utiles", texte: "Les fiches « premiers intervenants » indiquent l'identité de toutes les personnes s'étant succédées sur les lieux (y compris pompiers/SAMU), et toutes les modifications de la scène (porte forcée, gants/accessoires de soin laissés, évacuation de la victime, déplacement de mobilier, fermeture du gaz)." },
            { niveau: "IV", titre: "Avis des personnes compétentes", texte: "L'O.P.J. et les agents formés à la PTS, habilités à gérer les scènes d'infraction, doivent être avisés dans les meilleurs délais." },
            { niveau: "V", titre: "Cadre juridique de référence", points: ["**Art. 54 C.P.P.** : en crime flagrant, l'O.P.J. avise immédiatement le procureur, se transporte sans délai, veille à la conservation des indices, saisit armes/instruments/produit du crime.", "**Art. D.7 C.P.P.** : les OPJ/APJ veillent à la préservation de l'état des lieux et des traces/indices jusqu'aux opérations de PTS.", "**Art. 55 al.1/2 C.P.P.** : interdiction, sous peine de contravention de 4e classe, à toute personne non habilitée de modifier l'état des lieux avant les premières opérations — sauf exigences de sécurité/salubrité publique ou soins aux victimes.", "**Art. 434-4 C.P.** : **3 ans - 45 000 €** pour quiconque modifie l'état des lieux d'un crime/délit (altération, falsification, ajout/déplacement/suppression d'objets) ou détruit/soustrait/recèle un document/objet utile à l'enquête, en vue de faire obstacle à la manifestation de la vérité — porté à **5 ans - 75 000 €** si commis par une personne dont les fonctions l'appellent à concourir à cette manifestation de la vérité."] },
          ],
        },
        {
          titre: "Bagages abandonnés, oubliés ; objets, engins ou véhicules suspects ; alertes à la bombe",
          definition: "Que ce soit face à des munitions/engins de guerre, des bagages oubliés/abandonnés, des objets/engins suspects (ENRI, ECI, EBI, EEI ou leurre), un véhicule suspect, ou une alerte à la bombe, le policier doit agir avec le maximum de précautions — ces engins sont conçus pour blesser, tuer, détruire ou contaminer. **Un engin explosif improvisé ayant fonctionné peut encore blesser ou tuer** (fonctionnement partiel possible).",
          plan: [
            { niveau: "I", titre: "Principes de base", enfants: [
              { niveau: "A", titre: "Situer très vite l'origine de l'information", texte: "Découverte fortuite, signalement anonyme (téléphone, lettre, message). Deux cas : danger connu avec temps disponible (seuls les démineurs estiment ce temps), ou danger/heure de fonctionnement inconnus (engin improvisé) imposant les premières mesures de sécurité au plus vite." },
              { niveau: "B", titre: "Recueillir le maximum d'informations", points: ["Mode de réquisition (requérant, lieu, coordonnées).", "Teneur du message (auteur, motivations, mouvement revendiqué, heure/lieu annoncés).", "Localisation de l'objet (cheminement, obstacles, superficie).", "Aspect extérieur (dimensions, texture, inscriptions, antenne, interrupteur, récipients, odeurs, stabilité).", "Raisons de la suspicion (cible potentielle), moment du dépôt/découverte.", "Manipulations depuis la découverte — **ne jamais déplacer/ouvrir un bagage ou objet suspect**.", "Présence de témoins/suspects, menace écrite/téléphonée, risques additionnels (gaz, essence à proximité)."] },
              { niveau: "C", titre: "Identifier les principaux indices de suspicion", points: ["**Objet/engin suspect** : contexte particulier, proximité d'une cible potentielle, action signalée, inscriptions sur l'emballage, abandon sans propriétaire, apparence insolite (fils, adhésifs, antenne, interrupteur).", "**Véhicule suspect** : action signalée, stationnement inapproprié/véhicule volé/plaque suspecte, habitacle inoccupé ou personnes suspectes le quittant, objets insolites, fumée/fuite/affaissement.", "**Personne porteuse d'un EEI ou arme d'épaule** : comportements suspects (nervosité, agitation, sudation, effet tunnel), marquage positif par portiques ou unités cynotechniques REXPEMO."] },
            ]},
            { niveau: "II", titre: "Mode opératoire", enfants: [
              { niveau: "A", titre: "Appliquer les dispositifs de sécurité", points: ["**Ne pas toucher/déplacer/provoquer de vibrations** (risque de déclenchement).", "Ne pas jeter d'eau/produit, ne pas recouvrir, éviter vibrations sonores/thermiques/mécaniques.", "**Périmètre de sécurité** : 100 m en local (avec évacuation des étages sup/inf), 60 m minimum à couvert pour une personne porteuse suspectée, le plus large possible à l'extérieur (200 m pour un véhicule) — accessible aux seuls spécialistes, un seul point d'accès filtré.", "Agrandissement possible à la demande des démineurs ; désigner un responsable du périmètre, interlocuteur des démineurs.", "**Pas d'émetteurs-récepteurs ni de téléphones mobiles** à proximité immédiate.", "Pour une personne porteuse : détecter la menace, se protéger, alerter/évacuer, rendre compte, figer la situation par injonctions, neutraliser le porteur pour éviter le déclenchement."] },
              { niveau: "B", titre: "1. Aviser", points: ["**Avis immédiat au C.I.C.**, qui répercute aux services de déminage (seuls compétents pour la neutralisation), puis aux autorités administratives/judiciaires, aux secours (pompiers, SAMU, EDF-GDF) et au responsable du bâtiment.", "Sécurité intérieure = responsable de l'établissement ; extérieure = responsables de l'ordre public. En cas de menace avérée, l'autorité de police (officier/commissaire) peut imposer l'évacuation.", "Informer le public sans dramatiser à l'excès (consignes de sécurité, ne pas rester à proximité de matériaux projetables)."] },
              { niveau: "C", titre: "2. Évacuer", points: ["Vérifier l'existence d'un plan d'évacuation, décider de sa mise en œuvre avec le responsable.", "Contrôler soigneusement l'itinéraire d'évacuation.", "**Ne jamais laisser une garde statique** près de l'objet/engin/véhicule suspect.", "Envisager un 2e engin dissimulé à proximité après une 1re explosion.", "**Ne pas lever le dispositif** avant l'ordre des autorités (avis des démineurs) — maintien ~1h en cas de fausse alerte.", "Traiter les blessés avec les services médicaux, préserver traces et indices pour l'enquête post-explosion."] },
              { niveau: "D", titre: "3. Réglementer", points: ["Faciliter au maximum l'approche des démineurs (itinéraire préférentiel).", "Écarter les curieux, réguler la circulation, point de rendez-vous clair."] },
            ]},
            { niveau: "III", titre: "L'intervention en cas d'alerte à la bombe", enfants: [
              { niveau: "A", titre: "Les différents supports du message", texte: "Appel direct/indirect (17 ou tiers), message téléphoné, faxé, mail, vidéo, lettre.", points: ["Exploiter la teneur (auteur, motivations, mouvement, heure/lieu annoncés).", "**Documents écrits** : éviter la manipulation excessive et d'écrire dessus (recherche de traces papillaires/foulage).", "**Messages audio/vidéo** : peuvent indiquer nature/quantité/emplacement des explosifs et mode de mise à feu — éviter la proximité d'une source de rayonnement/champ magnétique, éviter les arrêts intempestifs sur l'original.", "**Messages téléphonés** : relever l'origine de l'appel (numéro, identité), le sexe, les caractéristiques de la voix, l'accent, l'élocution, les termes employés, les bruits de fond — éviter toute manipulation intempestive d'un téléphone mobile abandonné."] },
              { niveau: "B", titre: "La procédure de recherche", texte: "Opération de recherche sous la responsabilité du maître des lieux (ou représentant), pour localiser un éventuel objet non identifié — traité comme un engin explosif s'il est découvert." },
            ]},
          ],
        },
        {
          titre: "Identification et détection des produits stupéfiants",
          reference: "Art. L.5132-1, L.5132-6 du Code de la santé publique",
          plan: [
            { niveau: "I", titre: "Définitions clés", points: ["**Accoutumance** : dépendance psychique résultant de la consommation répétée.", "**Dépendance physique** : signes cliniques (état de manque) à l'arrêt (ex : opiacés). **Dépendance psychique** : besoin psychologique de réitérer, malaise/angoisse à l'arrêt.", "**Dopage** : substances/procédés interdits pour augmenter artificiellement le rendement sportif.", "**Drogue** : substance naturelle/de synthèse agissant sur le système nerveux central, modifiant conscience/sensations/comportement.", "**Hallucinogènes** : provoquent altérations/hallucinations sensorielles.", "**Psychotrope** : molécules pharmacologiques à risque important pour la santé.", "**Sevrage** : suppression du produit habituel, « syndrome de sevrage » (8 à 15 jours pour la suppression du besoin physique).", "**Stupéfiants** : substances psychoactives naturelles/semi-synthèse/synthèse dangereuses (héroïne, cocaïne, cannabis...), 1res à faire l'objet d'une convention internationale.", "**Substances vénéneuses** : 3 catégories légales — stupéfiantes, psychotropes, listes I et II (art. L.5132-1/L.5132-6 C.S.P.).", "**Surdose (overdose)** : absorption que l'organisme ne peut tolérer (troubles respiratoires/cardiaques, coma, mort rapide).", "**Tolérance** : nécessité d'augmenter les doses pour le même effet."] },
            { niveau: "II", titre: "Classification des substances vénéneuses", enfants: [
              { niveau: "A", titre: "Substances d'origine naturelle", points: ["**Herbe de cannabis** (kif, marijuana) : feuilles/fleurs séchées verdâtres à ocre, odeur poivrée, enveloppes de 5-10g — euphorie, troubles cognitifs/de l'humeur, angoisse.", "**Résine de cannabis** (shit, haschich) : plaquettes/barrettes brun pâle à noir, molle ou dure — mêmes effets, dépendance physique chez les consommateurs réguliers.", "**Huile de cannabis** : liquide visqueux brun-vert, odeur âcre, vendue en fioles.", "**Champignons hallucinogènes** : famille des psilocybes, frais ou séchés — nausées, réactions psychotiques durables, risque de décès par surdosage.", "**Opium** : pâte brune/noire d'odeur âcre (urine), pains/boulettes — regard fixe, myosis, constipation, forte dépendance.", "**Morphine** : poudre blanchâtre/jaunâtre, ampoules/comprimés — traces de piqûres, perte de poids, impuissance, forte dépendance.", "**Héroïne** : poudre blanche à marron, odeur d'opium/vinaigre — embolies, septicémie, hépatites/HIV, très forte dépendance.", "**Cocaïne** (« neige ») : poudre blanche cristalline, sachets/pailles — paranoïa, tachycardie, perforation de cloison nasale, forte dépendance.", "**Crack** : cailloux blanc à écru issus de la cocaïne — effet bref et intense, comportement impulsif, manque violent, très forte tolérance.", "**Rachacha** : pâte acajou à base de têtes de pavot, forte odeur de terre pourrie — calmant, nausées, risque cardiaque, forte dépendance."] },
              { niveau: "B", titre: "Substances de synthèse", points: ["**Amphétamine** : poudre blanche/rose/jaune — stimulation, euphorie, anorexie, dépendance psychique très forte.", "**Méthamphétamine** : dérivé très puissant, effets prolongés jusqu'à 24h — dépendance psychique très forte.", "**Ecstasy (MDMA)** : comprimés à logos — effet stimulant/hallucinogène, déshydratation.", "**LSD 25** : poudre cristalline inodore, buvards/gélules — perturbation de l'humeur, troubles de la pensée, risque de flash-back.", "**Colles et solvants** (dissolvants, détachants, diluants) : contiennent acétone/toluène/benzène — euphorie, confusion, cancérigène, risque de coma/arrêt respiratoire.", "**Poppers** : dérivés du nitrite, flacons colorés — euphorie, dilatation vasculaire, risque de dépression respiratoire."] },
              { niveau: "C", titre: "Les médicaments détournés", points: ["**GHB** (« drogue du viol ») : poudre blanche cristalline/liquide incolore — suppression temporaire de la volonté, amnésie temporaire, dépendance physique et psychique.", "**Méthadone** : sirop de substitution pour morphinomanes/héroïnomanes, odeur vanillée."] },
            ]},
          ],
        },
        {
          titre: "L'ivresse publique et manifeste (I.P.M.)",
          reference: "Art. L.3341-1, R.3353-1 du Code de la santé publique",
          definition: "Toute personne trouvée en état d'ivresse dans un lieu public est, par mesure de police, conduite à ses frais (après examen médical attestant que son état de santé ne s'y oppose pas) dans le local de police/gendarmerie le plus proche ou une chambre de sûreté, pour y être retenue jusqu'à ce qu'elle ait recouvré la raison. Si l'audition immédiate n'est pas nécessaire, elle peut être placée sous la responsabilité d'un garant.",
          plan: [
            { niveau: "I", titre: "Champ d'application", texte: "**R.3353-1 C.S.P. : contravention de 2e classe.** Deux conditions cumulatives :", points: ["**Manifeste** : évidente, constatable par tous.", "**Publique** : lieu public ou privé ouvert au public (place, route, gare, café...)."] },
            { titre: "L'appréciation de l'ivresse", texte: "L'ivresse s'apprécie indépendamment de toute mesure d'alcoolémie — signes extérieurs et troubles du comportement : haleine sentant l'alcool, défaut d'équilibre, élocution bégayante, comportement anormal/incohérent (**critères non cumulatifs**). Mesure réservée aux **majeurs** — les mineurs ne sont jamais placés en chambre de sûreté." },
            { niveau: "II", titre: "Conduite à tenir", texte: "Mesure de police administrative visant à prévenir les atteintes à l'ordre public et protéger la personne (vulnérable) — devoir de protection/assistance (même envers un auteur d'infraction) et obligation de rendre compte régulièrement au C.I.C. Renseigner la main courante informatisée.", enfants: [
              { niveau: "A", titre: "Prise en charge par les policiers", texte: "Retirée sans brutalité de la vue du public, soumise à une palpation de sécurité.", points: ["**Conduite à l'hôpital** pour certificat de non-admission : l'examen médical détermine le maintien en local de police ou l'admission hospitalière. **Nota** : rester circonspect — certains symptômes (perte d'équilibre, vomissements) peuvent résulter d'un choc/médicament/hypoglycémie sans alcool, l'agent n'étant pas qualifié pour diagnostiquer.", "**Conduite au commissariat** pour présentation au chef de poste : fouille de sécurité (retrait ceintures/lacets/médicaments, sans déshabillage complet), placement en chambre de sûreté sous surveillance constante, **rondes toutes les 15 minutes maximum** avec feuille de rondes, appel au médecin au moindre signe d'alerte.", "**Libération** après complet dégrisement (disparition des signes d'ivresse), restitution des effets, émargement du registre d'écrou."] },
              { niveau: "B", titre: "Prise en charge par une tierce personne", reference: "Art. L.3341-1 al.2 C.S.P.", texte: "Si l'audition n'est pas nécessaire immédiatement, placement sous la responsabilité d'un garant, à tout moment (hôpital, service, avant/après chambre de sûreté). Si la remise à un tiers intervient avant l'examen médical, aucun certificat de non-admission n'est requis." },
              { niveau: "C", titre: "Rédaction du procès-verbal", texte: "PV ordinaire faisant ressortir tous les signes extérieurs de l'ivresse. **Les A.P.J.A. ne sont pas compétents** pour constater cette contravention par PV. Audition libre sur PV séparé (à l'issue du dégrisement ou ultérieurement), avec notification des droits de l'art. 61-1 C.P.P. (hors droit à l'avocat)." },
            ]},
          ],
        },
        {
          titre: "Les plans ORSEC",
          definition: "Le code de la sécurité intérieure définit les mesures de protection générale de la population, l'organisation des secours et la gestion des crises. L'Organisation de la Réponse de SEcurité Civile (ORSEC) organise, en situation d'urgence, la mobilisation et la coordination de toute personne publique/privée concourant à la protection de la population.",
          plan: [
            { niveau: "I", titre: "L'organisation du dispositif", points: ["Recensement et analyse préalable des risques et conséquences.", "Dispositif opérationnel fixant une organisation unique de gestion d'événement majeur.", "Phase de préparation : exercices/entraînements réguliers (État, collectivités, associations, entreprises, gestionnaires de réseaux).", "3 niveaux territoriaux : départements, zones de défense, zones maritimes."] },
            { niveau: "II", titre: "La direction des opérations de secours (DOS)", texte: "Repose le plus souvent sur le **maire** ; le **préfet** en prend la direction quand les conséquences dépassent les limites/capacités d'une commune (le maire reste chargé du soutien à sa population).", points: ["Accident simple ou important (moyens renforcés) : **maire**.", "Accident avec nombreuses victimes, pollution, spéléo, plan particulier d'intervention (type AZF), inondation, tempête majeure, pandémie, nucléaire : **préfet**.", "**Cas particuliers** : à Paris et petite couronne, le préfet de police assure en permanence la DOS ; en mer, le préfet maritime ; si l'événement dépasse un département, le préfet de zone de défense."] },
            { niveau: "III", titre: "Le noyau dur d'acteurs départemental", texte: "Service d'incendie et de secours, services sanitaires et sociaux, police et gendarmerie, conseil général, services de l'équipement, délégué militaire départemental, associations agréées de sécurité civile — complété selon le type de situation." },
            { niveau: "IV", titre: "Les missions de base et modes d'action", points: ["**Missions de base** : organisation des acteurs publics/privés, commandement, communication de crise (alerte, information des populations/élus), veille et alerte permanente.", "**Modes d'action** (missions pré-identifiées) : secours à de nombreuses victimes, évacuation des populations, hébergement/ravitaillement/soutien/réconfort des populations sinistrées."] },
            { niveau: "V", titre: "Les dispositifs complémentaires", points: ["**Plan Particulier d'Intervention (P.P.I.)** : pour les risques liés à des installations fixes (ex : installations nucléaires de base).", "**Plan Communal de Sauvegarde (P.C.S.)** : dispositif complémentaire au niveau communal."] },
          ],
        },
      ],
    },
    {
      numero: 6,
      titre: "Formulaires utiles",
      fiches: [
        {
          titre: "Formulaires administratifs — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit en annexe 3 formulaires vierges à usage strictement pratique : l'**avis de rétention d'un permis de conduire**, la **fiche d'immobilisation**, et la **fiche descriptive de l'état du véhicule à enlever en fourrière**. Ces documents sont des modèles administratifs sans contenu réglementaire propre à synthétiser — leurs conditions d'usage sont détaillées dans les fiches correspondantes du « Mémento de circulation routière » (rétention du permis, immobilisation, mise en fourrière). Se référer au fascicule original (pages 133 à 141) pour les modèles complets." },
          ],
        },
      ],
    },
  ],
};


const DOC_RECUEIL_PV = {
  titre: "Recueil de procès-verbaux",
  sections: [
    {
      numero: 1,
      titre: "Introduction",
      fiches: [
        {
          titre: "Préambule et la procédure",
          plan: [
            { niveau: "I", titre: "Préambule", texte: "L'enquête de police est une suite d'actes ayant pour finalité la manifestation de la vérité : qualifier les faits, rassembler les preuves, rechercher les auteurs. L'enquêteur constitue un dossier de procédure comprenant un nombre variable de procès-verbaux selon la gravité des faits." },
            { niveau: "II", titre: "La procédure", texte: "Ensemble de règles définissant la manière dont les policiers procèdent à leurs enquêtes. Le policier relate au fur et à mesure ce qu'il a fait/vu/entendu, puis le retranscrit précisément sur un acte officiel signé : le procès-verbal. Le premier acte, la **« saisine »**, décrit comment les services ont eu connaissance des faits. L'ensemble des PV d'une même enquête, classés chronologiquement, constitue la procédure, transmise au magistrat à l'issue des investigations.", points: ["Les A.P.J. (art. 20 C.P.P.) secondent les O.P.J., constatent crimes/délits/contraventions et en dressent PV, reçoivent par PV les déclarations utiles à la recherche des auteurs/complices.", "Ils n'exercent leurs attributions judiciaires que si leur activité consiste, à titre principal, en l'exercice de la police judiciaire."] },
          ],
        },
        {
          titre: "Les procès-verbaux",
          reference: "Art. 429 à 433, D.9 à D.11, 19, 107 du Code de procédure pénale",
          definition: "Le procès-verbal est un acte écrit, rédigé et signé par un magistrat, un O.P.J. ou un A.P.J., agissant dans les règles de sa compétence et de sa mission de police judiciaire. Il n'a de valeur probante que s'il est régulier en la forme, si son auteur a agi dans l'exercice de ses fonctions, et a rapporté ce qu'il a personnellement vu/entendu/constaté (art. 429 C.P.P.).",
          plan: [
            { niveau: "I", titre: "La valeur des procès-verbaux", enfants: [
              { titre: "Valant simples renseignements", reference: "Art. 430 C.P.P.", texte: "PV rédigés en flagrance (sauf délit prévu par une loi spéciale), en préliminaire, ou sur commission rogatoire — n'apportent aucune valeur probante, rôle d'information seulement." },
              { titre: "Valant jusqu'à preuve contraire", reference: "Art. 431 C.P.P.", texte: "Nécessite une disposition expresse de la loi. La preuve contraire ne peut être apportée que par écrit ou témoins (ex : code du travail). Le rédacteur relate uniquement ce qu'il a personnellement constaté." },
              { titre: "Valant jusqu'à inscription de faux", reference: "Art. 433 C.P.P.", texte: "Réglé par des lois spéciales, dressés par des agents spécialisés (douanes, ONF...). Autorité absolue liant le juge, tenu de condamner si : les faits sont constitutifs d'une infraction, l'infraction est de la compétence de l'agent, elle n'est pas prescrite/amnistiée, elle n'est pas entachée d'un vice de forme." },
            ]},
            { niveau: "II", titre: "Les principes de rédaction", enfants: [
              { titre: "Les principes", points: ["**Simultanéité** : rédaction « sur-le-champ » ou dès que possible.", "**Spécificité** : en principe un PV par opération de police judiciaire — sauf art. D.11 C.P.P. qui autorise, en flagrance/préliminaire, un PV unique regroupant plusieurs opérations d'une même enquête (procédure simplifiée : vol à l'étalage, vente à la sauvette, usage de stupéfiants...).", "**Unicité du rédacteur** : en-tête avec nom/prénom (ou n° R.I.O.), grade, service, qualité selon le CPP (art. D.9, D.10 C.P.P.).", "**Copie du procès-verbal** : toujours établie et jointe à l'original destiné au magistrat (art. 19 C.P.P.)."] },
              { titre: "La protection du rédacteur", reference: "Art. 15-3, 15-4 C.P.P.", texte: "Le rédacteur d'un PV de plainte peut s'identifier par son n° R.I.O. sans autorisation préalable (art. 15-3). Tout agent peut s'identifier par son R.I.O. dans les actes qu'il rédige ou comme assistant, sans faire apparaître nom/prénom (art. 15-4), si la révélation de son identité est susceptible de mettre en danger sa vie/intégrité (ou celles de ses proches) — soumis à autorisation générale ou spéciale." },
            ]},
            { niveau: "III", titre: "La structure et les techniques de rédaction", texte: "Chaque feuillet est écrit et signé par le rédacteur, en langue française uniquement, manuscrit ou dactylographié. **6 parties.**", enfants: [
              { niveau: "1", titre: "Le titre", texte: "« PROCÈS-VERBAL »." },
              { niveau: "2", titre: "L'incipit", points: ["Date et heure en toutes lettres.", "Nom/prénom (ou n° R.I.O.), grade, qualité, service et résidence du rédacteur.", "Lieu de rédaction de l'acte.", "Le fait ou la pièce qui ouvre la procédure ou motive l'opération.", "Le cadre juridique de l'action de police judiciaire.", "Désignation des personnes présentes (assistants, civilement responsable).", "Identité de la personne faisant l'objet de l'opération (sauf impossibilité).", "L'avis aux autorités."] },
              { niveau: "3", titre: "Le corps du procès-verbal", texte: "Contenu variable (constatations, auditions, contrôle d'identité). Le rédacteur relate ce qu'il a personnellement vu/constaté/entendu.", points: ["**Temps** : présent de l'indicatif, **1re personne du pluriel**.", "**Objectivité** : reflet fidèle des déclarations/faits.", "**Questions-réponses** : le texte exact des questions posées doit être rédigé, suivi des réponses.", "**Sans interligne, sans rature ni surcharge** (art. 107 C.P.P.) — chaque rature/renvoi approuvé en marge, blancs comblés par des pointillés."] },
              { titre: "Les rectifications (rédaction manuscrite)", points: ["**Ratures simples sans mot ajouté** : mots raturés par barres de fraction, numérotés, mention terminale du nombre de mots rayés nuls.", "**Ratures avec mots ajoutés (renvoi simple)** : signe + entre les mots où insérer l'omission, reporté en marge avec le mot numéroté, paraphé par le déclarant et le rédacteur, mentionné en clôture.", "**Renvoi à la suite de ratures avec ajouts** : double numérotation (mots rayés + mots ajoutés), mention finale rappelant les deux.", "**Méthodes évitant ratures/renvois** : formule « ou plus exactement » en cours de rédaction ; ou ajout après signatures d'une formule de rectification/précision en fin de PV.", "**Nota** : le L.R.P. permet de corriger directement à l'écran avant impression, avec l'accord du déclarant."] },
              { niveau: "4", titre: "L'énonciation terminale (clôture)", texte: "Chaque feuillet signé par le rédacteur, les assistants mentionnés, et le déclarant. L'heure de fin est facultative pour la plainte, obligatoire pour les actes mettant en cause un suspect. La formule de clôture s'adapte au PV (interprète, scellés, refus/impossibilité de lecture/signature)." },
              { niveau: "5", titre: "La marge", enfants: [
                { titre: "La pagination", texte: "Seul le recto est utilisé. Feuillets suivants sans en-tête, avec rappel de l'objet de l'acte, du n° de registre/d'ordre du PV, et du n° de suite (feuillet n°)." },
                { titre: "Les mentions marginales", points: ["**N°** : numéro de la procédure (fourni automatiquement par le T.P.J.) suivi de la cote du PV (classement chronologique : 1, 2, 3...).", "**Affaire** : nom(s) du/des auteur(s) (C/personne dénommée ou C/X) + nature des faits/de l'événement.", "**Objet** : nature de l'opération de police judiciaire relatée + identité succincte de la personne concernée."] },
              ]},
              { niveau: "6", titre: "Les mentions et annexes", texte: "Indiquent une diligence accessoire ou la jonction d'un document/d'une pièce — sous-rubrique « MENTION » ou « ANNEXE » portée en marge après la clôture." },
            ]},
            { titre: "Nota", texte: "Outre ces principes communs à tous les PV, chaque type de procès-verbal fait l'objet de règles particulières, étudiées pour chaque acte." },
          ],
        },
        {
          titre: "L'état-civil",
          definition: "L'identité permet de désigner, reconnaître ou retrouver une personne — les informations sont recueillies selon un ordre précis, présenté différemment selon le type de procès-verbal.",
          plan: [
            { niveau: "I", titre: "L'identité succincte", texte: "Employée en marge des procès-verbaux, pour désigner toute personne dont le nom apparaît sans qu'elle soit auditionnée.", points: ["Le nom, le prénom usuel, l'âge, la profession, le domicile."] },
            { niveau: "II", titre: "La petite identité", texte: "Insérée dans le corps du PV lorsque la personne entendue/interrogée n'est pas mise en cause (victime, témoin).", points: ["Nom, prénoms, date et lieu de naissance.", "Nationalité (si vol du document d'identité ou nationalité étrangère).", "Profession, domicile, n° de téléphone, adresse mail (pour communication ultérieure)."] },
            { niveau: "III", titre: "La grande identité", texte: "Relevée en présence de l'auteur d'un crime ou d'un délit.", enfants: [
              { titre: "Identité", points: ["**1. Identité de la personne** : nom patronymique en capitales (dit « de jeune fille »), prénom usuel en minuscules, autre état civil (divorcé/époux/veuf + nom d'époux), date et lieu de naissance (pays/département/arrondissement), filiation (nom/prénom du père — mention DÉCÉDÉ le cas échéant —, nom de jeune fille/prénom de la mère), nationalité.", "**2. Adresse** : domicile au sens civil (pays/département/commune/arrondissement, n°/nom de voie, précisions bâtiment/étage/porte), téléphone et coordonnées."] },
              { titre: "Communication électronique", texte: "Oui (préciser l'adresse mail) ou non — pour communication ultérieure avec police-gendarmerie et/ou justice." },
              { titre: "Complément d'identité", points: ["Titre d'occupation (locataire, propriétaire, occupant à titre gratuit) ; si propriétaire distinct, son nom/adresse ; montant du loyer/crédit.", "Pour un étranger : nature/références du titre de séjour, dates de délivrance/expiration.", "État de la personne (vulnérabilité éventuelle), n° de sécurité sociale."] },
              { titre: "Situation de famille", points: ["Célibataire, concubinage, divorce, mariage, séparé, veuf, PACS.", "Conjoint : nom, prénom, date/lieu de l'union, nombre/âge des enfants.", "Ex-conjoint (si séparation) : nom, prénom, date/lieu du divorce, nombre/âge des enfants, droit de garde."] },
              { titre: "Emploi/Employeur", points: ["Activité professionnelle, statut (employé ou à son compte).", "Date de début d'activité, salaire mensuel, adresse employeur."] },
              { titre: "Diplôme/Distinction", points: ["Niveau d'étude (analphabète ou niveau d'instruction), diplômes obtenus.", "Situation militaire, décoration/distinction/pension (civile ou militaire)."] },
              { titre: "Permis/Armes", points: ["Permis (conduite, chasse, pêche) : nature, catégorie, numéro, date/lieu de délivrance.", "Arme détenue : références de l'autorisation (défense ou sportive), numéro, date/lieu de délivrance ; armes dont l'intéressé est propriétaire ou a la libre disposition (nature, catégorie, marque, calibre, numéro)."] },
              { titre: "Antécédents judiciaires", texte: "**Ne jamais évoquer une condamnation amnistiée.** Mention « NS » (non spécifié) si la personne est connue des services de police/justice." },
              { titre: "Alias/Surnom" },
            ]},
          ],
        },
      ],
    },
    {
      numero: 2,
      titre: "La plainte",
      fiches: [
        {
          titre: "La plainte — Généralités",
          reference: "Art. 15-3, 10-2 à 10-5, 15-3-1, 15-3-1-1, 15-3-2, 138-3, 706-47, 706-52, 706-53 du Code de procédure pénale",
          definition: "La plainte est l'acte par lequel la personne victime d'un crime, d'un délit ou d'une contravention porte ce fait à la connaissance de l'autorité compétente. Les OPJ/APJ sont tenus de recevoir les plaintes, y compris hors compétence territoriale (transmission au service compétent). Tout dépôt donne lieu à un PV, un récépissé immédiat, et une copie du PV sur demande.",
          plan: [
            { niveau: "I", titre: "Généralités", texte: "La plainte peut être déposée **contre X** (auteur non identifié) ou **contre personne dénommée** (auteur connu). Le policier ne se contente pas de retranscrire : il doit faire ressortir les éléments utiles à l'enquête.", points: ["Situer les faits dans le temps/l'espace (cadre juridique : flagrance/préliminaire ; transport possible pour constatations).", "Déterminer les faits et le rôle de chaque acteur (qualifier l'infraction — éléments matériel/moral —, préciser le mode opératoire).", "Décrire avec précision les éléments utiles (objets volés, véhicules, aspect physique/tenue).", "Enregistrer le préjudice subi.", "Prendre en compte les objets/documents remis par la victime."] },
            { niveau: "II", titre: "Droits des victimes d'infraction", reference: "Art. R.434-20 C.S.I.", enfants: [
              { niveau: "A", titre: "Information", reference: "Art. 10-2 C.P.P.", points: ["Droit à réparation du préjudice (indemnisation ou justice restaurative).", "Droit de se constituer partie civile (mise en mouvement par le parquet, citation directe, ou plainte devant le juge d'instruction).", "Droit d'être assistée d'un avocat (choisi ou désigné par le bâtonnier, frais à charge sauf aide juridictionnelle/assurance protection juridique).", "Droit d'être aidée par un service de collectivité publique ou une association agréée.", "Droit de saisir la commission d'indemnisation des victimes (infractions art. 706-3/706-14 C.P.P.).", "Droit d'être informée des mesures de protection (ordonnances de protection), des peines encourues et conditions d'exécution.", "Droit à un interprète et une traduction si la langue française n'est pas comprise.", "Droit d'être accompagnée à tous les stades par son représentant légal ou une personne majeure de son choix (avocat compris), sauf décision contraire motivée.", "Droit de déclarer comme domicile l'adresse d'un tiers (accord exprès) — ou son adresse professionnelle sans accord si dépositaire de l'autorité publique/mission de service public visé en raison de ses fonctions, ou professionnel de santé libéral.", "Droit à la remise du certificat d'examen médical si un examen a été requis par un OPJ/magistrat."] },
              { niveau: "B", titre: "Mesures de protection générales", enfants: [
                { titre: "1. Assistance d'un interprète", reference: "Art. 10-3 C.P.P.", texte: "Traduction des informations indispensables à l'exercice des droits." },
                { titre: "2. Accompagnement", reference: "Art. 10-4 C.P.P.", texte: "À tous les stades (notamment auditions), accompagnement par représentant légal ou personne majeure du choix de la victime (avocat compris), sauf décision contraire motivée. L'avocat accompagnant **ne peut intervenir pendant l'audition** — il attend la fin pour poser des questions (retranscrites au PV) ou présente des observations écrites annexées." },
              ]},
              { niveau: "C", titre: "Évaluation personnalisée", reference: "Art. 10-5, D.1-9 C.P.P.", texte: "L'agent mentionne au PV les éléments déterminant la nécessité de mesures spéciales : importance du préjudice, circonstances de commission, vulnérabilité particulière, risque d'intimidation/représailles. Une évaluation **approfondie** peut être réalisée uniquement par une association conventionnée, sur décision du procureur/juge d'instruction." },
              { niveau: "D", titre: "Mesures de protection spécifiques", enfants: [
                { titre: "1. Mineur victime d'un crime ou d'un délit", reference: "Art. 706-53 C.P.P.", texte: "Peut être accompagné (à sa demande) d'un représentant légal, d'une personne majeure de son choix, ou d'un représentant d'association agréée.", points: ["Le mineur peut dénoncer seul les faits et porter plainte — enquête possible même sans confirmation du représentant légal, sous réserve de son discernement.", "Le civilement responsable prend connaissance des déclarations ensuite (sauf s'il est mis en cause).", "**Nota** (art. D.1-12 C.P.P.) : le médecin peut refuser de remettre copie du certificat médical aux représentants légaux si contraire à l'intérêt supérieur de l'enfant (suspicion de violences intrafamiliales) ou si le mineur suffisamment mature le refuse."] },
                { titre: "2. Mineur victime d'infraction à caractère sexuel", reference: "Art. 706-47, 706-52 C.P.P.", texte: "**Enregistrement audiovisuel obligatoire** de l'audition (limite le nombre d'auditions, permet de déceler des éléments non verbalisés) — également possible pour le harcèlement scolaire. Peut être exclusivement sonore sur décision du procureur/juge d'instruction si l'intérêt du mineur le justifie.", points: ["Même filmée, l'agent établit toujours un PV d'audition/entretien selon l'âge.", "Désignation systématique des services d'enquête spécialisés (savoir-faire/méthodologie spécifiques)."] },
                { titre: "3. Préconisations DGPN — accueil de victime transgenre", texte: "Accueil selon la théorie de l'apparence, puis selon le genre déclaré. Respecter ce choix dans le corps du PV (civilité, prénom), tout en faisant apparaître le genre/prénom des documents officiels dans les rubriques « identité » du LRPPN." },
                { titre: "4. Victime de violences conjugales", enfants: [
                  { titre: "Prise en charge", points: ["**Jamais subordonnée** à un certificat médical préalable.", "Accompagnement possible (représentant légal, personne majeure, avocat) sauf décision contraire motivée (art. 10-2 8° C.P.P.).", "Domiciliation possible chez un tiers avec son accord exprès (art. 10-2 9° C.P.P.).", "Orientation prioritaire vers les policiers spécialisés (Brigade de Protection de la Famille/référents) ; l'OPJ de permanence veille à la qualité de la prise en charge hors heures ouvrables.", "**Dispositif « tableau d'accueil confidentialité »** : prise en compte discrète et prioritaire dès l'accueil."] },
                  { titre: "Recueil des déclarations", points: ["**Principe** : dépôt de plainte ou audition (texte type disponible sur LRPPN).", "**Exception** : déclaration MCI ou PV uniquement en cas de refus explicite (mentionné en MCI) ; si aucun acte n'a pu être rédigé, mention de main courante voire PV si faits graves révélés et victime identifiée.", "Avis systématique à la hiérarchie et au parquet.", "Réquisition aux fins d'examen médical (descriptif des blessures + retentissement psychologique)."] },
                  { titre: "En milieu hospitalier", texte: "Si l'état de santé ne permet pas le déplacement, dans le cadre de conventions police/santé/parquet, l'établissement met à disposition un local pour la prise de plainte." },
                  { titre: "Les mesures de protection", points: ["**Remise systématique** d'un document d'information (coordonnées des intervenants sociaux, psychologues, associations).", "**Grille d'évaluation du danger** : impérative, sur LRPPN, annexée à la procédure/MCI et adressée au parquet.", "**Bracelet anti-rapprochement** (art. 15-3-2, 138-3 C.P.P.) : pour une infraction punie d'au moins 3 ans commise par le conjoint/concubin/partenaire PACS (actuel ou ancien), la victime doit être informée qu'elle peut en demander le bénéfice lors du dépôt de plainte."] },
                  { titre: "La mise en sécurité de la victime", points: ["**Hébergement d'urgence** : dispositifs locaux, 115, ou plateforme de géolocalisation des places d'hébergement (via CHEOPS) si le 115 est indisponible.", "**Accompagnement au domicile** pour récupérer des effets de première nécessité, selon la disponibilité opérationnelle."] },
                  { titre: "Consultation systématique des fichiers et saisie des armes", points: ["T.A.J., main courante informatisée (MCI), F.P.R., base locale LRPPN.", "**AGRIPPA** (gestion du répertoire des propriétaires/possesseurs d'armes)."] },
                ]},
              ]},
            ]},
            { niveau: "III", titre: "Les modèles de procès-verbaux", points: ["**P.V.O.** (procès-verbal ordinaire) : plaintes contre auteur connu, sans recherche ni interrogation immédiate des fichiers (TAJ, FOVeS) — ex : violences entre époux, dégradations.", "**Procès-verbaux normalisés** : pour les plaintes contre X — ex : PV de voie publique, C.R.I. (compte-rendu d'infraction initiale), compte-rendu d'infraction complémentaire, PV de vol de véhicule immatriculé, découverte/restitution de véhicule, utilisation frauduleuse de moyen de paiement."] },
            { niveau: "IV", titre: "Les services en ligne", enfants: [
              { niveau: "A", titre: "La plainte en ligne", reference: "Art. 15-3-1, D.8-2-1 C.P.P.", texte: "Accessible via plainte-en-ligne.masecurite.interieur.gouv.fr, pour les atteintes aux biens dont l'auteur est inconnu — **ne peut être imposée** à la victime.", points: ["Concerne : appropriations frauduleuses (vol, escroquerie, filouterie), destructions/dégradations, délit de fuite, certaines contraventions contre les biens.", "Traitement dématérialisé (si aucun acte ne requiert la présence de la victime) ou finalisé en présentiel.", "**N'exempte pas** d'une audition ultérieure si la nature/gravité des faits le justifie.", "**THÉSÉE** (e-escroqueries via internet) et **Perceval** (fraude à la carte bancaire) pour les infractions dématérialisées spécifiques (art. D.8-2-1/III C.P.P. : e-escroquerie, e-chantage, e-extorsion connexe à un STAD)."] },
              { niveau: "B", titre: "Le portail de signalement des violences sexuelles et sexistes", texte: "Accessible 24h/24 - 7j/7 via masecurite.interieur.gouv.fr, messagerie type « tchat », échange avec des policiers formés à l'accueil des victimes de violences sexuelles/sexistes/conjugales." },
              { niveau: "C", titre: "La « visioplainte »", reference: "Art. 15-3-1-1 C.P.P.", texte: "Toute victime peut déposer plainte et voir sa déposition recueillie par un moyen de télécommunication audiovisuelle." },
            ]},
          ],
        },
        {
          titre: "Canevas et modèles de procès-verbaux de plainte — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit plusieurs **canevas** (modèles à remplir) : PV de plainte C/X (PV de saisine), PV de plainte C/personne dénommée (PV de saisine et PV suite), ainsi que la grille d'évaluation du danger et le PV de plainte d'une victime de violences conjugales. Ces canevas sont des outils de rédaction pratique (structure des rubriques à compléter), et non du contenu conceptuel — les règles de fond qui les sous-tendent sont intégralement détaillées dans la fiche « La plainte — Généralités » ci-dessus. Se référer au fascicule original (pages 18 à 42) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 3,
      titre: "Les constatations",
      fiches: [
        {
          titre: "Les constatations — Généralités",
          definition: "Les constatations ont pour but de fixer l'état des lieux, d'établir la réalité de l'infraction et de rechercher les objets, traces et indices susceptibles d'orienter l'enquête. Le déroulement n'est pas immuable : il dépend de la nature de l'infraction, des circonstances et des lieux (voie publique, lieux publics, propriétés privées).",
          plan: [
            { niveau: "I", titre: "Généralités", texte: "Sur place, les premiers intervenants doivent développer les réflexes suivants :", points: ["Visite de sécurité/pénétration des lieux.", "Évacuation des lieux (auteur resté sur place, blessés éventuels).", "Interdiction d'accès (périmètre de sécurité si la gravité l'exige).", "Protection des traces (intempéries) et avis au représentant de la police technique et scientifique.", "Pour les mesures conservatoires urgentes sans attendre la PTS : prélèvement avec gants, notation des emplacements au moment du prélèvement, placement dans un contenant protecteur, remise au plus vite au service PTS compétent."] },
            { niveau: "II", titre: "Constatations", enfants: [
              { titre: "Les modèles de procès-verbaux", points: ["**P.V.O.** : si l'affaire débute contre personne dénommée.", "**Procès-verbal normalisé** (C.R.I. initial ou complémentaire) : si l'affaire débute contre auteur inconnu, ou si des éléments importants apparaissent en cours d'enquête contre personne dénommée (objets décrits, traces/indices, mode opératoire, auteurs remarqués)."] },
              { titre: "L'assistance P.T.S.", texte: "Le transport du représentant PTS (SDPTS, BPTS ou SRPTS) doit être **systématique** sur les scènes d'infraction, notamment en petite/moyenne délinquance. L'OPJ/APJ préserve les lieux et les traces jusqu'aux opérations PTS — les constatations ne débutent normalement qu'en présence du fonctionnaire PTS, sauf nécessité absolue. Recommandé de remplir l'annexe II pour les cambriolages." },
              { titre: "La découverte d'une arme", texte: "Mise en protection immédiate et conservation des traces :", points: ["**Port de gants** jetables (et masque anti-poussière si disponible).", "**Mise en sécurité de l'arme** selon les règles habituelles.", "**Compte-rendu des constatations** : position des éléments mobiles au moment de la découverte (cartouche engagée, douille percutée, position de la culasse/du chien), positions respectives des munitions dans le barillet.", "**Conditionnement séparé** de l'arme et des éléments d'approvisionnement (chargeur, munitions extraites) — emballage kraft ou cartonné maintenant l'arme sans frottement, avant remise à l'O.P.J. pour scellé.", "Si le protocole ne peut être respecté : établir un périmètre de sécurité et ne pas modifier les lieux avant l'arrivée de la PTS."] },
            ]},
            { titre: "Le canevas du procès-verbal de constatations — points clés", points: ["**Lieu de saisine** : endroit exact où se situe l'équipage.", "**Instructions** : en patrouille, conformément aux instructions permanentes du chef de service ; sur demande de l'OPJ (après plainte), en flagrance selon ses instructions, ou en préliminaire sous son contrôle.", "**Assistants éventuels** : fonctionnaires accompagnant le rédacteur.", "**Mission** : but de la mission initiale.", "**Saisine** : mode de saisine (réquisition de victime, avis téléphonique, appel radio du CIC) + mesures conservatoires prises/sollicitées.", "**Cadre juridique** : flagrance (constatations proches de l'infraction) ou préliminaire (ex : cambriolage constaté plusieurs jours après).", "**Transport** : localisation exacte, heure précise d'arrivée, prise de contact avec le requérant/la victime (petite identité), vérification de la matérialité des faits.", "**Assistance P.T.S.** : mention de la présence/heure d'arrivée du fonctionnaire PTS, réquisition éventuelle exigée par le service. **Nota** : le CPP n'impose pas la présence du chef de maison ou de deux témoins pour des constatations à domicile — règle traditionnelle de prudence, non une obligation légale."] },
          ],
        },
        {
          titre: "Fiche de renseignements et modèles de PV de constatations — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets de PV de constatations (compte-rendu d'infraction initial C.R.I., etc.), une fiche de renseignements pratique et des exemples d'images/schémas illustratifs. Ces éléments sont des outils de rédaction pratique dont les règles de fond sont détaillées dans la fiche « Les constatations — Généralités » ci-dessus. Se référer au fascicule original (pages 46 à 60) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 4,
      titre: "Le témoignage",
      fiches: [
        {
          titre: "Le témoignage — Généralités",
          reference: "Art. 62, 78, 706-57, 706-58 du Code de procédure pénale",
          definition: "Le témoignage est un des éléments essentiels de l'enquête : il permet de déterminer les circonstances de l'affaire, d'orienter les recherches et parfois d'identifier les auteurs — mais reste un mode de preuve précaire.",
          plan: [
            { niveau: "I", titre: "Généralités", texte: "Toute personne est tenue d'apporter son concours à la justice, mais rares sont les témoins spontanés. L'enquêteur doit les rechercher :", points: ["En relevant l'identité des témoins présents sur les lieux.", "Par une enquête de voisinage (le jour même ou les jours suivants).", "Par un appel à la presse.", "Par l'audition des proches."] },
            { niveau: "II", titre: "L'enquête de voisinage", texte: "Technique de police judiciaire consistant à rechercher, près du lieu de l'infraction, des témoins susceptibles de faire progresser l'enquête (déroulement des faits, éléments d'investigation).", points: ["**Témoin visuel** : a vu la commission de l'infraction, l'itinéraire des auteurs.", "**Témoin auditif** : a entendu des informations.", "Superficie variable (immeuble entier, parcours) — choix de la zone du ressort du directeur d'enquête.", "L'enquêteur fait du porte-à-porte, questionne, note les absents, convoque les témoins utiles, peut revenir sur les lieux."] },
            { niveau: "III", titre: "L'audition du témoin", texte: "Doit être effectuée **le plus tôt possible** pour éviter que les souvenirs se modifient/s'effacent. Accueil convenable, comportement attentionné, mettre en confiance.", points: ["Peut avoir lieu sur les lieux de l'infraction, dans les locaux de police (spontané ou convocation), ou au domicile/tout autre lieu du témoin (hôpital)."], enfants: [
              { titre: "Le récit spontané", texte: "Libre évocation des souvenirs, permettant de situer le témoin (date, heure, lieu, circonstances de sa présence) et de décrire l'événement (vu, entendu, fait). **Les expressions du témoin sont reproduites telles quelles, entre guillemets.** Son opinion (« je pense », « je crois ») peut être mentionnée." },
              { titre: "Le récit guidé", texte: "L'enquêteur demande des précisions si le récit est imprécis ou incomplet. Les questions doivent être **« ouvertes »**, ne jamais suggérer la réponse. L'enquêteur reste objectif et impartial." },
            ]},
            { niveau: "IV", titre: "La protection du témoin", enfants: [
              { titre: "Le droit de ne pas être retenu", reference: "Art. 62 C.P.P.", texte: "Les témoins (aucune raison plausible de soupçon) sont entendus sans mesure de contrainte. Si nécessaire, rétention possible le temps strictement nécessaire à l'audition, **sans excéder 4 heures** — ce délai ne s'applique pas si la personne comparaît librement et sait qu'elle peut quitter à tout moment." },
              { titre: "Le droit de ne pas déposer", reference: "Art. 78 C.P.P.", texte: "Les personnes convoquées par un O.P.J. sont tenues de comparaître (contrainte par la force publique possible avec autorisation du procureur en cas de non-réponse). **Mais le témoin n'est pas tenu de déposer** — aucune sanction en cas de refus, mention de ce refus au PV." },
              { titre: "Le domicile", reference: "Art. 706-57 C.P.P.", points: ["Domiciliation possible au commissariat/brigade saisi de l'enquête (mesure de sécurité, sur autorisation du procureur/juge d'instruction), ou sur le lieu de travail si convoqué en raison de sa profession.", "**Autorisation non nécessaire** si le témoin est dépositaire de l'autorité publique/mission de service public et rapporte des faits connus dans ce cadre.", "L'adresse personnelle est inscrite sur un registre dédié (papier ou numérique)."] },
              { titre: "L'anonymat", reference: "Art. 706-58 C.P.P.", texte: "Audition anonyme possible sur autorisation du **juge des libertés et de la détention**, si l'enquête porte sur un crime/délit puni d'au moins 3 ans et si l'audition risque de mettre gravement en danger la vie/l'intégrité du témoin ou de ses proches.", points: ["La décision du JLD est jointe au PV « anonyme » non signé par le témoin.", "L'identité/l'adresse sont inscrites dans un PV distinct signé, versé dans un dossier séparé.", "Inscription sur un registre coté et paraphé, ouvert au tribunal judiciaire."] },
            ]},
            { titre: "Le canevas du PV d'enquête de voisinage — points clés", points: ["**Lieu de l'opération** : endroit exact de l'enquête de voisinage.", "**Instructions** : en flagrance selon les instructions de l'OPJ, en préliminaire sous son contrôle.", "**Cadre juridique** : flagrance ou préliminaire.", "**Assistants éventuels.**", "**Opération** : lieu (adresses précises), personnes contactées, résultat (négative ou identification succincte des témoins avec résumé du témoignage)."] },
          ],
        },
        {
          titre: "Canevas de procès-verbal d'audition de témoin — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit le canevas complet du procès-verbal d'audition de témoin, outil de rédaction pratique dont les règles de fond sont détaillées dans la fiche « Le témoignage — Généralités » ci-dessus. Se référer au fascicule original (pages 64 à 68) pour le modèle complet." },
          ],
        },
      ],
    },
    {
      numero: 5,
      titre: "Le contrôle d'identité",
      fiches: [
        {
          titre: "Le contrôle d'identité — Le cadre général",
          reference: "Art. 78-1 à 78-6 du Code de procédure pénale — Art. R.434-16 C.S.I.",
          definition: "Le contrôle d'identité est l'opération par laquelle une personne est invitée à justifier sur-le-champ de son identité. « Le policier ne se fonde sur aucune caractéristique physique ou signe distinctif pour déterminer les personnes à contrôler, sauf s'il dispose d'un signalement précis motivant le contrôle. Le contrôle se déroule sans qu'il soit porté atteinte à la dignité de la personne » (art. R.434-16 C.S.I.).",
          plan: [
            { niveau: "I", titre: "Les personnes concernées", texte: "Toute personne se trouvant sur le territoire national doit accepter de se prêter à un contrôle effectué dans les conditions légales (art. 78-1 C.P.P.)." },
            { niveau: "II", titre: "Les autorités habilitées", enfants: [
              { titre: "Dans tous les cas prévus par le CPP", texte: "Seuls les O.P.J., et sur leur ordre et sous leur responsabilité, les A.P.J. et certains A.P.J.A. (art. 21/1° C.P.P.), sont habilités." },
              { titre: "Dans certains cas seulement (art. 78-2-2, 78-2-4 C.P.P.)", texte: "Les policiers adjoints/réservistes non OPJ 16-1 A ou APJ 20-1, et les militaires de gendarmerie non APJ 20-1 (art. 21-1° ter, 21-1° bis C.P.P.). **Hors ces cas, ces agents ne peuvent que relever l'identité** (art. 78-6 C.P.P.) des contrevenants pour dresser PV de contravention — le relevé d'identité est une opération judiciaire faisant suite à une infraction." },
            ]},
            { niveau: "III", titre: "Les moyens de preuve de l'identité", reference: "Art. 78-2 al.1 C.P.P.", enfants: [
              { titre: "Les documents officiels probants", texte: "Preuve irréfutable : documents avec photographie issus d'une procédure d'identification préalable (CNI, passeport, permis de conduire)." },
              { titre: "Les autres documents", texte: "Sans photographie/reconnaissance officielle : simple commencement de preuve (carte d'électeur, certificat d'immatriculation, livret de famille) — appréciation selon les circonstances." },
              { titre: "Le recours à des témoignages", texte: "En cas de document non probant (ou absence de pièce), confirmation possible par témoignages concomitants — pratique laissée à l'appréciation des policiers." },
            ]},
          ],
        },
        {
          titre: "Les cas dans lesquels le policier peut procéder à un contrôle d'identité",
          reference: "Art. 78-2 à 78-2-5, L.2241-1-2 Code des transports",
          plan: [
            { niveau: "I", titre: "Les contrôles relevant de la police judiciaire", reference: "Art. 78-2 al.1 à 7 C.P.P.", enfants: [
              { niveau: "A", titre: "À l'initiative des policiers", reference: "Art. 78-2 al.2 à 6 C.P.P.", texte: "L'identité peut être contrôlée s'il existe une ou plusieurs raisons plausibles de soupçonner :", points: ["Qu'elle a commis ou tenté de commettre une infraction (crime, délit, contravention) — al.2.", "Qu'elle se prépare à commettre un crime ou un délit — al.3 (comportement anormal : hésitation, changement brusque de direction, fuite, passages répétés devant une banque).", "Qu'elle est susceptible de fournir des renseignements utiles à l'enquête en cas de crime/délit (contraventions exclues) — al.4.", "Qu'elle a violé les obligations d'un contrôle judiciaire, d'une assignation à résidence sous surveillance électronique, d'une peine/mesure suivie par le JAP — al.5.", "Qu'elle fait l'objet de recherches ordonnées par une autorité judiciaire (parquet, juge d'instruction, juridiction de jugement, JAP, juge des enfants) — al.6 ; **exclut les diffusions administratives** (débiteurs du Trésor, mineurs en fugue, arrêtés d'expulsion)."] },
              { niveau: "B", titre: "Sur réquisition du procureur de la République", reference: "Art. 78-2 al.7 C.P.P.", texte: "Réquisitions écrites précisant les infractions à rechercher et déterminant lieux/période. Vise **« toute personne »** présente sur les lieux. La découverte d'infractions autres que celles visées n'entache pas la procédure de nullité." },
            ]},
            { niveau: "II", titre: "Les contrôles d'identité préventifs", reference: "Art. 78-2 al.8 C.P.P.", texte: "Contrôle de toute personne, **quel que soit son comportement**, pour prévenir une atteinte à l'ordre public (sécurité des personnes/biens) — basé sur des éléments objectifs, appréciation laissée aux agents (qui doivent préciser en quoi la menace existe).", enfants: [
              { titre: "1. Conditions de lieux", texte: "Uniquement lieux publics ou ouverts au public (gare, débit de boissons, salle de spectacle, galerie marchande). **Jamais au domicile** — y relèverait de la perquisition." },
              { titre: "2. Conditions de temps", texte: "Motivés par des circonstances particulières (alertes à la bombe, grands rassemblements) — la simple affirmation qu'un lieu est propice aux infractions ne suffit pas." },
            ]},
            { niveau: "III", titre: "Les contrôles d'identité en zone frontière", reference: "Art. 78-2 al.9 à 17 C.P.P.", texte: "Vérification du respect des obligations de détention/port/présentation des titres, dans des zones délimitées :", points: ["**20 km** en deçà des frontières terrestres avec les pays Schengen — durée limitée 12h consécutives, caractère aléatoire (non systématique) ; extension possible jusqu'au 1er péage autoroutier au-delà.", "Zones publiques des ports/aéroports/gares internationales désignés par arrêté, et leurs abords.", "Trains transnationaux (Allemagne, Belgique, Espagne, Suisse, Italie) : entre la frontière et le 1er arrêt au-delà de 20 km, ou jusqu'à 50 km suivants pour certaines lignes.", "**10 km** autour de certains ports/aéroports frontaliers désignés par arrêté — mêmes conditions (12h, aléatoire).", "Zones spécifiques en Guyane (20 km + 5 km de part et d'autre + RN2 Regina), Guadeloupe (1 km + RN désignées), Mayotte (tout le territoire), Saint-Martin/Saint-Barthélemy (1 km), Martinique (1 km + routes désignées)."] },
            { niveau: "IV", titre: "Les contrôles dans les locaux professionnels", reference: "Art. 78-2-1 C.P.P.", texte: "Pour vérifier l'absence de travail dissimulé : sur réquisitions écrites du procureur, précisant infractions et lieux (locaux exclusivement professionnels, hors domiciles), durée maximale **1 mois**, visant toutes les personnes occupées dans l'entreprise." },
            { niveau: "V", titre: "Contrôles d'identité, visites de véhicules et inspections de bagages", enfants: [
              { titre: "1. Sur réquisitions écrites du procureur", reference: "Art. 78-2-2 C.P.P.", texte: "Les OPJ (et sur leur ordre, APJ/APJA) peuvent, dans les lieux/périodes déterminés : contrôler l'identité (art. 78-2 al.7, pour terrorisme/explosifs/stupéfiants...), assister les OPJ pour la visite de véhicules en circulation/arrêt/stationnement, l'inspection/fouille de bagages, ou la visite de bateaux/engins flottants." },
              { titre: "2. En cas de crime ou délit flagrant", reference: "Art. 78-2-3 C.P.P.", texte: "APJ/APJA peuvent assister les OPJ pour visiter un véhicule si raison plausible de soupçonner le conducteur/passager d'un crime/délit flagrant. **Ne prévoit pas** le contrôle d'identité ni l'inspection de bagages." },
              { titre: "3. Pour prévenir une atteinte grave à la sécurité", reference: "Art. 78-2-4 C.P.P.", texte: "OPJ (et sous leur ordre, APJ/APJA) peuvent procéder aux contrôles de l'art. 78-2 al.8, à la visite de véhicules (avec l'accord du conducteur, ou sur instructions du procureur — immobilisation possible **30 min max** dans l'attente), et à l'inspection/fouille de bagages (avec l'accord du propriétaire, ou sur instructions du procureur — rétention **30 min max**)." },
              { titre: "4. Manifestation avec port d'arme", reference: "Art. 78-2-5 C.P.P., 431-10 C.P.", texte: "Sur réquisitions écrites du procureur, aux lieux d'une manifestation et abords immédiats, pour une durée **maximale de 24h** : inspection/fouille des bagages, visite des véhicules." },
              { titre: "5. Réseaux ferroviaires et guidés", reference: "Art. L.2241-1-2 C. transports", texte: "OPJ/APJ territorialement compétents (d'initiative), APJA : inspection visuelle des bagages sur les lignes/gares, fouille avec le consentement du propriétaire." },
              { titre: "6. Modalités d'exécution", enfants: [
                { titre: "a. Visite d'un véhicule", texte: "Immobilisation limitée au temps strictement nécessaire. En présence du conducteur/propriétaire ; à défaut, réquisition d'une personne extérieure (sauf risque grave pour la sécurité). **Nota** : les véhicules aménagés en habitation (caravanes) effectivement utilisés comme résidence relèvent des règles de perquisition/visite domiciliaire." },
                { titre: "b. Inspection/fouille des bagages", texte: "En présence du propriétaire, retenu le temps strictement nécessaire." },
                { titre: "c. Rédaction d'un procès-verbal", texte: "Obligatoire si découverte d'une infraction, si le conducteur/propriétaire le demande, ou si la visite a lieu en son absence — un exemplaire remis à l'intéressé, un transmis au procureur." },
              ]},
            ]},
          ],
        },
        {
          titre: "La vérification d'identité et la vérification de situation",
          reference: "Art. 78-3, 78-3-1 du Code de procédure pénale",
          plan: [
            { niveau: "I", titre: "La vérification d'identité", reference: "Art. 78-3 C.P.P.", texte: "Si l'intéressé refuse ou ne peut justifier son identité, il peut être retenu sur place ou conduit au local de police pour vérification, et doit dans tous les cas être présenté à un O.P.J. **Retenue de la responsabilité exclusive de l'O.P.J., maximum 4 heures** (8h à Mayotte et en Guyane).", points: ["Droits notifiables par un OPJ, ou un APJ sous contrôle d'un OPJ : faire aviser le procureur de la vérification, prévenir à tout moment sa famille ou une personne de son choix."] },
            { niveau: "II", titre: "La vérification de situation", reference: "Art. 78-3-1 C.P.P.", texte: "Toute personne contrôlée/vérifiée peut, si des raisons sérieuses de lien avec des activités terroristes apparaissent (même avec un justificatif d'identité valide), faire l'objet d'une retenue pour vérification de sa situation.", points: ["Signalement au FPR par fiche S14/S15 (avis au service demandeur) + présence près d'un site sensible — vérification possible aussi des personnes l'accompagnant.", "Signalement d'un service de renseignement/investigations (hors recherches judiciaires).", "Comportement suspect aux abords d'un établissement sensible (repérages).", "Découverte d'objets/documents présumant un lien avec des activités terroristes."] },
          ],
        },
        {
          titre: "Canevas de PV de contrôle et vérification d'identité — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets de PV de contrôle d'identité, et de contrôle d'identité avec fiche de recherche. Ces outils de rédaction pratique sont sous-tendus par les règles détaillées dans les fiches ci-dessus. Se référer au fascicule original (pages 76 à 84) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 6,
      titre: "L'interpellation, la conduite au poste et les mandats",
      fiches: [
        {
          titre: "L'interpellation",
          reference: "Art. 73, 78, 803 du Code de procédure pénale — Art. R.434-16 à R.434-18 C.S.I.",
          definition: "« Dans le cas de crime flagrant ou de délit flagrant puni d'une peine d'emprisonnement, toute personne a qualité pour en appréhender l'auteur et le conduire devant l'officier de police judiciaire le plus proche » (art. 73 C.P.P.). Le placement en garde à vue n'est pas automatique si la personne n'est pas tenue sous la contrainte et a été informée qu'elle peut à tout moment quitter les locaux — sauf si elle a été conduite par la force publique.",
          plan: [
            { niveau: "I", titre: "L'interpellation", enfants: [
              { titre: "Généralités", texte: "N'est autorisée qu'en cas de crime ou délit flagrant puni d'emprisonnement — impossible pour un délit puni d'une simple amende ou une contravention. Possible dans les lieux publics (ou libres d'accès).", points: ["**L'introduction dans un lieu privé** en vue d'interpeller n'est possible que par les seuls O.P.J., durant les heures légales (6h-21h).", "**L'A.P.J. peut s'introduire dans un domicile** : même hors heures légales pour porter secours (réclamation intérieure art. 59, assistance à personne en péril art. 223-6 al.2, état de nécessité) — une introduction légale autorise ensuite tous les actes permis par la loi, dont l'interpellation ; ou uniquement pendant les heures légales pour l'exécution d'un mandat (amener, arrêt, recherche), au dernier domicile connu, dans le seul but d'appréhender la personne visée.", "**En enquête préliminaire** : toute personne convoquée par un O.P.J. est tenue de comparaître, sinon contrainte possible par la force publique avec l'autorisation du procureur (art. 78 C.P.P.) — l'appréhension forcée n'est possible que **sur la voie publique**."] },
              { titre: "L'usage de la coercition", reference: "Art. R.434-18 C.S.I.", texte: "L'emploi de la force n'intervient qu'en cas de nécessité et de façon proportionnée — tout recours injustifié constitue des violences illégitimes (responsabilité pénale et disciplinaire). Décrire précisément dans le rapport/PV les actes de résistance et les moyens de coercition employés ; distinguer les blessures dues à l'interpellation de celles antérieures (constat médical nécessaire) ; provoquer immédiatement les secours si l'état de santé est déficient." },
              { titre: "Les circonstances déterminant la garde à vue", points: ["La personne conduite **sous la contrainte** (menottée, contrainte à monter dans un véhicule) doit être placée en garde à vue dès lors que les conditions sont réunies — sauf si l'O.P.J. estime que la GAV n'est pas l'unique moyen d'atteindre un objectif de l'art. 62-2 C.P.P., et la remet en liberté avec convocation ultérieure.", "Un individu mis à disposition **n'est pas nécessairement placé en GAV** s'il a été appréhendé sans contrainte par une personne autre qu'un agent de la force publique (agent de sécurité RATP/SNCF...), ou s'il accepte de se rendre/être conduit sans aucune coercition."] },
            ]},
            { niveau: "II", titre: "La palpation", reference: "Art. R.434-16 C.S.I.", texte: "Justifiée à la suite d'une interpellation, dès lors qu'il faut vérifier l'absence d'objet dangereux. Effectuée par une personne du **même sexe** (sauf urgence/dangerosité exceptionnelle), par **un seul fonctionnaire** (les autres assurant la protection), **à travers les vêtements uniquement** — aucune dénudation. Découverte suspecte : information immédiate des collègues, appréhension pour remise à l'O.P.J." },
            { niveau: "III", titre: "Le menottage", reference: "Art. 803 C.P.P., R.434-17 C.S.I.", texte: "Justifié seulement si le comportement laisse supposer une dangerosité pour soi/autrui ou un risque de fuite. Décision relevant de l'appréciation personnelle du fonctionnaire — mesure particulière pour les mineurs et personnes à mobilité réduite. **Jamais excessivement serré.** **Nota** : dans un véhicule de service, l'interpellé est obligatoirement positionné à l'arrière, côté droit." },
            { niveau: "IV", titre: "La présentation à l'officier de police judiciaire", texte: "Dès la fin de l'intervention, conduite sans délai à un O.P.J., dans des conditions de transport dignes — la rapidité permet de respecter les obligations légales de la garde à vue. Si le délai est trop long, l'O.P.J. avisé par radio peut décider d'une GAV et ordonner aux intervenants d'informer verbalement le mis en cause de ses droits (art. 63-1 à 63-4-3 C.P.P.). L'interpellation se concrétise par un PV (A.P.J./O.P.J.) ou un rapport de mise à disposition (A.P.J.A. 21)." },
            { titre: "Le canevas de PV d'interpellation — points clés supplémentaires", points: ["**Visa de l'article du contrôle d'identité** : référence à l'alinéa de l'art. 78-2 ou 78-2-1 selon les constatations.", "**Instructions** : l'A.P.J. n'a pas l'obligation de solliciter l'autorisation préalable d'un O.P.J. pour contrôler l'identité — la formule « sur l'ordre et sous la responsabilité » doit figurer au PV **sous peine de nullité**.", "**Le menottage** ne peut être employé que si la personne a manifesté clairement son intention de se soustraire (menaces, gestes) ou est susceptible d'être dangereuse.", "**Identité de l'interpellé** : état civil et adresse uniquement, en style indirect — à l'exclusion de tout autre élément de personnalité (situation familiale/professionnelle).", "**Mention finale** : les recherches administratives négatives (F.P.R., T.A.J.) sont inscrites après l'avis à l'O.P.J., pour préciser qu'elles ont bien été effectuées."] },
          ],
        },
        {
          titre: "Les mandats (recherche, comparution, amener, arrêt)",
          reference: "Art. 122 du Code de procédure pénale",
          definition: "Les 4 mandats délivrés par un magistrat (juge d'instruction) constituent des ordres donnés à la force publique, avec des degrés de coercition variables.",
          plan: [
            { niveau: "I", titre: "Le mandat de recherche", reference: "Art. 122 al.2 C.P.P.", texte: "Ordre donné à la force publique par un magistrat de rechercher la personne visée et de la placer en garde à vue.", points: ["**Coercition possible.** Introduction au domicile possible pendant les heures légales.", "Notification et exécution par O.P.J., A.P.J., ou agent de la force publique — exhibition du mandat et remise d'une copie.", "Placement en garde à vue par l'O.P.J. du lieu de découverte."] },
            { niveau: "II", titre: "Le mandat de comparution", reference: "Art. 122 al.4 C.P.P.", texte: "Le juge d'instruction met en demeure la personne de se présenter devant lui à la date et l'heure indiquées — **simple assignation à comparaître.**", points: ["**Pas de coercition.**", "Signifié par huissier, ou notifié par O.P.J./A.P.J./agent de la force publique — remise d'une copie."] },
            { niveau: "III", titre: "Le mandat d'amener", reference: "Art. 122 al.5 C.P.P.", texte: "Ordre donné à la force publique par un magistrat de conduire immédiatement la personne devant lui.", points: ["**Coercition possible.** Introduction au domicile possible pendant les heures légales.", "Notification et exécution par O.P.J./A.P.J./agent de la force publique — exhibition du mandat et remise d'une copie."], enfants: [
              { titre: "Exécution à 200 km au plus", texte: "Présentation immédiate au magistrat mandant, ou rétention 24h maximum." },
              { titre: "Exécution à plus de 200 km", texte: "Présentation dans les 24h au magistrat mandant, ou saisine du JLD du lieu d'arrestation si la conduite dans les 24h est impossible." },
            ]},
            { niveau: "IV", titre: "Le mandat d'arrêt", reference: "Art. 122 al.6 C.P.P.", texte: "Ordre donné à la force publique par un magistrat de rechercher une personne **en fuite ou résidant hors du territoire de la République**, et de la conduire devant lui — après l'avoir, le cas échéant, conduite à la maison d'arrêt indiquée sur le mandat où elle sera reçue et détenue.", points: ["**Coercition possible.** Introduction au domicile possible pendant les heures légales.", "Notification et exécution par O.P.J., A.P.J., ou agent de la force publique — exhibition du mandat et remise d'une copie."] },
          ],
        },
        {
          titre: "Canevas de PV de notification de mandat et de recherches infructueuses — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets de PV de notification de mandat et de PV de recherches infructueuses en exécution d'un mandat, outils de rédaction pratique dont les règles de fond sont détaillées dans la fiche « Les mandats » ci-dessus. Se référer au fascicule original (pages 106 à 117) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 7,
      titre: "La garde à vue et le suspect libre",
      fiches: [
        {
          titre: "La notification du placement en garde à vue et des droits par un A.P.J.",
          reference: "Art. 62-2, 63-1 à 63-4-3 du Code de procédure pénale",
          definition: "Si la décision de placer en garde à vue reste du domaine exclusif de l'O.P.J., le gardien de la paix (A.P.J.) peut être amené à notifier à une personne son placement et les droits inhérents.",
          plan: [
            { niveau: "I", titre: "Généralités", enfants: [
              { titre: "Personnes concernées", texte: "Seules les personnes à l'encontre desquelles existent des raisons plausibles de soupçonner qu'elles ont commis/tenté de commettre un **crime ou un délit puni d'emprisonnement** (art. 62-2 al.1 C.P.P.) — impossible pour une contravention ou un délit puni uniquement d'amende." },
              { titre: "Objectifs visés", texte: "La mesure doit être l'unique moyen de parvenir à l'un au moins des objectifs (art. 62-2 C.P.P.) :", points: ["1. Permettre l'exécution des investigations impliquant la présence/participation de la personne.", "2. Garantir sa présentation devant le procureur pour apprécier la suite à donner.", "3. Empêcher la modification des preuves/indices matériels.", "4. Empêcher les pressions sur témoins/victimes/famille/proches.", "5. Empêcher la concertation avec coauteurs/complices.", "6. Garantir la mise en œuvre des mesures destinées à faire cesser le crime/délit."] },
              { titre: "La durée", texte: "**24h de droit commun**, point de départ = privation de liberté. **Prolongation de 24h maximum** sur demande de l'O.P.J. accordée par le procureur, si l'infraction est punie d'au moins 1 an d'emprisonnement et que la mesure reste l'unique moyen d'atteindre un objectif (ou de permettre la présentation devant l'autorité judiciaire, en l'absence de locaux adaptés au tribunal)." },
            ]},
            { niveau: "II", titre: "La notification de la garde à vue et des droits", reference: "Art. 63-1 C.P.P.", texte: "Information immédiate par un O.P.J., ou un A.P.J. sous contrôle d'un O.P.J. (contrôle n'impliquant pas nécessairement sa présence physique). L'O.P.J. avise dès le début le procureur et rédige le PV d'avis à parquet.", enfants: [
              { titre: "Information sur la mesure", points: ["Placement en garde à vue, durée, prolongations éventuelles.", "Qualification, date et lieu présumés de l'infraction reprochée.", "Motifs justifiant le placement (au moins un objectif de l'art. 62-2)."] },
              { titre: "1. Droit de faire prévenir un tiers", reference: "Art. 63-2 I C.P.P.", texte: "Personne vivant habituellement avec le gardé à vue, parent en ligne directe, frère/sœur, ou toute autre personne désignée ; son employeur ; les autorités consulaires (étranger). **Délai maximum 3 heures** à compter de la demande, sauf circonstances insurmontables mentionnées au PV. Peut être différé/refusé par le procureur sur demande de l'O.P.J. (préservation des preuves, atteinte grave à la vie/liberté/intégrité)." },
              { titre: "2. Droit de communiquer", reference: "Art. 63-2 II C.P.P.", texte: "Communication (écrit, téléphone, entretien) avec un tiers de l'art. 63-2-I, autorisée par l'O.P.J. si compatible avec les objectifs de l'art. 62-2 et sans risque d'infraction — **durée maximum 30 minutes**, sous contrôle de l'O.P.J." },
              { titre: "3. Droit d'être examiné par un médecin", reference: "Art. 63-3 C.P.P.", texte: "Sur demande de la personne, ou d'office par le procureur/l'O.P.J. ; de droit si un membre de la famille le demande. **Seconde demande possible en cas de prolongation.** Examen possible par vidéotransmission. Le médecin se prononce sur l'aptitude au maintien en garde à vue. **Aucune contrainte possible** — refus mentionné en procédure. Délai maximum 3 heures." },
              { titre: "4. Droit d'être assisté par un avocat", reference: "Art. 63-3-1 à 63-4-3 C.P.P.", texte: "Avisée dès le début, choix ou commission d'office, possibilité de changer d'avis à tout moment.", points: ["**Entretien confidentiel** : 30 minutes dès le début de la mesure.", "**Consultation de documents** : PV de notification, certificat médical, PV d'audition/confrontation.", "**Assistance aux auditions/confrontations** : sur demande, aucune audition sur les faits sans l'avocat (sauf renonciation expresse mentionnée au PV) ; l'avocat prend des notes, n'intervient qu'à l'issue de chaque audition, peut présenter des observations écrites jointes à la procédure.", "**Exception d'urgence** : le procureur peut, par décision écrite motivée sur demande de l'O.P.J., faire procéder immédiatement à l'audition (compromission sérieuse de la procédure, ou atteinte grave à la vie/liberté/intégrité).", "**Assistance aux reconstitutions/séances d'identification** (art. 61-3 C.P.P.)."] },
              { titre: "5. Droit d'être informée dans une langue comprise", texte: "Interprète en cas de doute sur la maîtrise du français, y compris par télécommunication tout au long de la mesure (mention au PV). Interprète spécialisé pour une personne sourde ne sachant ni lire ni écrire." },
              { titre: "6. Droit de consulter certaines pièces", reference: "Art. 63-4-1 C.P.P.", texte: "PV de notification du placement et des droits, certificat médical, PV d'audition/confrontation — au plus tard avant l'éventuelle prolongation." },
              { titre: "7. Droit de présenter des observations", texte: "Au procureur ou au JLD, lorsqu'il se prononce sur l'éventuelle prolongation." },
              { titre: "8. Droit au silence", texte: "Possibilité de faire des déclarations, répondre aux questions, ou se taire. **Ne s'applique pas à la déclaration d'identité** — obligation de décliner son état civil." },
            ]},
          ],
        },
        {
          titre: "Le suspect libre",
          reference: "Art. 61-1, 62, 65, 706-112-2 du Code de procédure pénale — Art. L.412-1, L.412-2, R.412-1 du C.J.P.M.",
          definition: "Le statut de suspect libre permet d'entendre une personne soupçonnée hors du cadre de la garde à vue (art. 61-1 C.P.P.), qui fixe les conditions et les droits devant être portés à sa connaissance.",
          plan: [
            { niveau: "I", titre: "Le statut du suspect libre", enfants: [
              { titre: "Définition", texte: "Personne à l'encontre de laquelle existent des raisons plausibles de soupçon (contravention/délit/crime), et qui **accepte d'être entendue sans contrainte**. Libre de quitter à tout moment — audition sans limite de durée." },
              { titre: "Distinction avec le témoin", texte: "Le témoin (art. 62 C.P.P.) : aucune raison plausible de soupçon, aucun droit à notifier, audition sans limite de temps, retenue possible sous contrainte si nécessaire (max **4 heures**)." },
              { titre: "L'absence de contrainte (condition sine qua non)", reference: "Art. 61-1 C.P.P.", texte: "Impossible d'entendre librement une personne conduite sous contrainte par la force publique (contrainte à monter dans le véhicule, menottage durant le trajet). L'enquêteur doit systématiquement confirmer que la personne a suivi de son plein gré.", points: ["Si contrainte exercée : placement en garde à vue si les conditions sont réunies, ou remise en liberté avec convocation ultérieure."] },
              { titre: "Cas particuliers", points: ["**Personne placée en chambre de sûreté** (ivresse) : peut être entendue librement à l'issue de sa rétention sur la contravention d'IPM.", "**Personne dépistée positive alcool/stupéfiants** : entendue librement si non tenue sous contrainte et informée des droits de l'art. 61-1.", "**Personne gardée à vue entendue sur des faits distincts** : informée des droits 1°, 3°, 4°, 5° de l'art. 61-1 (art. 65 C.P.P.)."] },
              { titre: "Les cadres d'enquête", texte: "L'audition libre s'applique en flagrance, en préliminaire, et sur commission rogatoire." },
            ]},
            { niveau: "II", titre: "L'information du suspect libre", enfants: [
              { titre: "La convocation", texte: "Convocation écrite si l'enquête le permet, précisant : l'infraction soupçonnée, le droit à l'avocat dès le début, l'accès à l'aide juridictionnelle, la désignation d'un avocat commis d'office, les lieux de conseils juridiques." },
              { titre: "La notification des droits", texte: "Même après convocation écrite, les droits de l'art. 61-1 doivent être notifiés avant toute audition et consignés au PV (spécifique ou intégré au PV d'audition)." },
            ]},
            { niveau: "III", titre: "Les droits du suspect libre", reference: "Art. 61-1 C.P.P.", points: ["Qualification, date et lieu présumés de l'infraction (le détail des faits n'a pas à être évoqué ; toutes les infractions doivent être communiquées si plusieurs).", "**Droit de quitter à tout moment les locaux** — si manifesté en cours d'audition, avis immédiat à l'O.P.J., laisser partir et convoquer ultérieurement si besoin.", "Droit d'être assistée par un interprète.", "Droit de faire des déclarations, répondre, ou se taire.", "**Droit à l'avocat** (si crime/délit puni d'emprisonnement) : entretien préalable, choix ou commission d'office, frais à charge sauf aide juridictionnelle (notice remise), possibilité de solliciter à tout moment.", "**Majeur protégé** (tutelle/curatelle, art. 706-112-2) : avis au tuteur/curateur, qui peut désigner un avocat — sans avocat ni avis possible du tuteur, les déclarations seules ne peuvent fonder une condamnation.", "Droit d'accéder à certaines pièces (PV d'audition/confrontation antérieurs, sans copie) si crime/délit puni d'emprisonnement.", "Droit à des conseils juridiques gratuits (maison de justice et du droit)."] },
            { niveau: "IV", titre: "Les garanties spécifiques applicables au mineur", enfants: [
              { titre: "1. Avis aux représentants légaux", reference: "Art. L.412-1, L.412-2 C.J.P.M.", texte: "Obligation d'aviser par tout moyen les représentants légaux/la personne/le service auquel le mineur est confié. En cas de crime/délit puni d'emprisonnement, s'il n'a pas sollicité d'avocat, les représentants sont avisés de leur droit d'en faire la demande." },
              { titre: "2. Assistance d'un avocat", reference: "Art. L.412-2 C.J.P.M.", texte: "Le mineur est **obligatoirement assisté** d'un avocat. Sans désignation, information du bâtonnier pour commission d'office." },
              { titre: "3. Droit à l'information", reference: "Art. R.412-1 C.J.P.M.", points: ["Droit à ce que les représentants légaux/l'adulte approprié soient informés et puissent accompagner le mineur lors de ses auditions.", "Droit à la protection de la vie privée (interdiction de diffuser les enregistrements, publicité restreinte, interdiction de publier les débats ou tout élément d'identification).", "Les responsables légaux reçoivent les mêmes informations que le mineur."] },
            ]},
          ],
        },
        {
          titre: "Canevas de PV de notification de garde à vue et d'audition libre — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets de PV de notification de placement en garde à vue (majeur et mineur, y compris retenue judiciaire des 10-13 ans), et de notification des droits du suspect libre. Ces outils de rédaction pratique sont sous-tendus par les règles détaillées dans les fiches ci-dessus. Se référer au fascicule original (pages 115 à 133) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 8,
      titre: "L'audition",
      fiches: [
        {
          titre: "L'audition du suspect",
          reference: "Art. 64-1, 706-112-1 du Code de procédure pénale — Art. L.311-1, L.413-12 du C.J.P.M.",
          definition: "Recueillir les aveux est le but recherché dans toute audition d'un mis en cause — mais pas n'importe quels aveux : ils doivent être **circonstanciés**. La conduite d'une audition nécessite le respect de règles précises.",
          plan: [
            { niveau: "I", titre: "Avant l'audition", enfants: [
              { titre: "La connaissance de l'affaire et de la personne", texte: "L'enquêteur doit avoir une parfaite connaissance du dossier : participation active à l'enquête, lecture préalable attentive de toutes les pièces — permet de préparer les questions à poser et celles à éviter. Recueillir un maximum de renseignements sur la personnalité du suspect (milieu, situation sociale, relations). Conduite objective : distinguer les faits avérés de ceux qui laissent subsister une incertitude." },
              { titre: "Le lieu", texte: "Sauf rares exceptions, une personne suspecte ne doit **pas** être entendue à son domicile ou sur son lieu de travail. Le lieu privilégié est le bureau de l'enquêteur — tranquille, sans intervention extérieure." },
              { titre: "Le nombre de participants", texte: "L'audition est en théorie menée par **un seul enquêteur**. Un assistant peut la rendre plus efficace, mais **n'intervient que s'il y est invité**." },
              { titre: "Les règles de sécurité", points: ["Prévenir toute évasion (surveillance des issues : portes, fenêtres).", "Aucun objet utilisable comme arme (ciseaux, presse-livres) à portée de main.", "Armes de service rangées hors de vue et hors d'atteinte.", "Individu dangereux menotté ou surveillé par un fonctionnaire en léger retrait, prêt à intervenir."] },
            ]},
            { niveau: "II", titre: "Pendant l'audition", enfants: [
              { titre: "Généralités", texte: "Rester neutre et objectif, maintenir un climat de confiance.", points: ["Ne rien révéler des éléments de l'enquête.", "Accentuer les contradictions apparaissant pendant l'entretien.", "Éviter les questions suggestives."] },
              { titre: "Ce que le PV d'audition doit faire ressortir", points: ["Les actes matériels accomplis (éléments constitutifs de l'infraction + circonstances aggravantes).", "L'intention coupable.", "Le mobile.", "Les circonstances susceptibles d'excuser/justifier l'acte.", "Le rôle de la personne interrogée et celui des éventuels coauteurs/complices."], texte: "Les déclarations doivent être très circonstanciées et corroborées par le travail d'enquête." },
              { titre: "Le mineur suspecté", reference: "Art. L.311-1 C.J.P.M.", texte: "Peut être accompagné par ses représentants légaux ou un adulte approprié, si l'enquêteur estime que c'est dans l'intérêt supérieur de l'enfant et sans préjudice pour la procédure.", points: ["L'audition peut débuter en leur absence après **2 heures** à compter de leur invitation — leur présence est mentionnée au PV.", "Ces personnes **ne peuvent pas** poser de questions ni formuler d'observations.", "En cas de gêne, il est possible de mettre fin à leur accompagnement (mention au PV)."] },
            ]},
            { niveau: "III", titre: "L'enregistrement audiovisuel des interrogatoires", enfants: [
              { titre: "Des mineurs en garde à vue", reference: "Art. L.413-12 C.J.P.M.", texte: "**Obligatoire et systématique**, tous cadres d'enquête confondus. Le mineur (ou son représentant) n'a pas à être informé ni à donner son accord — vient en complément du PV. En cas d'impossibilité technique, le procureur/juge d'instruction est immédiatement avisé, avec précision de la nature de l'impossibilité au PV." },
              { titre: "Des majeurs en garde à vue en matière criminelle", reference: "Art. 64-1 C.P.P.", texte: "Obligatoire. Dérogations exceptionnelles :", points: ["**Nombre de GAV simultanées** faisant obstacle à l'enregistrement de toutes les auditions : l'O.P.J. en réfère sans délai au procureur, qui désigne par décision écrite versée au dossier les auditions non enregistrées.", "**Impossibilité technique** : le procureur est immédiatement avisé, nature précisée au PV."] },
            ]},
            { titre: "Le canevas du PV d'audition du mis en cause — points clés", points: ["**Visa de l'article relatif aux majeurs protégés** (art. 706-112-1 C.P.P.) si la personne fait l'objet d'une mesure de protection juridique.", "**Présence de l'avocat** : délai d'attente de **2 heures** à respecter avant de débuter l'audition (à compter de l'avis à l'avocat choisi/de permanence) — n'interdit pas une audition limitée à l'identité (état civil et adresse uniquement).", "**Déclarations/récit libre** : à la première personne, laisser parler le suspect, audition ni subjective ni dirigée. Si aveux : ils doivent préciser **H.L.M. (Heure, Lieu, Motif)** des faits.", "**Questions** : sous forme questions-réponses, pour préciser/rectifier ou démontrer la mauvaise foi.", "**Questions de l'avocat** : uniquement à la fin de l'audition ; l'enquêteur peut s'opposer si nuisibles à l'enquête (refus mentionné au PV) ; observations écrites possibles, jointes au PV.", "**Énonciation terminale** : l'heure de fin d'audition est indispensable."] },
          ],
        },
        {
          titre: "Canevas de PV d'audition (mis en cause, entretien avocat) — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets des PV d'audition du mis en cause gardé à vue, d'entretien du gardé à vue avec un avocat, et d'audition du suspect libre. Ces outils de rédaction pratique sont sous-tendus par les règles détaillées dans la fiche « L'audition du suspect » ci-dessus. Se référer au fascicule original (pages 150 à 165) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 9,
      titre: "La perquisition en enquête préliminaire",
      fiches: [
        {
          titre: "La perquisition en enquête préliminaire",
          reference: "Art. 59, 76 du Code de procédure pénale — Art. 131-21 du Code pénal",
          definition: "La perquisition est la recherche, dans tout lieu normalement clos, d'indices, de documents ou d'objets confiscables relatifs aux faits incriminés. La remise spontanée de documents ne constitue pas une perquisition. **En enquête de flagrance, l'A.P.J. n'est pas habilité à perquisitionner** — son intervention se limite à assister l'O.P.J.",
          plan: [
            { niveau: "I", titre: "Les perquisitions, saisies, scellés", enfants: [
              { niveau: "A", titre: "Lieu de la perquisition", texte: "Au domicile de toute personne susceptible d'avoir participé à l'infraction, ou de détenir des pièces/objets/documents relatifs aux faits. Le « domicile » : tout lieu où une personne a son principal établissement, ou tout lieu où elle a le droit de se dire chez elle, quel que soit le titre d'occupation.", points: ["Résidence simple, lieu de séjour occasionnel, occupation à titre de propriétaire ou précaire.", "Dépendances/annexes indissociables du lieu principal, box de garage, parking souterrain, cave privative.", "**Lieux protégés** : certains interdisent toute perquisition (locaux diplomatiques/consulaires), d'autres sont soumis à des règles particulières (cabinet/domicile d'avocat, entreprise de presse/audiovisuel, cabinet médecin/notaire/huissier, secret de la défense nationale, locaux juridictionnels).", "**Majeur protégé** : si incapable d'exercer seul son droit d'opposition, avis préalable au tuteur/curateur par l'O.P.J. ; l'assentiment ne peut être donné qu'après entretien entre eux ; à défaut, autorisation du JLD requise."] },
              { niveau: "B", titre: "Temps de la perquisition", reference: "Art. 59 C.P.P.", texte: "Heures légales : **6h à 21h**. Une perquisition débutée avant 21h peut se poursuivre au-delà." },
              { niveau: "C", titre: "L'assentiment préalable", enfants: [
                { titre: "1. Avec assentiment", reference: "Art. 76 al.1 C.P.P.", texte: "Perquisitions, saisies et scellés (biens confiscables art. 131-21 C.P.) nécessitent l'**assentiment exprès et écrit** de la personne. Autorisation donnée par le maître des lieux, **rédigée avant** la perquisition, **manuscrite et expresse**, **irrévocable et personnelle**." },
                { titre: "2. Sans assentiment", reference: "Art. 76 al.4 C.P.P.", texte: "Pour un crime/délit puni d'emprisonnement ≥3 ans, perquisition possible sans assentiment. Autorisation préalable du **JLD**, à la requête du procureur — écrite et motivée, précisant sous peine de nullité la qualification de l'infraction et l'adresse des lieux." },
              ]},
              { niveau: "D", titre: "Déroulement de la perquisition", texte: "Dès l'entrée, inspection rapide de sécurité de toutes les pièces.", enfants: [
                { titre: "1. Présence de l'occupant", texte: "Doit assister personnellement et de manière constante à toute l'opération. En cas de refus/impossibilité, elle peut désigner un représentant." },
                { titre: "2. Rétention de l'occupant", texte: "Toute personne présente (autre que celle chez qui l'opération se déroule) peut être retenue sur place si susceptible de fournir des renseignements — le temps strictement nécessaire à l'accomplissement des opérations." },
              ]},
            ]},
            { niveau: "II", titre: "Les fouilles", texte: "Recherche, dans tout autre endroit qu'un lieu immobilier clos, d'indices ou objets confiscables utiles à l'enquête.", enfants: [
              { titre: "La fouille intégrale", reference: "Art. 63-7 C.P.P.", texte: "Pratiquée uniquement sur une personne gardée à vue, décidée par un O.P.J., seulement si palpation/détection électronique impossibles. **Assimilée à une perquisition**, soumise à l'assentiment de la personne — mais **les heures légales ne s'imposent pas**. Réalisée dans un espace fermé, par une personne du même sexe." },
              { titre: "La fouille de véhicule", texte: "Le véhicule **n'est pas un domicile** ni son prolongement — mêmes règles que la perquisition, en présence de la personne trouvée en possession du véhicule, avec son autorisation (mêmes formes que pour la perquisition). **Heures légales non applicables** sauf si le véhicule est stationné dans l'enceinte du domicile perquisitionné (garage, cour) — alors soumis aux heures légales de la perquisition du domicile." },
            ]},
            { titre: "Le canevas du PV de perquisition — points clés", points: ["**Instructions** : l'A.P.J., ne pouvant perquisitionner qu'en préliminaire, agit sous le contrôle de l'O.P.J.", "**Cadre juridique** : enquête préliminaire uniquement, visa de l'art. 76 C.P.P.", "**Assistants** : fonctionnaires accompagnant, éventuellement spécialistes PTS.", "**Identité** : de la personne chez qui l'opération a lieu, avec sa situation au moment (gardée à vue, suspect libre).", "**Assentiment préalable** : inscription manuscrite sur l'imprimé dédié, mentionnant toute impossibilité d'écrire, tout refus/impossibilité d'assister."] },
          ],
        },
        {
          titre: "Canevas de PV de perquisition et de fouille — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets de PV de perquisition en enquête préliminaire et de fouille de véhicule, outils de rédaction pratique dont les règles de fond sont détaillées dans la fiche ci-dessus. Se référer au fascicule original (pages 176 à 185) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 10,
      titre: "Les réquisitions",
      fiches: [
        {
          titre: "Les réquisitions judiciaires",
          definition: "La réquisition est un acte permettant à une autorité judiciaire d'exiger d'une personne l'accomplissement d'une prestation.",
          plan: [
            { niveau: "I", titre: "Réquisition à personne qualifiée", reference: "Art. 60, 77-1 C.P.P.", texte: "L'O.P.J. (ou sous son contrôle l'A.P.J./assistant d'enquête) peut recourir à toute personne susceptible de procéder à des constatations/examens techniques et scientifiques utiles, à raison de son art ou de ses connaissances. **En préliminaire, autorisation préalable du procureur obligatoire.**", points: ["Les personnes requises prêtent **serment écrit** (figure en tête du rapport), sauf si inscrites sur une liste d'experts judiciaires (art. 157 C.P.P.).", "Elles peuvent ouvrir des scellés, en replacer, et placer sous scellés les objets résultant de leur examen.", "Sur instructions du procureur, les résultats sont communiqués aux personnes présumées auteurs et aux victimes."] },
            { niveau: "II", titre: "Réquisition générale", reference: "Art. 60-1, 77-1-1 C.P.P.", texte: "L'O.P.J. (ou sous son contrôle l'A.P.J.) peut requérir toute personne/établissement/organisme/administration détenant des informations utiles (y compris issues d'un système informatique), de les remettre. L'assistant d'enquête peut établir cette réquisition pour les enregistrements de vidéoprotection, sur demande expresse et sous contrôle.", points: ["En préliminaire, le procureur peut autoriser certaines réquisitions par **instructions générales**, durée maximale **6 mois**, renouvelable/modifiable, avis immédiat au procureur de chaque réquisition délivrée sur ce fondement.", "Remise possible sous forme numérique, secret professionnel non opposable sans motif légitime.", "**Refus de répondre dans les meilleurs délais : 3 750 € d'amende.**"] },
            { niveau: "III", titre: "Réquisitions informatiques et téléphoniques", reference: "Art. 57-1, 60-2, 60-3, 77-1-2, 97-1, 99-4, 99-5 C.P.P.", points: ["**Art. 57-1** : personne connaissant les mesures de protection des données (perquisition) — autorisation du juge d'instruction en commission rogatoire (art. 97-1).", "**Art. 60-2 al.1** : organisme/personne morale détenant des informations utiles dans un système informatique — autorisation préalable du procureur en préliminaire (art. 77-1-2).", "**Art. 60-2 al.2** : opérateurs de télécommunications, préservation du contenu **1 an maximum**, sur réquisition du procureur après autorisation du JLD ; en préliminaire, autorisation préalable du JLD saisi par le procureur ; en commission rogatoire, autorisation du juge d'instruction (art. 99-4). **Refus sans motif légitime : 3 750 € d'amende.**", "**Art. 60-3** : personne qualifiée pour ouvrir des scellés support de données informatiques et en réaliser des copies — autorisation du juge d'instruction en commission rogatoire (art. 99-5)."] },
            { niveau: "IV", titre: "Réquisition en matière d'interceptions de correspondances électroniques", reference: "Art. 100-3 C.P.P.", texte: "Dans le cadre d'une commission rogatoire, l'O.P.J. (ou sous son contrôle l'A.P.J.) peut requérir un agent qualifié d'un service/organisme sous tutelle du ministre des communications électroniques, ou d'un exploitant de réseau/fournisseur de services agréé, pour installer un dispositif d'interception." },
            { niveau: "V", titre: "Réquisition à manœuvrier", reference: "Art. R.642-1 C.P.", texte: "En cas d'atteinte à l'ordre public, de sinistre, ou de danger pour les personnes, l'A.P.J. peut requérir toute personne pour un travail/prestation utile (ex : serrurier pour ouvrir une porte). La personne requise ne concourt pas directement à la manifestation de la vérité et **n'a pas l'obligation de prêter serment**. Refus sans motif légitime : amende de **2e classe**." },
            { niveau: "VI", titre: "Réquisition à des fins de prélèvement sanguin", reference: "Art. L.3354-1 C.S.P., L.234-4 C.R.", texte: "Lors d'un crime, délit ou accident de la circulation où l'état alcoolique est suspecté, l'OPJ/APJ fait procéder aux vérifications de l'art. L.234-4 C.R. — **obligatoires en cas de mort**, effectuées aussi sur la victime si utile. Par analyses/examens médicaux ou appareil de mesure de l'air expiré. Réquisition possible d'un médecin, interne, étudiant en médecine autorisé au remplacement, ou infirmier pour la prise de sang." },
          ],
        },
        {
          titre: "Canevas de PV de réquisition — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit les canevas complets de PV de réquisition à personne qualifiée et de réquisition à manœuvrier, outils de rédaction pratique dont les règles de fond sont détaillées dans la fiche « Les réquisitions judiciaires » ci-dessus. Se référer au fascicule original (pages 187 à 191) pour les modèles complets." },
          ],
        },
      ],
    },
    {
      numero: 11,
      titre: "La confrontation",
      fiches: [
        {
          titre: "La confrontation",
          reference: "Art. 61-2, 63-4-2, 63-4-3, 63-4-5 du Code de procédure pénale",
          definition: "Au cours d'une enquête, les déclarations enregistrées pour un même événement peuvent être contradictoires (victime/suspects, ou entre plusieurs suspects). La confrontation consiste à mettre en présence les personnes dont les déclarations sont contradictoires.",
          plan: [
            { niveau: "I", titre: "Avant la confrontation", enfants: [
              { titre: "La connaissance de l'affaire et des divergences", texte: "Doit être préparée : points litigieux relevés, questions à poser répertoriées par l'enquêteur." },
              { titre: "Les conditions matérielles", texte: "Local du service suffisamment grand pour recevoir toutes les personnes. Le responsable, assisté d'un ou plusieurs collègues, précise les règles : garder son calme, interdiction de prendre la parole sans y être invité, interdiction d'interrompre le contradicteur." },
            ]},
            { niveau: "II", titre: "Pendant la confrontation", enfants: [
              { titre: "L'assistance de l'avocat", texte: "Pour un crime/délit puni d'emprisonnement :", points: ["**Pour la victime** : assistée d'un avocat si confrontée à une personne gardée à vue (art. 63-4-5) ou entendue librement (art. 61-2). Informée du choix avocat/commis d'office et des frais à sa charge sauf aide juridictionnelle. L'avocat peut consulter les PV d'audition de la victime.", "**Pour le suspect** : peut aussi être assisté d'un avocat, gardé à vue ou entendu librement."] },
              { titre: "Le déroulement", texte: "L'enquêteur met en présence les intéressés, donne lecture de leurs déclarations respectives, interpelle chacun point par point pour maintenir ou non ses déclarations. Chaque contradiction est consignée sur un **seul et même PV**, qui obéit aux mêmes règles que les autres PV." },
              { titre: "La direction de l'opération", texte: "L'O.P.J./A.P.J. conserve la direction, peut y mettre fin si le comportement de l'une des parties empêche le bon déroulement (mention au PV). Les avocats peuvent prendre des notes, mais **ne peuvent en aucun cas conseiller leur client ni intervenir** pendant la confrontation." },
              { titre: "Les questions des avocats", texte: "À l'issue de la confrontation, l'avocat peut poser des questions au suspect et/ou à la victime — l'enquêteur peut s'y opposer si nuisibles au bon déroulement de l'enquête." },
            ]},
            { titre: "Le canevas du PV de confrontation — points clés", points: ["**Visa des articles relatifs à l'assistance de l'avocat** : gardé à vue (art. 63-4-2, 63-4-3) ; victime (art. 63-4-5).", "**Personnes présentes** : identité des personnes confrontées + présence ou non de leur avocat.", "**Rappel des règles** : l'enquêteur conserve la direction exclusive, mention de tout incident (entraînant ou non l'interruption).", "**Opération** : lecture des déclarations en présence de toutes les parties — audition contradictoire, les personnes s'adressent **exclusivement à l'enquêteur**, jamais entre elles.", "**Questions-réponses** : soit une question à tous (chacun répond à son tour), soit une question à chaque partie à tour de rôle en présence de l'autre (seule la personne concernée répond).", "**Questions des avocats** : uniquement à l'issue, opposition possible de l'enquêteur (mention du refus), observations écrites possibles."] },
          ],
        },
        {
          titre: "Canevas de PV de confrontation — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit le canevas complet de PV de confrontation entre la victime et une personne gardée à vue, outil de rédaction pratique dont les règles de fond sont détaillées dans la fiche « La confrontation » ci-dessus. Se référer au fascicule original (pages 196 à 200) pour le modèle complet." },
          ],
        },
      ],
    },
    {
      numero: 12,
      titre: "Le contrôle des étrangers",
      fiches: [
        {
          titre: "Le contrôle du séjour et de la circulation des étrangers",
          reference: "Art. L.812-2, L.812-3 et suivants, L.813-1, L.813-5, L.411-1, L.414-4 à L.414-9 du CESEDA — Art. 441-8 du Code pénal",
          definition: "Le contrôle des étrangers vise à vérifier le respect des obligations de détention, port et présentation des pièces autorisant à circuler ou séjourner en France.",
          plan: [
            { niveau: "I", titre: "Les cas de contrôle de la régularité de circulation et de séjour", enfants: [
              { titre: "Lors d'un contrôle d'identité", reference: "Art. L.812-2/2° CESEDA", texte: "Les personnes contrôlées (art. 78-1, 78-2, 78-2-1, 78-2-2 C.P.P.) doivent justifier leur identité. Si le contrôle révèle une nationalité étrangère, elles peuvent être tenues de présenter leurs pièces de circulation/séjour. **La déduction de la nationalité doit se fonder sur des critères objectifs excluant toute discrimination** — la simple évocation d'être né à l'étranger ne suffit pas." },
              { titre: "Lorsque la qualité d'étranger est apparente", reference: "Art. L.812-2/1° CESEDA", texte: "Contrôle direct possible sans contrôle d'identité préalable, fondé sur des **éléments d'extranéité objectifs et extérieurs** à la personne — toute discrimination (couleur de peau, langue, tenue) est exclue.", points: ["Critères objectifs définis par la jurisprudence : véhicule immatriculé à l'étranger, manifestation avec banderoles/tracts/affiches en langue étrangère, occupation sans titre revendiquant une situation irrégulière, entrée/sortie d'un consulat/ambassade ou d'un foyer réservé aux étrangers, musique folklorique étrangère sur la voie publique, document d'identité étranger en main, déclaration spontanée (liste non exhaustive).", "**Pas de contrôle systématique** des personnes présentes/circulant — durée max **6 heures consécutives** dans un même lieu.", "**Nota** : possible sur tout le territoire, mais ne doit pas s'apparenter à un contrôle frontalier."] },
              { titre: "Lors d'une visite sommaire d'un véhicule", reference: "Art. L.812-3 et s. CESEDA", texte: "Vise tous véhicules circulant sur voie publique dans des zones délimitées : 20 km en deçà des frontières Schengen ; 20 km du littoral dans les départements à pression migratoire désignés par arrêté ; 10 km autour de certains ports/aéroports frontaliers ; aires de stationnement/péages autoroutiers dans le prolongement de ces zones.", points: ["**Compétence exclusive de l'O.P.J.**, assisté éventuellement d'A.P.J./A.P.J.A.", "Mise en œuvre avec l'accord du conducteur, ou à défaut sur instructions du procureur.", "Durée strictement nécessaire, en présence du conducteur ; **immobilisation du véhicule 4 heures maximum** dans l'attente des instructions du procureur — passé ce délai sans instructions, le conducteur repart librement. Le conducteur peut téléphoner librement pendant la retenue.", "Dispositions similaires prévues pour les navires/engins flottants."] },
            ]},
            { niveau: "II", titre: "La vérification du droit au séjour", texte: "Pour entrer en France : CNI/passeport valide, visa éventuel. Ressortissants UE/EEE/Suisse dispensés de visa (passeport/CNI suffit). Séjour limité à **3 mois** sans document de séjour.", points: ["Au-delà de 3 mois, pour un étranger majeur : document de séjour requis (visa long séjour, carte de séjour temporaire/pluriannuelle, carte de résident, carte « retraité », APS).", "Mineurs étrangers résidents : document de circulation de plein droit, valable **5 ans**.", "**Fraude à l'identité** (art. 441-8 C.P.) : utilisation par un porteur autre que le porteur légitime d'un document de voyage/identité authentique — réprime aussi l'usage frauduleux des titres de séjour/documents provisoires."] },
            { niveau: "III", titre: "La retenue pour vérification du droit au séjour", reference: "Art. L.813-1, L.813-5 CESEDA", texte: "Intervient lorsque la personne n'a pas justifié de son droit à circuler/séjourner. **Procédure administrative, durée maximale 24 heures** à compter du début du contrôle, destinée à l'examen de sa situation administrative (ou au prononcé/notification de décisions administratives).", points: ["**Décision de compétence exclusive de l'O.P.J.**, sous le contrôle du procureur.", "Droits notifiés dans une langue comprise, par un O.P.J. ou un A.P.J. sous son contrôle : interprète, avocat, examen médical, avis à une personne de son choix et aux autorités consulaires — ainsi que les motifs et la durée maximale de la mesure."] },
          ],
        },
        {
          titre: "Canevas de PV de contrôle d'identité et de contrôle du séjour — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Le document source reproduit le canevas complet de PV de contrôle d'identité et contrôle du séjour et de la circulation d'un étranger, outil de rédaction pratique dont les règles de fond sont détaillées dans la fiche « Le contrôle du séjour et de la circulation des étrangers » ci-dessus, ainsi que dans la fiche « Le contrôle d'identité » (rubrique 5 de ce document). Se référer au fascicule original (pages 208 à 221) pour le modèle complet." },
          ],
        },
      ],
    },
    {
      numero: 13,
      titre: "Alcool et stupéfiants au volant — renvoi",
      fiches: [
        {
          titre: "Alcool et stupéfiants au volant — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Ce document consacre une section très volumineuse (pages 210 à 274) aux canevas de procès-verbaux liés à la conduite sous l'influence de l'alcool et de stupéfiants (interpellation, vérification des taux, prélèvements sanguins, réquisitions médicales, conduite au poste). Ce sont des outils de rédaction pratique — les règles de fond (seuils légaux, cadres de contrôle, procédures de dépistage et de vérification) sont déjà intégralement détaillées dans les fiches « La conduite sous l'influence de l'alcool : les faits réprimés » et « La conduite après usage de stupéfiants » du document « Mémento de circulation routière », ainsi que dans la fiche « L'amende forfaitaire délictuelle en matière d'usage illicite de stupéfiants » du document « Le policier en intervention (socle avancé) »." },
          ],
        },
      ],
    },
    {
      numero: 14,
      titre: "L'ivresse publique et manifeste — renvoi",
      fiches: [
        {
          titre: "L'ivresse publique et manifeste — renvoi",
          plan: [
            { titre: "Note de renvoi", texte: "Ce document consacre une section aux canevas de procès-verbaux de contravention d'ivresse publique et manifeste (avec examen médical, ou avec remise à un tiers). Les règles de fond (champ d'application, conduite à tenir, prise en charge) sont déjà intégralement détaillées dans la fiche « L'ivresse publique et manifeste (I.P.M.) » du document « Le policier en intervention (socle initial) »." },
          ],
        },
      ],
    },
  ],
};


const QCM_QUESTIONS = [
  {
    matiere: "Droit pénal général",
    question: "Selon l'art. 121-1 du code pénal, une personne est responsable pénalement...",
    options: ["Des faits commis par un tiers sous son autorité", "De son propre fait uniquement", "De tous les faits liés à son entourage", "Uniquement en cas de récidive"],
    correct: 1,
    explication: "Art. 121-1 C.P. pose le principe de personnalité des peines : on ne peut sanctionner que l'auteur, le co-auteur ou le complice d'une infraction, jamais un tiers pour le seul fait qu'il exerçait une autorité sur lui.",
  },
  {
    matiere: "Droit pénal général",
    question: "Un mineur de moins de 13 ans bénéficie, sur le discernement, d'une présomption...",
    options: ["De discernement", "De non-discernement", "Il n'y a aucune présomption avant 16 ans", "La présomption dépend uniquement de l'enquêteur"],
    correct: 1,
    explication: "En dessous de 13 ans, la loi présume que le mineur n'a pas le discernement suffisant pour être pénalement responsable ; cette présomption peut être renversée au cas par cas si le discernement est établi.",
  },
  {
    matiere: "Droit pénal général",
    question: "L'état de nécessité (art. 122-7 C.P.) suppose notamment que les moyens employés soient...",
    options: ["Disproportionnés pour dissuader", "Proportionnés à la gravité de la menace", "Toujours letaux", "Décidés par un juge avant l'acte"],
    correct: 1,
    explication: "Comme la légitime défense, l'état de nécessité (art. 122-7 C.P.) exige que le moyen employé pour écarter le danger reste proportionné à sa gravité — sinon la cause d'irresponsabilité n'est pas retenue.",
  },
  {
    matiere: "Droit pénal général",
    question: "Qui est seul compétent pour décider d'une garde à vue ?",
    options: ["L'A.P.J.A.", "L'O.P.J.", "L'assistant d'enquête", "N'importe quel fonctionnaire de police"],
    correct: 1,
    explication: "Seul un officier de police judiciaire (O.P.J.) peut décider et notifier une mesure de garde à vue, sous le contrôle du procureur de la République.",
  },
  {
    matiere: "Droit pénal général",
    question: "La tentative de délit est punissable...",
    options: ["Toujours, comme un crime", "Jamais", "Seulement dans les cas prévus par la loi", "Uniquement en cas de récidive"],
    correct: 2,
    explication: "Principe général : la tentative de crime est toujours punissable, mais la tentative de délit ne l'est que si un texte le prévoit expressément — ce n'est pas systématique.",
  },
  {
    matiere: "Droit pénal général",
    question: "Le simple conseil donné à autrui, sans don, promesse, menace ni abus d'autorité...",
    options: ["Constitue toujours une complicité par provocation", "N'entraîne pas la complicité", "Est puni comme l'auteur principal", "N'existe pas en droit pénal"],
    correct: 1,
    explication: "La complicité par instigation (art. 121-7 C.P.) suppose un don, une promesse, une menace, un abus d'autorité ou de pouvoir, des machinations ou artifices coupables. Un simple conseil, sans ces éléments, n'entraîne pas la complicité.",
  },
  {
    matiere: "Droit pénal général",
    question: "Parmi les 5 situations de l'art. L.435-1 C.S.I., laquelle NE nécessite PAS de sommations préalables ?",
    options: ["La défense des lieux occupés", "La fuite d'un individu dangereux sous garde", "L'atteinte à la vie ou à l'intégrité physique portée contre le policier ou un tiers", "L'immobilisation d'un véhicule dangereux"],
    correct: 2,
    explication: "Parmi les 5 cas de l'art. L.435-1 C.S.I., l'atteinte à la vie ou à l'intégrité physique relève de la légitime défense stricte : elle ne nécessite pas de sommations préalables, contrairement aux autres cas (défense de lieux, immobilisation de véhicule...).",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Ce qui distingue l'extorsion du vol, c'est que la victime...",
    options: ["Ne s'aperçoit jamais des faits", "Se dessaisit elle-même du bien sous la contrainte", "Est toujours une personne morale", "Doit obligatoirement porter plainte dans les 24h"],
    correct: 1,
    explication: "L'extorsion (art. 312-1 C.P.) se distingue du vol par le mode d'appropriation : la victime remet ou se dessaisit elle-même du bien, sous l'effet de la violence, de la menace ou de la contrainte, alors que dans le vol l'auteur soustrait la chose.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "L'escroquerie (art. 313-1 C.P.) exige notamment...",
    options: ["Un moyen de tromperie ayant déterminé une remise", "Une simple négligence de la victime", "L'usage obligatoire de la violence", "Un préjudice supérieur à 15 000 €"],
    correct: 0,
    explication: "L'escroquerie (art. 313-1 C.P.) suppose une manœuvre frauduleuse (usage d'une fausse qualité, d'un faux nom, manœuvres) qui a déterminé la victime à remettre un bien, des fonds ou à consentir un acte.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Pour caractériser la filouterie d'hôtel (art. 313-5 C.P.), l'occupation de la chambre ne doit pas avoir excédé :",
    options: ["3 jours", "7 jours", "10 jours", "30 jours"],
    correct: 2,
    explication: "La filouterie d'hôtel (art. 313-5 C.P.) exige que l'occupation des lieux n'ait pas excédé 10 jours, sans quoi la qualification devient plus complexe à établir.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Le recel (art. 321-1 C.P.) suppose que la chose détenue provienne...",
    options: ["D'un crime ou délit commis par un tiers", "De sa propre infraction", "D'un simple prêt non restitué", "D'une contravention uniquement"],
    correct: 0,
    explication: "Le recel (art. 321-1 C.P.) suppose de détenir, dissimuler ou transmettre une chose que l'on sait provenir d'un crime ou d'un délit commis par un tiers — receler le produit de sa propre infraction n'est pas un recel distinct.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Parmi ces circonstances, laquelle NE fait PAS partie des 10 prévues pour l'homicide routier (art. 221-18 C.P.) ?",
    options: ["Excès de vitesse ≥ 30 km/h", "Absence de permis de conduire", "Météo défavorable", "Usage du téléphone tenu en main"],
    correct: 2,
    explication: "L'homicide routier (art. 221-18 C.P.) est aggravé par des circonstances liées au comportement du conducteur (vitesse excessive, absence de permis, téléphone tenu en main, alcool, stupéfiants...), pas par les conditions météorologiques.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Le délit de fuite (art. 434-10 C.P.) est constitué même si le conducteur...",
    options: ["S'arrête assez longtemps pour permettre le relevé de sa plaque", "Revient sur les lieux après avoir pris la fuite", "N'a pas eu conscience de l'accident", "A immédiatement alerté les secours"],
    correct: 1,
    explication: "Le délit de fuite (art. 434-10 C.P.) est consommé dès l'instant où le conducteur tente d'échapper à sa responsabilité en quittant les lieux, même s'il revient ensuite ou n'avait pas identifié tous les dommages causés.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "L'usage illicite de stupéfiants (art. L.3421-1 C.S.P.) peut être constaté par :",
    options: ["Amende forfaitaire délictuelle", "Seule une comparution devant un juge d'instruction", "Un simple avertissement oral", "Aucune procédure spécifique"],
    correct: 0,
    explication: "L'usage illicite de stupéfiants (art. L.3421-1 C.S.P.) peut être sanctionné par une amende forfaitaire délictuelle, procédure simplifiée qui évite le passage devant un juge dans les cas simples.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Le rodéo motorisé (art. L.236-1 C.R.) suppose des manœuvres...",
    options: ["Répétées", "Uniques mais très dangereuses", "Commises uniquement de nuit", "Réalisées obligatoirement en réunion"],
    correct: 0,
    explication: "Le rodéo motorisé (art. L.236-1 C.R.) suppose des manœuvres répétées mettant en danger la sécurité ou la tranquillité publique — un fait unique, même dangereux, ne suffit pas à caractériser l'infraction.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Le vol (art. 311-1 C.P.) est défini comme...",
    options: ["La destruction de la chose d'autrui", "La soustraction frauduleuse de la chose d'autrui", "Le refus de restituer un objet prêté", "L'achat d'un bien à un prix trop bas"],
    correct: 1,
    explication: "Le vol (art. 311-1 C.P.) est défini comme la soustraction frauduleuse de la chose d'autrui — c'est l'auteur qui prend, sans le consentement du propriétaire.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Une simple résistance passive (se laisser traîner au sol lors d'une interpellation) constitue-t-elle une rébellion ?",
    options: ["Oui, toujours", "Non, la rébellion suppose une résistance active et violente", "Seulement si elle dure plus de 5 minutes", "Seulement de nuit"],
    correct: 1,
    explication: "La rébellion suppose une résistance violente et active envers une personne dépositaire de l'autorité publique ; une résistance purement passive (se laisser traîner, se raidir) ne suffit pas à la caractériser.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Le viol (art. 222-23 C.P.) suppose une absence de consentement caractérisée par :",
    options: ["Violence, contrainte, menace ou surprise", "Uniquement la violence physique", "Le seul silence de la victime", "L'âge de la victime uniquement"],
    correct: 0,
    explication: "Le viol (art. 222-23 C.P.) suppose un acte de pénétration commis sans consentement, caractérisé par violence, contrainte, menace ou surprise — ces quatre éléments couvrent des situations bien plus larges que la seule violence physique.",
  },
  {
    matiere: "Droit pénal spécial",
    question: "Dans un cas de corruption, si le fonctionnaire sollicite un avantage et que le particulier refuse...",
    options: ["Aucun des deux n'est punissable", "Seul le fonctionnaire est punissable de corruption passive", "Seul le particulier est punissable", "Les deux sont punissables"],
    correct: 1,
    explication: "La corruption passive (le fonctionnaire qui sollicite un avantage) est punissable dès la simple sollicitation, indépendamment de la suite donnée par le particulier. La corruption active suppose, elle, que le particulier propose ou cède — ce qui n'est pas le cas ici.",
  },
  {
    matiere: "Procédure pénale",
    question: "La garde à vue est réservée aux infractions punies...",
    options: ["D'une amende uniquement", "D'une peine d'emprisonnement", "D'un simple rappel à la loi", "D'aucune sanction pénale"],
    correct: 1,
    explication: "La garde à vue ne peut être décidée que pour des infractions punies d'une peine d'emprisonnement — jamais pour une simple contravention ou un fait non susceptible d'emprisonnement.",
  },
  {
    matiere: "Procédure pénale",
    question: "Qui contrôle la mesure de garde à vue ?",
    options: ["Le maire", "Le procureur de la République", "Le préfet", "L'avocat de la personne seule"],
    correct: 1,
    explication: "La garde à vue est placée sous le contrôle du procureur de la République, qui doit en être informé dès le début de la mesure et peut en ordonner la prolongation ou la levée.",
  },
  {
    matiere: "Procédure pénale",
    question: "L'enquête de flagrant délit s'applique...",
    options: ["À toutes les infractions sans exception", "Aux crimes et délits punis d'emprisonnement en cours ou tout juste commis", "Uniquement aux contraventions", "Seulement sur commission rogatoire"],
    correct: 1,
    explication: "L'enquête de flagrant délit (art. 53 C.P.P.) s'applique aux crimes et délits punis d'emprisonnement qui viennent de se commettre ou sont en train de se commettre — pas à toutes les infractions indistinctement.",
  },
  {
    matiere: "Procédure pénale",
    question: "La commission rogatoire est du domaine exclusif de :",
    options: ["L'A.P.J.A.", "L'O.P.J.", "N'importe quel policier", "Du maire"],
    correct: 1,
    explication: "La commission rogatoire est un acte par lequel un juge d'instruction délègue certains actes d'enquête ; elle ne peut être exécutée que par un officier de police judiciaire (O.P.J.), jamais par un simple agent.",
  },
  {
    matiere: "Procédure pénale",
    question: "Un procès-verbal rédigé en enquête préliminaire vaut, en principe :",
    options: ["Preuve jusqu'à inscription de faux", "Preuve jusqu'à preuve contraire", "Simple renseignement", "Aucune valeur"],
    correct: 2,
    explication: "Un procès-verbal d'enquête préliminaire ne vaut, en principe, que comme simple renseignement soumis à l'appréciation du juge — contrairement à certains PV de flagrance qui peuvent faire foi jusqu'à preuve contraire pour les contraventions.",
  },
  {
    matiere: "Procédure pénale",
    question: "Dans le corps d'un procès-verbal, le rédacteur doit s'exprimer :",
    options: ["Au passé composé, à la première personne du singulier", "Au présent de l'indicatif, à la première personne du pluriel", "Au futur, à la troisième personne", "Peu importe le temps employé"],
    correct: 1,
    explication: "Dans le corps d'un procès-verbal, le rédacteur relate les faits au présent de l'indicatif et à la première personne du pluriel (« Nous, [grade], constatons... »), formule consacrée par la pratique professionnelle.",
  },
  {
    matiere: "Procédure pénale",
    question: "La durée initiale de la garde à vue de droit commun est de :",
    options: ["12 heures", "24 heures", "48 heures", "72 heures"],
    correct: 1,
    explication: "La garde à vue de droit commun dure 24 heures, renouvelable une fois sur autorisation du procureur de la République (soit 48 heures maximum en principe, hors régimes dérogatoires).",
  },
  {
    matiere: "Procédure pénale",
    question: "Le gardé à vue qui demande à prévenir un proche doit voir sa demande satisfaite dans un délai de :",
    options: ["1 heure", "3 heures", "12 heures", "24 heures"],
    correct: 1,
    explication: "En vertu de l'art. 63-2 C.P.P., le gardé à vue qui demande à prévenir un proche ou son employeur doit voir sa demande satisfaite dans un délai de 3 heures.",
  },
  {
    matiere: "Institution et valeurs",
    question: "Combien de temps dure la formation initiale des gardiens de la paix ?",
    options: ["6 mois", "12 mois", "24 mois", "36 mois"],
    correct: 2,
    explication: "La formation initiale des gardiens de la paix dure 24 mois, combinant enseignement en école et stages pratiques sur le terrain.",
  },
  {
    matiere: "Institution et valeurs",
    question: "Laquelle de ces directions ne dépend PAS de la D.G.P.N. ?",
    options: ["La D.N.P.J. (police judiciaire)", "La D.N.S.P. (sécurité publique)", "La Préfecture de police de Paris", "L'I.G.P.N. (inspection générale)"],
    correct: 2,
    explication: "La Préfecture de police de Paris dispose d'un statut particulier et n'est pas rattachée à la D.G.P.N. comme le sont la D.N.P.J., la D.N.S.P. ou l'I.G.P.N.",
  },
  {
    matiere: "Institution et valeurs",
    question: "Dans l'ordre hiérarchique du corps d'encadrement et d'application, qui est au-dessus du brigadier-chef ?",
    options: ["Le commandant", "Le major", "Le capitaine", "Le commissaire"],
    correct: 1,
    explication: "Dans la hiérarchie du corps d'encadrement et d'application, l'ordre ascendant est : gardien de la paix, brigadier, brigadier-chef, puis major.",
  },
  {
    matiere: "Institution et valeurs",
    question: "Selon la triple dimension retenue par le Conseil d'État, la laïcité implique notamment :",
    options: ["L'interdiction de toute religion dans l'espace public", "La neutralité de l'État vis-à-vis des croyances", "Le financement public d'un seul culte", "L'interdiction pour les usagers de porter des signes religieux"],
    correct: 1,
    explication: "Le Conseil d'État retient une triple dimension de la laïcité : neutralité de l'État vis-à-vis de toutes les croyances, liberté de conscience de chacun, et égalité de traitement entre tous les cultes.",
  },
  {
    matiere: "Déontologie & discipline",
    question: "Un policier peut refuser d'exécuter un ordre de son supérieur lorsque celui-ci est :",
    options: ["Simplement désagréable", "Manifestement illégal et compromettant gravement un intérêt public", "Donné oralement plutôt que par écrit", "Donné un jour de repos"],
    correct: 1,
    explication: "Un agent peut refuser d'exécuter un ordre lorsque celui-ci est manifestement illégal et de nature à compromettre gravement un intérêt public — un simple désaccord ou une consigne désagréable ne suffit pas.",
  },
  {
    matiere: "Déontologie & discipline",
    question: "La voie disciplinaire est...",
    options: ["Identique à la voie pénale", "Indépendante de la voie pénale", "Supprimée si acquittement pénal", "Réservée aux fautes graves uniquement"],
    correct: 1,
    explication: "La voie disciplinaire est indépendante de la voie pénale : un agent peut être sanctionné disciplinairement même acquitté au pénal, et inversement, les deux procédures suivent des logiques distinctes.",
  },
  {
    matiere: "Déontologie & discipline",
    question: "Parmi les sanctions suivantes, laquelle appartient au 4e groupe (le plus grave) ?",
    options: ["L'avertissement", "Le blâme", "La révocation", "L'abaissement d'échelon"],
    correct: 2,
    explication: "Les sanctions disciplinaires sont réparties en 4 groupes croissants de gravité ; la révocation, qui met fin définitivement aux fonctions, relève du 4e groupe, le plus sévère.",
  },
  {
    matiere: "Déontologie & discipline",
    question: "L'obligation d'agir même hors service (art. R. 434-19 C.S.I.) va plus loin que :",
    options: ["Le principe hiérarchique", "La simple non-assistance à personne en péril (art. 223-6 C.P.)", "L'obligation de réserve", "Le droit syndical"],
    correct: 1,
    explication: "L'art. R. 434-19 C.S.I. impose au policier d'intervenir même hors service face à un événement grave — une obligation plus étendue que la simple non-assistance à personne en péril (art. 223-6 C.P.), qui s'impose à tout citoyen.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Face à une fugue de mineur, quelle qualification faut-il retenir même si elle semble volontaire ou habituelle ?",
    options: ["Simple fait divers sans suite", "Disparition inquiétante (art. 74-1 C.P.P.)", "Fait justifiant une garde à vue immédiate", "Aucune qualification particulière"],
    correct: 1,
    explication: "Face à une fugue de mineur, même apparemment volontaire ou habituelle, la qualification de disparition inquiétante (art. 74-1 C.P.P.) doit être retenue pour déclencher les recherches appropriées.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "L'amende forfaitaire délictuelle pour usage de stupéfiants NE peut PAS être mise en œuvre si :",
    options: ["Le mis en cause est majeur et identifié", "Le mis en cause conduit un véhicule", "Une petite quantité de cannabis est découverte", "Le mis en cause reconnaît les faits"],
    correct: 1,
    explication: "L'amende forfaitaire délictuelle pour usage de stupéfiants ne peut pas être appliquée si le mis en cause conduisait un véhicule au moment des faits — la procédure classique doit alors être suivie.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Face à une alarme dans un établissement financier, la pénétration dans les locaux doit avoir lieu :",
    options: ["Immédiatement à l'arrivée sur place", "Uniquement sur ordre du C.I.C. après vérification", "Avec avertisseurs sonores et lumineux", "Jamais, quelle que soit la situation"],
    correct: 1,
    explication: "Face à une alarme dans un établissement financier, les effectifs n'entrent dans les locaux que sur ordre du C.I.C., après vérification, afin d'éviter tout risque de méprise ou d'intervention prématurée.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "La palpation de sécurité doit être effectuée :",
    options: ["Systématiquement lors de chaque contrôle", "Uniquement quand elle est nécessaire à la sécurité, en fonction des circonstances", "Uniquement par un OPJ", "Toujours accompagnée d'un déshabillage"],
    correct: 1,
    explication: "La palpation de sécurité n'est pas systématique : elle doit être justifiée par les circonstances (comportement, contexte, risque) et rester nécessaire et proportionnée.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Le menottage d'une personne interpellée est justifié si :",
    options: ["Elle est dangereuse pour autrui/elle-même ou susceptible de fuir", "C'est systématique pour toute interpellation", "Elle a plus de 18 ans", "Elle refuse de décliner son identité"],
    correct: 0,
    explication: "Le menottage n'est pas automatique : il doit être justifié par la dangerosité de la personne pour autrui ou elle-même, ou par un risque de fuite — c'est une mesure de sécurité, pas une sanction.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Un policier en intervention sur la voie publique peut-il interdire qu'on le filme ?",
    options: ["Oui, systématiquement", "Non, sauf pour les agents bénéficiant de l'anonymat prévu par arrêté", "Oui, en confisquant le téléphone", "Non, mais il peut exiger la destruction immédiate des images"],
    correct: 1,
    explication: "Le droit de filmer un policier en intervention sur la voie publique est protégé ; seule l'identification (visage, plaque nominative) des agents bénéficiant d'un anonymat prévu par arrêté peut être encadrée.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "L'ivresse publique et manifeste (I.P.M.) s'apprécie :",
    options: ["Uniquement sur la base d'un taux d'alcoolémie mesuré", "Indépendamment de tout taux d'alcoolémie mesuré, sur des signes extérieurs", "Uniquement de nuit", "Uniquement si la personne conduit un véhicule"],
    correct: 1,
    explication: "L'ivresse publique et manifeste (I.P.M.) s'apprécie sur la base de signes extérieurs (comportement, élocution, démarche...) constatés par l'agent, indépendamment de toute mesure d'alcoolémie.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Le triangle de sécurité repose sur :",
    options: ["Un couvrant, un intervenant, un périmètre", "Trois intervenants identiques", "Un seul agent polyvalent", "Une arme, un bouclier, une radio"],
    correct: 0,
    explication: "Le triangle de sécurité structure toute intervention à plusieurs : un couvrant assure la protection, un intervenant agit, et un périmètre est maîtrisé pour sécuriser l'ensemble de la zone.",
  },
  {
    matiere: "Secourisme (SST)",
    question: "Face à une victime inconsciente qui respire, on la place :",
    options: ["Sur le dos, jambes surélevées", "En position latérale de sécurité", "Assise contre un mur", "En position fœtale"],
    correct: 1,
    explication: "Une victime inconsciente qui respire est placée en position latérale de sécurité (PLS) pour dégager ses voies respiratoires et prévenir une inhalation, en attendant les secours.",
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "Pour un conducteur ordinaire, le seuil délictuel de la C.E.E.A. (art. L.234-1 C.R.) est atteint à partir de :",
    options: ["0,20 g/l de sang", "0,50 g/l de sang", "0,80 g/l de sang", "1,20 g/l de sang"],
    correct: 2,
    explication: "L'art. L.234-1 C.R. fixe le seuil délictuel de conduite en état d'ivresse à 0,80 g/l de sang pour un conducteur ordinaire ; en dessous, jusqu'à 0,50 g/l, il s'agit d'une contravention.",
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "Le refus de dépistage (sans vérifications) de l'alcoolémie constitue-t-il une infraction ?",
    options: ["Oui, systématiquement", "Non, mais il entraîne l'obligation de se soumettre aux vérifications", "Oui, uniquement de nuit", "Non, jamais de conséquence"],
    correct: 1,
    explication: "Le refus du simple dépistage préalable n'est pas une infraction en soi, mais il entraîne l'obligation de se soumettre aux vérifications (éthylomètre, prise de sang) — c'est le refus de CES vérifications qui constitue un délit.",
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "La durée maximale de rétention du permis de conduire (art. L.224-1 C.R.) est de :",
    options: ["24 heures", "48 heures", "72 heures (120 en cas d'examens médicaux)", "1 semaine"],
    correct: 2,
    explication: "L'art. L.224-1 C.R. fixe la durée maximale de rétention du permis de conduire à 72 heures, portée à 120 heures en cas d'examens médicaux ou toxicologiques complémentaires.",
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "Le capital de points initial du permis de conduire (hors catégorie AM) est de :",
    options: ["3 points", "6 points", "9 points", "12 points"],
    correct: 1,
    explication: "Le capital de points initial du permis de conduire, hors catégorie AM, est de 6 points (12 points après la période probatoire de 3 ans sans infraction).",
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "Lors d'un simple contrôle routier, un policier est-il autorisé à fouiller le coffre du véhicule ?",
    options: ["Oui, systématiquement", "Non, la fouille du coffre n'est pas autorisée lors d'un simple contrôle routier", "Oui, mais seulement de nuit", "Oui, avec l'accord du procureur uniquement"],
    correct: 1,
    explication: "Lors d'un simple contrôle routier, sans cadre juridique particulier (réquisitions du procureur, flagrance, consentement écrit), la fouille du coffre du véhicule n'est pas autorisée.",
  },

  /* -------- Questions à choix multiples (plusieurs bonnes réponses) -------- */
  {
    matiere: "Droit pénal général",
    question: "Parmi les propositions suivantes, lesquelles font partie des 3 éléments constitutifs d'une infraction ?",
    options: ["Élément légal", "Élément matériel", "Élément moral", "Élément territorial", "Élément temporel"],
    correct: [0, 1, 2],
    explication: "Une infraction suppose un élément légal (un texte qui l'incrimine), un élément matériel (un acte ou une omission) et un élément moral (l'intention ou la faute). Les notions de territoire ou de temps ne sont pas des éléments constitutifs.",
  },
  {
    matiere: "Droit pénal général",
    question: "Concernant la légitime défense des personnes (art. 122-5 C.P.), quelles conditions doit remplir la riposte ?",
    options: ["Nécessaire (aucun autre moyen de se soustraire au danger)", "Simultanée (immédiate par rapport à l'atteinte)", "Proportionnée à la gravité de l'atteinte", "Anticipée, pour prévenir un danger futur", "Autorisée au préalable par un magistrat"],
    correct: [0, 1, 2],
    explication: "La riposte en légitime défense doit être nécessaire, simultanée (ni anticipée, ni tardive comme une vengeance) et proportionnée à la gravité de l'atteinte — trois conditions cumulatives posées par l'art. 122-5 C.P.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Le triangle de sécurité, lors d'une intervention à plusieurs, repose sur quels rôles ?",
    options: ["Un couvrant", "Un intervenant", "Un périmètre maîtrisé", "Un négociateur", "Un porte-parole"],
    correct: [0, 1, 2],
    explication: "Le triangle de sécurité répartit les rôles entre un couvrant (qui surveille et protège), un intervenant (qui agit directement) et un périmètre maîtrisé, pour sécuriser l'ensemble de la zone d'action.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Quelles sont les 3 conditions préalables à l'usage d'une arme par un policier (art. L.435-1 C.S.I.) ?",
    options: ["Agir dans l'exercice de ses fonctions", "Être revêtu de son uniforme ou d'insignes extérieurs apparents", "Agir en cas d'absolue nécessité et de manière strictement proportionnée", "Avoir reçu l'autorisation préalable écrite du procureur", "Être accompagné d'au moins un collègue habilité"],
    correct: [0, 1, 2],
    explication: "Avant même d'examiner les 5 situations prévues par le C.S.I., le policier doit remplir 3 conditions préalables : agir dans l'exercice de ses fonctions, être en tenue ou porter des insignes apparents, et n'utiliser son arme qu'en cas d'absolue nécessité et de façon strictement proportionnée.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Parmi ces situations, lesquelles empêchent la mise en œuvre de l'amende forfaitaire délictuelle (A.F.D.) pour usage de stupéfiants ?",
    options: ["Le mis en cause est mineur", "Le mis en cause conduit un véhicule", "Le mis en cause reconnaît spontanément les faits", "La quantité découverte est inférieure à 50 g de cannabis"],
    correct: [0, 1],
    explication: "L'A.F.D. stupéfiants ne peut pas être mise en œuvre si le mis en cause est mineur, ou s'il conduisait un véhicule (délit distinct prévu par le code de la route). Reconnaître les faits ou détenir une petite quantité ne fait pas obstacle à l'A.F.D. — c'est au contraire l'un des cas où elle s'applique.",
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Face à une agression en cours ou un individu dangereux, quelles sont les premières mesures attendues d'un primo-intervenant ?",
    options: [
      "Écarter toute personne de la zone dangereuse",
      "Recueillir les premiers renseignements utiles (nombre d'auteurs, personnalité...)",
      "S'organiser selon l'arrivée progressive des renforts",
      "Garder son sang-froid",
      "Ne jamais intervenir « à chaud » et physiquement seul",
      "Informer immédiatement le C.I.C. dès les premières informations obtenues",
      "Intervenir immédiatement pour neutraliser seul l'individu, sans attendre de renfort",
      "Négocier personnellement une contrepartie avec l'auteur",
    ],
    correct: [0, 1, 2, 3, 4, 5],
    explication: "Un primo-intervenant écarte les personnes présentes, recueille du renseignement, s'organise avec les renforts qui arrivent progressivement, garde son sang-froid, informe le C.I.C. sans délai — et ne s'engage jamais seul « à chaud » : l'interpellation immédiate est réservée aux services spécialisés (RAID...).",
  },
  {
    matiere: "Secourisme (SST)",
    question: "La méthode « P.A.S. » en secourisme se décompose en quelles étapes ?",
    options: ["Protéger", "Alerter", "Secourir", "Immobiliser", "Réanimer"],
    correct: [0, 1, 2],
    explication: "P.A.S. résume la conduite à tenir : Protéger (écarter le sur-accident, ne jamais se mettre en danger), Alerter (15/18/112, message clair), puis Secourir (gestes adaptés à l'état de la victime).",
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "Parmi ces documents et équipements, lesquels un conducteur doit-il pouvoir présenter lors d'un contrôle routier ?",
    options: [
      "Le permis de conduire (ou titre équivalent)",
      "Le certificat d'immatriculation du véhicule",
      "L'attestation d'assurance",
      "Le triangle de présignalisation",
      "Le gilet de haute visibilité",
      "La carte grise du véhicule précédemment possédé",
      "Le carnet d'entretien du véhicule",
    ],
    correct: [0, 1, 2, 3, 4],
    explication: "Les pièces contrôlables lors d'un contrôle routier incluent le titre de conduite, le certificat d'immatriculation, l'attestation d'assurance, ainsi que le triangle de présignalisation et le gilet de haute visibilité (art. R.416-19 C.R.). Le carnet d'entretien ou un ancien certificat d'immatriculation ne sont pas concernés.",
  },
];

const ARTICLES_LOI = [
  { code: "Code pénal", titre: "Les immunités et les inviolabilités", reference: "Art. 29 conv. Vienne — Art. 311-12 C.P.", resume: "Le droit international garantit aux diplomates et aux consuls le bénéfice de certaines immunités, et restreint les compétences normalement reconnues à l'État d'accueil. Le diplomate représente à titre permanent un État auprès d'un autre État ou d'une organisation internationale ; le consul protège ses compatriotes à l'étranger." },
  { code: "Code pénal", titre: "Le droit pénal — les grands principes", reference: "Art. 111-3, 121-1, 112-1 du Code pénal — Art. 8 DDHC", resume: "Le droit pénal organise la répression des faits portant atteinte à la paix publique ; les actes répréhensibles sont appelés infractions. Il est traditionnellement considéré comme une discipline mixte, relevant à la fois du droit privé et du droit public." },
  { code: "Code pénal", titre: "Classification des infractions", reference: "Art. 111-1 à 131-18 du Code pénal", resume: "Les infractions sont classées, suivant leur gravité, en **crimes, délits et contraventions** (art. 111-1 C.P.)." },
  { code: "Code pénal", titre: "La tentative punissable", reference: "Art. 121-4 et 121-5 du Code pénal", resume: "L'auteur est la personne qui commet les faits ou qui tente de commettre un crime ou, dans les cas prévus par la loi, un délit (art. 121-4). La tentative est constituée dès lors que, manifestée par un commencement d'exécution, elle n'a été suspendue ou n'a manqué son effet qu'en raison de circonstances indépendantes de la volonté de l'auteur (art. 121-5)." },
  { code: "Code pénal", titre: "La complicité", reference: "Art. 121-6 et 121-7 du Code pénal", resume: "Est complice d'un crime ou d'un délit la personne qui, sciemment, par aide ou assistance, en a facilité la préparation ou la consommation. Est également complice celle qui, par don, promesse, menace, ordre, abus d'autorité ou de pouvoir, a provoqué à une infraction ou donné des instructions pour la commettre." },
  { code: "Code pénal", titre: "La responsabilité pénale : les causes d'irresponsabilité ou d'atténuation", reference: "Art. 122-1 à 122-9 du Code pénal", resume: "Nul n'est responsable que de son propre fait (art. 121-1 C.P.). La responsabilité n'est pas un élément de l'infraction : elle en est l'effet et la conséquence juridique. Dans certaines situations, un individu ayant commis une infraction n'en sera pas jugé responsable, en raison de circonstances particulières prévues par le code pénal." },
  { code: "Code pénal", titre: "La légitime défense", reference: "Art. 122-5 et 122-6 du Code pénal", resume: "Art. 122-5 et 122-6 C.P. — abordée dans une fiche spécifique (voir « Légitime défense » et « Usage des armes »)." },
  { code: "Code pénal", titre: "La responsabilité pénale — causes d'irresponsabilité ou d'atténuation", reference: "Art. 122-1 à 122-9 du Code pénal", resume: "Nul n'est responsable que de son propre fait (art. 121-1 C.P.). Dans certaines situations, un individu ayant commis une infraction n'en sera pas jugé responsable, en raison de circonstances particulières prévues par le code pénal." },
  { code: "Code pénal", titre: "Les circonstances aggravantes", reference: "Art. 132-71 à 132-80 C.P.", resume: "Ne sont **pas des éléments constitutifs** de l'infraction et sont **exclues en matière de contravention**." },
  { code: "Code pénal", titre: "Les atteintes involontaires à la vie et à l'intégrité", reference: "Art. 221-6, 222-19, 222-20, R.622-1, R.625-2/3 du Code pénal", resume: "Le fait de causer à autrui, par maladresse, imprudence, inattention, négligence ou manquement à une obligation de sécurité ou de prudence imposée par la loi ou le règlement, la mort ou une atteinte à l'intégrité (avec ou sans ITT), constitue une infraction." },
  { code: "Code pénal", titre: "L'homicide routier et les blessures routières involontaires", reference: "Art. 221-18 à 221-20 du Code pénal", resume: "L'homicide routier et les blessures routières sont des atteintes involontaires à la vie et à l'intégrité de la personne commises lors de la conduite d'un véhicule terrestre à moteur." },
  { code: "Code pénal", titre: "Les atteintes volontaires à la vie", reference: "Art. 221-1 à 221-4 du Code pénal", resume: "Le fait de donner volontairement la mort à autrui constitue un meurtre. Il se différencie de l'empoisonnement (fait d'attenter à la vie d'autrui par l'emploi ou l'administration de substances de nature à entraîner la mort)." },
  { code: "Code pénal", titre: "Les appels téléphoniques et envois de messages malveillants ou agressions sonores", reference: "Art. 222-16 du Code pénal", resume: "Les appels téléphoniques malveillants réitérés, les envois réitérés de messages malveillants émis par voie électronique, ou les agressions sonores en vue de troubler la tranquillité d'autrui, sont des infractions." },
  { code: "Code pénal", titre: "La cession ou l'offre illicites de stupéfiants à une personne en vue de sa consommation personnelle", reference: "Art. 222-39 du Code pénal", resume: "La cession ou l'offre illicite de stupéfiants à une personne, en vue de sa consommation personnelle, est un délit." },
  { code: "Code pénal", titre: "Les violences volontaires", reference: "Art. 222-7 à 222-13, R.624-1, R.625-1 du Code pénal", resume: "Les articles 222-7 à 222-13 du code pénal, ainsi que les art. R.624-1 et R.625-1, définissent et répriment les violences volontaires selon leur gravité." },
  { code: "Code pénal", titre: "Les violences habituelles", reference: "Art. 222-14 du Code pénal", resume: "Violences habituelles commises sur un mineur de 15 ans, une personne vulnérable, ou au sein du couple (conjoint, concubin, partenaire PACS, y compris ex)." },
  { code: "Code pénal", titre: "Les violences volontaires à l'encontre des forces de sécurité intérieure", reference: "Art. 222-14-5 du Code pénal", resume: "L'article 222-14-5 du code pénal définit et réprime les violences volontaires commises à l'encontre des forces de sécurité intérieure." },
  { code: "Code pénal", titre: "Le viol", reference: "Art. 222-22, 222-23 à 222-26 du Code pénal", resume: "Tout acte de pénétration sexuelle, de quelque nature qu'il soit, ou tout acte bucco-génital ou bucco-anal commis sur la personne d'autrui ou sur la personne de l'auteur, par violence, contrainte, menace ou surprise, est un viol. Le code pénal prévoit 2 incriminations spécifiques supplémentaires : le viol sur mineur de 15 ans par un majeur, sans…" },
  { code: "Code pénal", titre: "Les agressions sexuelles", reference: "Art. 222-22, 222-27 à 222-30 du Code pénal", resume: "Les agressions sexuelles autres que le viol consistent dans la commission de tout acte sexuel non consenti commis sur une personne d'autrui ou sur la personne de l'auteur, ou, dans les cas prévus par la loi, commis sur un mineur par un majeur." },
  { code: "Code pénal", titre: "Le harcèlement sexuel", reference: "Art. 222-33 du Code pénal", resume: "Le fait d'imposer à une personne, de façon répétée, des propos ou comportements à connotation sexuelle ou sexiste qui, soit portent atteinte à sa dignité en raison de leur caractère dégradant ou humiliant, soit créent à son encontre une situation intimidante, hostile ou offensante, constitue une infraction. Est assimilé au harcèlement sexuel le fait, même non répété, d'user…" },
  { code: "Code pénal", titre: "L'exhibition sexuelle", reference: "Art. 222-32 du Code pénal", resume: "L'exhibition sexuelle peut être caractérisée par une attitude ou un comportement imposé à la vue du public et qui choque le sens moral et la pudeur de ce dernier." },
  { code: "Code pénal", titre: "L'abstention volontaire de combattre un sinistre", reference: "Art. 223-7 du Code pénal", resume: "Le fait pour quiconque de s'abstenir volontairement de prendre ou de provoquer les mesures permettant, sans risque pour lui ou pour des tiers, de combattre un sinistre de nature à créer un danger, constitue une infraction." },
  { code: "Code pénal", titre: "L'entrave volontaire à l'arrivée des secours", reference: "Art. 223-5 du Code pénal", resume: "Le fait d'entraver volontairement l'arrivée de secours destinés à faire échapper une personne à un péril imminent ou à combattre un sinistre présentant un danger pour la sécurité des personnes, constitue une infraction." },
  { code: "Code pénal", titre: "Le non-obstacle à la commission d'un crime ou d'un délit", reference: "Art. 223-6 al.1 et al.3 du Code pénal", resume: "Quiconque, pouvant empêcher par son action immédiate, sans risque pour lui ou pour les tiers, soit un crime, soit un délit contre l'intégrité corporelle d'une personne, s'abstient volontairement de le faire, commet une infraction." },
  { code: "Code pénal", titre: "La non-assistance à personne en péril", reference: "Art. 223-6 al.2 et al.3 du Code pénal", resume: "Quiconque s'abstient volontairement de porter à une personne en péril l'assistance que, sans risque pour lui ou pour les tiers, il pouvait lui prêter, soit par son action personnelle, soit en provoquant un secours, commet une infraction." },
  { code: "Code pénal", titre: "Le risque causé à autrui (mise en danger d'autrui)", reference: "Art. 223-1 du Code pénal", resume: "Le fait d'exposer directement autrui à un risque immédiat de mort ou de blessures de nature à entraîner une mutilation ou une infirmité permanente, par la violation manifestement délibérée d'une obligation particulière de prudence ou de sécurité imposée par la loi ou le règlement, constitue une infraction." },
  { code: "Code pénal", titre: "3. Assistance à personne en péril", reference: "Art. 223-6 al.2 C.P.", resume: "Dès lors que des renseignements/indices incitent à croire qu'une personne est gravement en péril (appel sans réponse, odeur suspecte, absence anormale d'une personne seule)." },
  { code: "Code pénal", titre: "Les discriminations", reference: "Art. 225-1 et 225-2 du Code pénal", resume: "L'article 225-1 du code pénal définit la discrimination ; l'article 225-2 la réprime." },
  { code: "Code pénal", titre: "La mise en péril des mineurs", reference: "Art. 225-12-1, 225-12-2, 227-22 à 227-27, 434-3 du Code pénal", resume: "Lorsque certaines infractions sont commises à l'encontre d'un mineur, le code pénal prévoit des dispositions spécifiques." },
  { code: "Code pénal", titre: "L'atteinte à l'intimité d'une personne", reference: "Art. 226-3-1 du Code pénal", resume: "Le fait d'user de tout moyen afin d'apercevoir les parties intimes d'une personne, que celle-ci a caché à la vue des tiers du fait de son habillement ou de sa présence dans un lieu clos, lorsqu'il est commis à l'insu ou sans le consentement de la personne, constitue une infraction (délit de « voyeurisme »)." },
  { code: "Code pénal", titre: "Le vol", reference: "Art. 311-1 à 311-4-2 du Code pénal", resume: "Le vol est la soustraction frauduleuse de la chose d'autrui. C'est l'infraction la plus fréquemment commise." },
  { code: "Code pénal", titre: "L'immunité familiale", reference: "Art. 311-12 C.P.", resume: "Ne peut donner lieu à des poursuites pénales le vol commis au préjudice :" },
  { code: "Code pénal", titre: "Nota — immunité familiale et violences conjugales", reference: "Art. 311-12 C.P.", resume: "L'immunité du vol entre époux **ne s'applique pas** lorsque le vol porte sur des objets/documents indispensables à la vie quotidienne de la victime (identité, moyens de paiement, titres de séjour, moyen de télécommunication)." },
  { code: "Code pénal", titre: "L'extorsion", reference: "Art. 312-1 à 312-7 du Code pénal", resume: "L'extorsion est le fait d'obtenir, par violence, menace de violences ou contrainte, soit une signature, un engagement ou une renonciation, soit la révélation d'un secret, soit la remise de fonds, de valeurs ou d'un bien quelconque." },
  { code: "Code pénal", titre: "L'escroquerie", reference: "Art. 313-1 et 313-2 du Code pénal", resume: "L'escroquerie est le fait, soit par l'usage d'un faux nom ou d'une fausse qualité, soit par l'abus d'une qualité vraie, soit par l'emploi de manœuvres frauduleuses, de tromper une personne et de la déterminer, à son préjudice ou à celui d'un tiers, à remettre des fonds, à fournir un service, ou à consentir un acte opérant obligation ou décharge." },
  { code: "Code pénal", titre: "La filouterie", reference: "Art. 313-5 du Code pénal", resume: "La filouterie est le fait par une personne qui sait être dans l'impossibilité absolue de payer, ou qui est déterminée à ne pas payer, de bénéficier de l'un des 4 services prévus par la loi." },
  { code: "Code pénal", titre: "L'abus de confiance", reference: "Art. 314-1 à 314-3 du Code pénal", resume: "L'abus de confiance est le fait par une personne de détourner, au préjudice d'autrui, des fonds, valeurs ou biens quelconques qui lui ont été remis et qu'elle a acceptés à charge de les rendre, de les représenter ou d'en faire un usage déterminé." },
  { code: "Code pénal", titre: "Le recel", reference: "Art. 321-1, 321-2 et 321-4 du Code pénal", resume: "Le recel est le fait de dissimuler, de détenir ou de transmettre une chose, ou de faire office d'intermédiaire afin de la transmettre, en sachant qu'elle provient d'un crime ou d'un délit. Constitue également un recel le fait de bénéficier, par tout moyen et en connaissance de cause, du produit d'un crime ou d'un délit." },
  { code: "Code pénal", titre: "Destructions, dégradations, détériorations ne présentant pas un danger pour les personnes", reference: "Art. 322-1 à 322-3-1 du Code pénal", resume: "L'article 322-1/I du code pénal définit et réprime la destruction, la dégradation ou la détérioration d'un bien appartenant à autrui." },
  { code: "Code pénal", titre: "Destructions, dégradations, détériorations dangereuses pour les personnes", reference: "Art. 322-5 à 322-10 du Code pénal", resume: "Destruction, dégradation ou détérioration d'un bien appartenant à autrui par explosion/incendie/manquement à une obligation de sécurité (involontaire, 322-5), ou par substance explosive/incendie/tout moyen créant un danger pour les personnes (volontaire, 322-6)." },
  { code: "Code pénal", titre: "Les tags et graffitis", reference: "Art. 322-1/II du Code pénal", resume: "Le fait de tracer des inscriptions, des signes ou des dessins, sans autorisation préalable, sur les façades, véhicules, voies publiques ou mobilier urbain, lorsqu'il n'en est résulté qu'un **dommage léger**." },
  { code: "Code pénal", titre: "La corruption passive", reference: "Art. 432-11 du Code pénal", resume: "Le fait, par une personne dépositaire de l'autorité publique, chargée d'une mission de service public, ou investie d'un mandat électif public, de solliciter ou d'agréer, sans droit, à tout moment, directement ou indirectement, des offres, promesses, dons, présents ou avantages quelconques pour elle-même ou pour autrui, soit pour accomplir ou s'abstenir d'accomplir un acte…" },
  { code: "Code pénal", titre: "Les menaces de crime ou délit envers les personnes dépositaires de l'autorité publique", reference: "Art. 433-3 du Code pénal", resume: "Constitue une infraction la menace de commettre un crime ou un délit contre les personnes ou les biens, proférée à l'encontre de personnes limitativement énumérées, en raison de leurs fonctions." },
  { code: "Code pénal", titre: "L'outrage", reference: "Art. 433-5 du Code pénal", resume: "L'article 433-5 du code pénal définit et réprime l'outrage." },
  { code: "Code pénal", titre: "La rébellion", reference: "Art. 433-6 et 433-7 du Code pénal", resume: "L'article 433-6 du code pénal définit la rébellion, l'article 433-7 la réprime avec ses circonstances aggravantes." },
  { code: "Code pénal", titre: "La provocation directe à la rébellion", reference: "Art. 433-10 du Code pénal", resume: "Le fait d'inciter quelqu'un à commettre le délit de rébellion en usant de cris, discours publics, écrits affichés ou distribués, ou par tout autre moyen de transmission de l'écrit, de la parole ou de l'image, constitue une infraction." },
  { code: "Code pénal", titre: "La corruption active", reference: "Art. 433-1 du Code pénal", resume: "Le fait, par quiconque, de proposer sans droit, à tout moment, directement ou indirectement, des offres, promesses, dons, présents ou avantages quelconques à une personne dépositaire de l'autorité publique, chargée d'une mission de service public ou investie d'un mandat électif public, pour elle-même ou pour autrui, pour qu'elle accomplisse ou s'abstienne d'accomplir un…" },
  { code: "Code pénal", titre: "La diffusion d'images (complicité et délit distinct)", reference: "Art. 521-1-2 C.P.", resume: "**Enregistrer volontairement** des images de sévices graves/actes de cruauté/atteintes sexuelles est un **acte de complicité**, puni des mêmes peines (sauf si l'enregistrement contribue à un débat public d'intérêt général ou sert de preuve en justice). **La diffusion sur internet** de ces images est un délit distinct : **2 ans - 30 000 €.**" },
  { code: "Code pénal", titre: "Les menaces contre les personnes", reference: "Art. R.623-1, 222-17, 222-18 du Code pénal", resume: "La menace de commettre soit des violences, soit un crime ou un délit contre les personnes, lorsqu'elle est réitérée ou matérialisée, constitue une infraction. La menace avec ordre de remplir une condition en est une autre forme." },
  { code: "Code pénal", titre: "L'outrage sexiste et sexuel", reference: "Art. R.625-8-3 et 222-33-1-1 du Code pénal", resume: "Le fait d'imposer à une personne tout propos ou comportement à connotation sexuelle ou sexiste qui soit porte atteinte à sa dignité en raison de son caractère dégradant ou humiliant, soit crée à son encontre une situation intimidante, hostile ou offensante, constitue une infraction (hors les cas prévus aux art. 222-13, 222-32, 222-33, 222-33-2-2 et 222-33-2-3 C.P.)." },
  { code: "Code de procédure pénale", titre: "1. Assistance d'un interprète", reference: "Art. 10-3 C.P.P.", resume: "Traduction des informations indispensables à l'exercice des droits." },
  { code: "Code de procédure pénale", titre: "2. Accompagnement", reference: "Art. 10-4 C.P.P.", resume: "À tous les stades (notamment auditions), accompagnement par représentant légal ou personne majeure du choix de la victime (avocat compris), sauf décision contraire motivée. L'avocat accompagnant **ne peut intervenir pendant l'audition** — il attend la fin pour poser des questions (retranscrites au PV) ou présente des observations écrites annexées." },
  { code: "Code de procédure pénale", titre: "Compétences des O.P.J.", reference: "Art. 12 à 19, 78-3 du Code de procédure pénale", resume: "Les O.P.J. sont compétents dans les limites territoriales où ils exercent leurs fonctions habituelles. Le ressort varie selon le service : ensemble du territoire national, une ou plusieurs zones de défense, ou l'ensemble d'un département/collectivité d'outre-mer." },
  { code: "Code de procédure pénale", titre: "Le procureur de la République", reference: "Art. 12, 39-3, 40, 41, 42, 54, 68, 75-1 du Code de procédure pénale", resume: "Dans ses missions de police judiciaire, le gardien de la paix est susceptible d'agir conformément aux instructions du procureur, sous couvert de la voie hiérarchique. Il existe un procureur auprès de chaque tribunal judiciaire, assisté d'un procureur adjoint et de substituts — l'ensemble constitue « le parquet »." },
  { code: "Code de procédure pénale", titre: "La qualité d'officier, agent et agent adjoint de police judiciaire", reference: "Art. 12, 13, 16, 16-1 A, 20, 20-1, 21, 21-3 du Code de procédure pénale", resume: "La police judiciaire est exercée sous la direction du procureur de la République (art. 12), placée sous la surveillance du procureur général et le contrôle de la chambre de l'instruction (art. 13). Le CPP confère la qualification d'O.P.J., d'A.P.J. ou d'A.P.J.A. — les O.P.J. et A.P.J. peuvent être secondés par des assistants d'enquête." },
  { code: "Code de procédure pénale", titre: "Les cadres d'enquête", reference: "Art. 14, 17, 53 à 78 du Code de procédure pénale", resume: "Les actes de police judiciaire (constater les infractions, en rassembler les preuves, en rechercher les auteurs) s'accomplissent au cours de la « phase policière », désignée par le CPP sous le nom d'**enquêtes**. Les articles 14 et 17 mentionnent 3 cadres juridiques : l'enquête de flagrant délit, l'enquête préliminaire, la commission rogatoire. D'autres cadres spécifiques…" },
  { code: "Code de procédure pénale", titre: "La protection du rédacteur", reference: "Art. 15-3, 15-4 C.P.P.", resume: "Le rédacteur d'un PV de plainte peut s'identifier par son n° R.I.O. sans autorisation préalable (art. 15-3). Tout agent peut s'identifier par son R.I.O. dans les actes qu'il rédige ou comme assistant, sans faire apparaître nom/prénom (art. 15-4), si la révélation de son identité est susceptible de mettre en danger sa vie/intégrité (ou celles de ses proches) — soumis à…" },
  { code: "Code de procédure pénale", titre: "La plainte — Généralités", reference: "Art. 15-3, 10-2 à 10-5, 15-3-1, 15-3-1-1, 15-3-2, 138-3, 706-47, 706-52, 706-53 du Code de procédure pénale", resume: "La plainte est l'acte par lequel la personne victime d'un crime, d'un délit ou d'une contravention porte ce fait à la connaissance de l'autorité compétente. Les OPJ/APJ sont tenus de recevoir les plaintes, y compris hors compétence territoriale (transmission au service compétent). Tout dépôt donne lieu à un PV, un récépissé immédiat, et une copie du PV sur demande." },
  { code: "Code de procédure pénale", titre: "Compétences des A.P.J. et A.P.J.A.", reference: "Art. 20 et 21 du Code de procédure pénale", resume: "La police judiciaire est composée des O.P.J., des A.P.J. et A.P.J.A., des assistants d'enquête et des fonctionnaires auxquels sont attribuées certaines fonctions de police judiciaire." },
  { code: "Code de procédure pénale", titre: "Les renseignements à recueillir sur les lieux d'un accident « corporel » de la circulation", reference: "Art. 20 C.P.P. — Art. L.130-3 du Code de la route", resume: "Les gardiens de la paix recherchent et constatent les infractions au code de la route et les atteintes involontaires à la vie/l'intégrité commises à l'occasion d'accidents de la circulation. Dès la sécurisation des lieux, ils procèdent aux constatations (alcoolémie, stupéfiants, rétention du permis...) et recueillent méthodiquement les renseignements déterminants pour la…" },
  { code: "Code de procédure pénale", titre: "Compétences des assistants d'enquête", reference: "Art. 21-3 et R.15-17-2 à R.15-17-5 du Code de procédure pénale", resume: "Certains militaires du corps de soutien de la gendarmerie, personnels administratifs de catégorie B et A.P.J.A. de la police/gendarmerie peuvent occuper les fonctions d'assistants d'enquête, après une formation certifiée par examen (art. R.15-17-2 C.P.P.)." },
  { code: "Code de procédure pénale", titre: "Le juge d'instruction", reference: "Art. 49, 51, 68, 92 à 154 du Code de procédure pénale", resume: "Le juge d'instruction est un magistrat que le gardien de la paix rencontre notamment lors de transferts ou d'exécution de mandats. Choisi parmi les juges du tribunal judiciaire, nommé pour 3 ans renouvelables par décret sur avis du CSM." },
  { code: "Code de procédure pénale", titre: "L'enquête de flagrant délit", reference: "Art. 53 à 73 du Code de procédure pénale", resume: "Est qualifié crime ou délit flagrant le crime ou le délit qui se commet actuellement, ou qui vient de se commettre. Il y a aussi flagrance lorsque, dans un temps très voisin de l'action, la personne soupçonnée est poursuivie par la clameur publique, ou est trouvée en possession d'objets, ou présente des traces/indices laissant penser qu'elle a participé au crime/délit." },
  { code: "Code de procédure pénale", titre: "Définition de la flagrance", reference: "Art. 53 C.P.P.", resume: "Est qualifié crime ou délit flagrant le crime ou le délit qui se commet actuellement, ou qui vient de se commettre. Il y a aussi flagrance lorsque, dans un temps très voisin de l'action, la personne soupçonnée est poursuivie par la clameur publique, ou est trouvée en possession d'objets, ou présente des traces/indices laissant penser qu'elle a participé au crime/délit." },
  { code: "Code de procédure pénale", titre: "Primo-intervenant sur une scène d'infraction", reference: "Art. 54, D.7, 55, 434-4 du Code de procédure pénale et du Code pénal", resume: "Les premières mesures conservatoires prises par un policier dès son arrivée sur les lieux d'un crime ou d'un délit jouent un rôle primordial dans la préservation des traces et indices, essentielles pour la résolution de l'enquête et le futur procès. Les traces peuvent être visibles ou non (traces de pas, de peinture, d'outils, impacts, traces biologiques, papillaires), les…" },
  { code: "Code de procédure pénale", titre: "1. La réclamation faite de l'intérieur de la maison", reference: "Art. 59 C.P.P.", resume: "Appel au secours (cris, hurlements) — l'introduction est justifiée même si l'appel s'avère fantaisiste." },
  { code: "Code de procédure pénale", titre: "5. Visites domiciliaires, perquisitions, saisies", reference: "Art. 59-1, 706-89 C.P.P.", resume: "En flagrance, l'O.P.J. assisté de l'A.P.J., par ordonnance spécialement motivée du JLD à la requête du procureur, peut perquisitionner/saisir en dehors des heures de l'art. 59." },
  { code: "Code de procédure pénale", titre: "La perquisition en enquête préliminaire", reference: "Art. 59, 76 du Code de procédure pénale — Art. 131-21 du Code pénal", resume: "La perquisition est la recherche, dans tout lieu normalement clos, d'indices, de documents ou d'objets confiscables relatifs aux faits incriminés. La remise spontanée de documents ne constitue pas une perquisition. **En enquête de flagrance, l'A.P.J. n'est pas habilité à perquisitionner** — son intervention se limite à assister l'O.P.J." },
  { code: "Code de procédure pénale", titre: "Le suspect libre", reference: "Art. 61-1, 62, 65, 706-112-2 du Code de procédure pénale — Art. L.412-1, L.412-2, R.412-1 du C.J.P.M.", resume: "Le statut de suspect libre permet d'entendre une personne soupçonnée hors du cadre de la garde à vue (art. 61-1 C.P.P.), qui fixe les conditions et les droits devant être portés à sa connaissance." },
  { code: "Code de procédure pénale", titre: "L'absence de contrainte (condition sine qua non)", reference: "Art. 61-1 C.P.P.", resume: "Impossible d'entendre librement une personne conduite sous contrainte par la force publique (contrainte à monter dans le véhicule, menottage durant le trajet). L'enquêteur doit systématiquement confirmer que la personne a suivi de son plein gré." },
  { code: "Code de procédure pénale", titre: "La confrontation", reference: "Art. 61-2, 63-4-2, 63-4-3, 63-4-5 du Code de procédure pénale", resume: "Au cours d'une enquête, les déclarations enregistrées pour un même événement peuvent être contradictoires (victime/suspects, ou entre plusieurs suspects). La confrontation consiste à mettre en présence les personnes dont les déclarations sont contradictoires." },
  { code: "Code de procédure pénale", titre: "Le témoignage — Généralités", reference: "Art. 62, 78, 706-57, 706-58 du Code de procédure pénale", resume: "Le témoignage est un des éléments essentiels de l'enquête : il permet de déterminer les circonstances de l'affaire, d'orienter les recherches et parfois d'identifier les auteurs — mais reste un mode de preuve précaire." },
  { code: "Code de procédure pénale", titre: "Le droit de ne pas être retenu", reference: "Art. 62 C.P.P.", resume: "Les témoins (aucune raison plausible de soupçon) sont entendus sans mesure de contrainte. Si nécessaire, rétention possible le temps strictement nécessaire à l'audition, **sans excéder 4 heures** — ce délai ne s'applique pas si la personne comparaît librement et sait qu'elle peut quitter à tout moment." },
  { code: "Code de procédure pénale", titre: "La notification du placement en garde à vue et des droits par un A.P.J.", reference: "Art. 62-2, 63-1 à 63-4-3 du Code de procédure pénale", resume: "Si la décision de placer en garde à vue reste du domaine exclusif de l'O.P.J., le gardien de la paix (A.P.J.) peut être amené à notifier à une personne son placement et les droits inhérents." },
  { code: "Code de procédure pénale", titre: "3. Mise à disposition d'effets personnels durant l'audition", reference: "Art. 63-6 C.P.P.", resume: "Le gardé à vue peut disposer d'objets nécessaires au respect de sa dignité (lunettes, appareil auditif), pour s'assurer qu'il entend/comprend/signe en connaissance de cause — retirés à l'issue de chaque acte, avec vigilance sur les retraits/restitutions successifs." },
  { code: "Code de procédure pénale", titre: "1. Droit de faire prévenir un tiers", reference: "Art. 63-2 I C.P.P.", resume: "Personne vivant habituellement avec le gardé à vue, parent en ligne directe, frère/sœur, ou toute autre personne désignée ; son employeur ; les autorités consulaires (étranger). **Délai maximum 3 heures** à compter de la demande, sauf circonstances insurmontables mentionnées au PV. Peut être différé/refusé par le procureur sur demande de l'O.P.J. (préservation des preuves,…" },
  { code: "Code de procédure pénale", titre: "2. Droit de communiquer", reference: "Art. 63-2 II C.P.P.", resume: "Communication (écrit, téléphone, entretien) avec un tiers de l'art. 63-2-I, autorisée par l'O.P.J. si compatible avec les objectifs de l'art. 62-2 et sans risque d'infraction — **durée maximum 30 minutes**, sous contrôle de l'O.P.J." },
  { code: "Code de procédure pénale", titre: "3. Droit d'être examiné par un médecin", reference: "Art. 63-3 C.P.P.", resume: "Sur demande de la personne, ou d'office par le procureur/l'O.P.J. ; de droit si un membre de la famille le demande. **Seconde demande possible en cas de prolongation.** Examen possible par vidéotransmission. Le médecin se prononce sur l'aptitude au maintien en garde à vue. **Aucune contrainte possible** — refus mentionné en procédure. Délai maximum 3 heures." },
  { code: "Code de procédure pénale", titre: "4. Droit d'être assisté par un avocat", reference: "Art. 63-3-1 à 63-4-3 C.P.P.", resume: "Avisée dès le début, choix ou commission d'office, possibilité de changer d'avis à tout moment." },
  { code: "Code de procédure pénale", titre: "6. Droit de consulter certaines pièces", reference: "Art. 63-4-1 C.P.P.", resume: "PV de notification du placement et des droits, certificat médical, PV d'audition/confrontation — au plus tard avant l'éventuelle prolongation." },
  { code: "Code de procédure pénale", titre: "La fouille intégrale", reference: "Art. 63-7 C.P.P.", resume: "**Moyen de recherche de la preuve, et non une mesure de sécurité.** N'est possible que si la palpation ou les moyens de détection électronique ne peuvent être réalisés — recherche d'objets utiles à la manifestation de la vérité ou dont la détention constitue une infraction. Décidée par un O.P.J. pour les nécessités de l'enquête." },
  { code: "Code de procédure pénale", titre: "L'audition du suspect", reference: "Art. 64-1, 706-112-1 du Code de procédure pénale — Art. L.311-1, L.413-12 du C.J.P.M.", resume: "Recueillir les aveux est le but recherché dans toute audition d'un mis en cause — mais pas n'importe quels aveux : ils doivent être **circonstanciés**. La conduite d'une audition nécessite le respect de règles précises." },
  { code: "Code de procédure pénale", titre: "Des majeurs en garde à vue en matière criminelle", reference: "Art. 64-1 C.P.P.", resume: "Obligatoire. Dérogations exceptionnelles :" },
  { code: "Code de procédure pénale", titre: "L'interpellation", reference: "Art. 73, 78, 803 du Code de procédure pénale — Art. R.434-16 à R.434-18 C.S.I.", resume: "« Dans le cas de crime flagrant ou de délit flagrant puni d'une peine d'emprisonnement, toute personne a qualité pour en appréhender l'auteur et le conduire devant l'officier de police judiciaire le plus proche » (art. 73 C.P.P.). Le placement en garde à vue n'est pas automatique si la personne n'est pas tenue sous la contrainte et a été informée qu'elle peut à tout moment…" },
  { code: "Code de procédure pénale", titre: "L'enquête préliminaire", reference: "Art. 75 à 78 du Code de procédure pénale", resume: "Enquête menée par les O.P.J./A.P.J., soit d'office, soit sur instructions du procureur de la République, en dehors des cas de flagrance." },
  { code: "Code de procédure pénale", titre: "4. La perquisition en enquête préliminaire", reference: "Art. 75, 76 C.P.P.", resume: "Soumise à l'autorisation préalable et écrite de la personne. Pour un crime/délit puni ≥3 ans, seul l'O.P.J. peut perquisitionner sans assentiment, sur autorisation du JLD. Les opérations commencées avant 21h peuvent se poursuivre au-delà." },
  { code: "Code de procédure pénale", titre: "1. Avec assentiment", reference: "Art. 76 al.1 C.P.P.", resume: "Perquisitions, saisies et scellés (biens confiscables art. 131-21 C.P.) nécessitent l'**assentiment exprès et écrit** de la personne. Autorisation donnée par le maître des lieux, **rédigée avant** la perquisition, **manuscrite et expresse**, **irrévocable et personnelle**." },
  { code: "Code de procédure pénale", titre: "2. Sans assentiment", reference: "Art. 76 al.4 C.P.P.", resume: "Pour un crime/délit puni d'emprisonnement ≥3 ans, perquisition possible sans assentiment. Autorisation préalable du **JLD**, à la requête du procureur — écrite et motivée, précisant sous peine de nullité la qualification de l'infraction et l'adresse des lieux." },
  { code: "Code de procédure pénale", titre: "Le contrôle d'identité", reference: "Art. 78-1 à 78-6 du Code de procédure pénale", resume: "Sur l'ensemble du territoire, l'identité de toute personne peut être contrôlée par un O.P.J., ou sur son ordre et sous sa responsabilité par un A.P.J./A.P.J.A., pour rechercher/prévenir une infraction." },
  { code: "Code de procédure pénale", titre: "Le droit de ne pas déposer", reference: "Art. 78 C.P.P.", resume: "Les personnes convoquées par un O.P.J. sont tenues de comparaître (contrainte par la force publique possible avec autorisation du procureur en cas de non-réponse). **Mais le témoin n'est pas tenu de déposer** — aucune sanction en cas de refus, mention de ce refus au PV." },
  { code: "Code de procédure pénale", titre: "Le contrôle d'identité — Le cadre général", reference: "Art. 78-1 à 78-6 du Code de procédure pénale — Art. R.434-16 C.S.I.", resume: "Le contrôle d'identité est l'opération par laquelle une personne est invitée à justifier sur-le-champ de son identité. « Le policier ne se fonde sur aucune caractéristique physique ou signe distinctif pour déterminer les personnes à contrôler, sauf s'il dispose d'un signalement précis motivant le contrôle. Le contrôle se déroule sans qu'il soit porté atteinte à la dignité…" },
  { code: "Code de procédure pénale", titre: "1. Sur réquisitions écrites du procureur", reference: "Art. 78-2-2 C.P.P.", resume: "Les OPJ (et sur leur ordre, APJ/APJA) peuvent, dans les lieux/périodes déterminés : contrôler l'identité (art. 78-2 al.7, pour terrorisme/explosifs/stupéfiants...), assister les OPJ pour la visite de véhicules en circulation/arrêt/stationnement, l'inspection/fouille de bagages, ou la visite de bateaux/engins flottants." },
  { code: "Code de procédure pénale", titre: "2. En cas de crime ou délit flagrant", reference: "Art. 78-2-3 C.P.P.", resume: "APJ/APJA peuvent assister les OPJ pour visiter un véhicule si raison plausible de soupçonner le conducteur/passager d'un crime/délit flagrant. **Ne prévoit pas** le contrôle d'identité ni l'inspection de bagages." },
  { code: "Code de procédure pénale", titre: "3. Pour prévenir une atteinte grave à la sécurité", reference: "Art. 78-2-4 C.P.P.", resume: "OPJ (et sous leur ordre, APJ/APJA) peuvent procéder aux contrôles de l'art. 78-2 al.8, à la visite de véhicules (avec l'accord du conducteur, ou sur instructions du procureur — immobilisation possible **30 min max** dans l'attente), et à l'inspection/fouille de bagages (avec l'accord du propriétaire, ou sur instructions du procureur — rétention **30 min max**)." },
  { code: "Code de procédure pénale", titre: "4. Manifestation avec port d'arme", reference: "Art. 78-2-5 C.P.P., 431-10 C.P.", resume: "Sur réquisitions écrites du procureur, aux lieux d'une manifestation et abords immédiats, pour une durée **maximale de 24h** : inspection/fouille des bagages, visite des véhicules." },
  { code: "Code de procédure pénale", titre: "La vérification d'identité et la vérification de situation", reference: "Art. 78-3, 78-3-1 du Code de procédure pénale", resume: "Si l'intéressé refuse ou ne peut justifier son identité, il peut être retenu sur place ou conduit au local de police pour vérification, et doit dans tous les cas être présenté à un O.P.J. **Retenue de la responsabilité exclusive de l'O.P.J., maximum 4 heures** (8h à Mayotte et en Guyane)." },
  { code: "Code de procédure pénale", titre: "La consignation", reference: "Art. L.121-4 du Code de la route — Art. A.37-27-1 du Code de procédure pénale", resume: "Auteurs (français ou étrangers) d'une infraction routière qui ne peuvent ni justifier d'un domicile/emploi en France, ni justifier d'une caution agréée (ex : Automobile-Club de France)." },
  { code: "Code de procédure pénale", titre: "Les mandats (recherche, comparution, amener, arrêt)", reference: "Art. 122 du Code de procédure pénale", resume: "Les 4 mandats délivrés par un magistrat (juge d'instruction) constituent des ordres donnés à la force publique, avec des degrés de coercition variables." },
  { code: "Code de procédure pénale", titre: "L'amende forfaitaire délictuelle (A.F.D.)", reference: "Art. L.221-2, L.324-2 du Code de la route — Art. 495-17 à 495-25, D.45-3 à D.45-21 du Code de procédure pénale", resume: "Les **A.P.J.A. ne sont pas habilités** à constater les délits par PV." },
  { code: "Code de procédure pénale", titre: "Le domicile — La violation de domicile", reference: "Art. 226-4, 432-8 du Code pénal — Art. 59, 59-1, 706-89, 749 et s. du Code de procédure pénale", resume: "Tout local d'habitation contenant des biens meubles appartenant à une personne, qu'elle y habite ou non, résidence principale ou non — l'endroit où une personne a le droit de se dire chez elle, quel que soit le titre juridique d'occupation, la seule condition étant que le lieu protège l'intimité. Étendu aux logements inoccupés contenant des meubles. La Cour de cassation…" },
  { code: "Code de procédure pénale", titre: "Les procès-verbaux", reference: "Art. 429 à 433, D.9 à D.11, 19, 107 du Code de procédure pénale", resume: "Le procès-verbal est un acte écrit, rédigé et signé par un magistrat, un O.P.J. ou un A.P.J., agissant dans les règles de sa compétence et de sa mission de police judiciaire. Il n'a de valeur probante que s'il est régulier en la forme, si son auteur a agi dans l'exercice de ses fonctions, et a rapporté ce qu'il a personnellement vu/entendu/constaté (art. 429 C.P.P.)." },
  { code: "Code de procédure pénale", titre: "Valant simples renseignements", reference: "Art. 430 C.P.P.", resume: "PV rédigés en flagrance (sauf délit prévu par une loi spéciale), en préliminaire, ou sur commission rogatoire — n'apportent aucune valeur probante, rôle d'information seulement." },
  { code: "Code de procédure pénale", titre: "Valant jusqu'à preuve contraire", reference: "Art. 431 C.P.P.", resume: "Nécessite une disposition expresse de la loi. La preuve contraire ne peut être apportée que par écrit ou témoins (ex : code du travail). Le rédacteur relate uniquement ce qu'il a personnellement constaté." },
  { code: "Code de procédure pénale", titre: "Valant jusqu'à inscription de faux", reference: "Art. 433 C.P.P.", resume: "Réglé par des lois spéciales, dressés par des agents spécialisés (douanes, ONF...). Autorité absolue liant le juge, tenu de condamner si : les faits sont constitutifs d'une infraction, l'infraction est de la compétence de l'agent, elle n'est pas prescrite/amnistiée, elle n'est pas entachée d'un vice de forme." },
  { code: "Code de procédure pénale", titre: "L'amende forfaitaire", reference: "Art. 529 et suivants, R.48-1 et suivants du Code de procédure pénale", resume: "Concerne les contraventions au code de la route non minorées, ainsi que celles en matière d'arrêt/stationnement, d'assurance des véhicules, ou de réglementation des transports routiers." },
  { code: "Code de procédure pénale", titre: "1. Mineur victime d'un crime ou d'un délit", reference: "Art. 706-53 C.P.P.", resume: "Peut être accompagné (à sa demande) d'un représentant légal, d'une personne majeure de son choix, ou d'un représentant d'association agréée." },
  { code: "Code de procédure pénale", titre: "2. Mineur victime d'infraction à caractère sexuel", reference: "Art. 706-47, 706-52 C.P.P.", resume: "**Enregistrement audiovisuel obligatoire** de l'audition (limite le nombre d'auditions, permet de déceler des éléments non verbalisés) — également possible pour le harcèlement scolaire. Peut être exclusivement sonore sur décision du procureur/juge d'instruction si l'intérêt du mineur le justifie." },
  { code: "Code de procédure pénale", titre: "Le domicile", reference: "Art. 706-57 C.P.P.", resume: "Audition anonyme possible sur autorisation du **juge des libertés et de la détention**, si l'enquête porte sur un crime/délit puni d'au moins 3 ans et si l'audition risque de mettre gravement en danger la vie/l'intégrité du témoin ou de ses proches." },
  { code: "Code de procédure pénale", titre: "L'anonymat", reference: "Art. 706-58 C.P.P.", resume: "Audition anonyme possible sur autorisation du **juge des libertés et de la détention**, si l'enquête porte sur un crime/délit puni d'au moins 3 ans et si l'audition risque de mettre gravement en danger la vie/l'intégrité du témoin ou de ses proches." },
  { code: "Code de procédure pénale", titre: "Le menottage", reference: "Art. 803 C.P.P. — Art. R.434-17, R.434-10 C.S.I.", resume: "Mesure de sûreté relevant des pouvoirs de coercition en matière d'arrestation/détention. « Nul ne peut être soumis au port de menottes ou d'entraves que s'il est considéré soit comme dangereux pour autrui ou pour lui-même, soit comme susceptible de tenter de prendre la fuite » (art. 803 C.P.P.). Ne doit jamais être systématique." },
  { code: "Code de procédure pénale", titre: "L'amende forfaitaire délictuelle en matière d'usage illicite de stupéfiants", reference: "Art. L.3421-1 C.S.P. — Art. 495-17 à 495-25, D.45-3 à D.45-21, A.36-14 à A.36-18 C.P.P.", resume: "Lorsque la loi le prévoit, l'action publique peut être éteinte par le paiement d'une amende forfaitaire délictuelle (A.F.D.). Lorsque le délit d'usage illicite de stupéfiants (art. L.3421-1 al.1 C.S.P., natinf 180) est constaté, l'A.F.D. peut être mise en œuvre (al.3), par procès-verbal électronique." },
  { code: "Code de la route", titre: "Définitions", reference: "Art. R.110-2 du Code de la route", resume: "Est complice d'un crime ou d'un délit la personne qui, sciemment, par aide ou assistance, en a facilité la préparation ou la consommation. Est également complice celle qui, par don, promesse, menace, ordre, abus d'autorité ou de pouvoir, a provoqué à une infraction ou donné des instructions pour la commettre." },
  { code: "Code de la route", titre: "Les compétences des agents verbalisateurs en matière de circulation routière", reference: "Art. L.130-4 à L.130-7 du Code de la route", resume: "Les contraventions au code de la route sont constatées par procès-verbal, dressé par des agents habilités à cet effet, selon leur qualité et les infractions concernées." },
  { code: "Code de la route", titre: "La régulation de la circulation", reference: "Art. R.130-10, R.411-28 du Code de la route", resume: "Les fonctionnaires de police nationale et les policiers adjoints placés sous leur commandement ont le pouvoir de régler la circulation, sur les lieux d'un accident, dans le cadre d'un contrôle routier, ou pour faciliter l'écoulement du trafic. Les indications données par ces agents prévalent sur toute signalisation, feu ou règle de circulation." },
  { code: "Code de la route", titre: "Le brevet de sécurité routière (B.S.R.)", reference: "Art. R.211-2 du Code de la route", resume: "Exigé pour la conduite d'un cyclomoteur ou d'un quadricycle léger à moteur par un conducteur non titulaire du permis de conduire." },
  { code: "Code de la route", titre: "Le permis de conduire", reference: "Art. L.221-1, L.221-2, R.221-1 à R.222-7 du Code de la route", resume: "Nul ne peut conduire un véhicule pour lequel un permis est exigé sans être titulaire de la catégorie correspondante, ni si son permis fait l'objet d'une mesure administrative ou judiciaire." },
  { code: "Code de la route", titre: "Le permis à points", reference: "Art. L.223-1 à L.223-9, R.223-1 à R.223-4 du Code de la route", resume: "À l'obtention du premier droit de conduire (hors catégorie AM), le permis est affecté d'un capital initial de **6 points**. Pendant le délai probatoire, l'affectation du nombre maximal (**12 points**) intervient progressivement si aucune infraction à retrait de points n'est commise." },
  { code: "Code de la route", titre: "La rétention du permis de conduire", reference: "Art. L.224-1 à L.224-6, R.224-1 à R.224-5 du Code de la route", resume: "Les OPJ et APJ doivent retenir à titre conservatoire le permis (ou autre document justifiant du droit de conduire, hors B.S.R.) dans l'attente d'une éventuelle suspension par le préfet. **Les A.P.J.A. ne peuvent mettre en œuvre cette mesure que dans 2 cas (3 et 5).**" },
  { code: "Code de la route", titre: "Le refus d'obtempérer", reference: "Art. L.233-1 et L.233-1-1 du Code de la route", resume: "Le fait pour tout conducteur d'omettre d'obtempérer à une sommation de s'arrêter émanant d'un fonctionnaire ou agent chargé de constater les infractions et muni des insignes extérieurs et apparents de sa qualité constitue un délit." },
  { code: "Code de la route", titre: "La conduite après usage de stupéfiants", reference: "Art. L.235-1 à L.235-5, R.235-1 à R.235-13 du Code de la route — Arrêté du 13/12/16", resume: "Les OPJ/APJ procèdent au dépistage ; les A.P.J.A. agissent sur ordre et sous la responsabilité d'un O.P.J., dans tous les cas." },
  { code: "Code de la route", titre: "Le rodéo motorisé", reference: "Art. L.236-1 du Code de la route", resume: "Le fait d'adopter, au moyen d'un véhicule terrestre à moteur, une conduite répétant de façon intentionnelle des manœuvres constituant des violations d'obligations particulières de sécurité ou de prudence du code de la route, dans des conditions qui compromettent la sécurité des usagers ou qui troublent la tranquillité publique, constitue une infraction." },
  { code: "Code de la route", titre: "L'incitation, l'organisation et la promotion des rodéos motorisés", reference: "Art. L.236-2 du Code de la route", resume: "Le fait d'inciter directement une personne à participer à un rodéo motorisé, d'organiser un rassemblement destiné à cette pratique, ou d'en faire par tout moyen la promotion, constitue une infraction." },
  { code: "Code de la route", titre: "L'usage des signaux sonores et lumineux", reference: "Art. R.311-1, R.313-27, R.313-34, R.432-1 à R.432-4 du Code de la route", resume: "Les véhicules d'intérêt général prioritaires (police, gendarmerie, incendie...) sont équipés d'une catégorie d'avertisseurs spéciaux qui leur est réservée ; une catégorie différente est réservée aux véhicules bénéficiant de facilités de passage (ambulances...). En cas d'urgence et avec usage des avertisseurs, certaines règles du code de la route ne s'appliquent pas." },
  { code: "Code de la route", titre: "Le chargement", reference: "Art. R.312-19 à R.312-22 du Code de la route", resume: "Le chargement d'un véhicule ne doit pas être une cause de dommage ou de danger." },
  { code: "Code de la route", titre: "Éclairage et signalisation", reference: "Art. R.313-1 à R.313-23, R.416-4 à R.416-20, R.412-10, R.414-4 du Code de la route", resume: "Tout véhicule à moteur ou remorque ne peut être pourvu que des dispositifs d'éclairage/signalisation autorisés et installés conformément au code de la route (natinf 22830), en état de fonctionnement et respectant les conditions d'efficacité réglementaires." },
  { code: "Code de la route", titre: "Les pneumatiques", reference: "Art. R.314-1 et R.314-3 du Code de la route", resume: "Plusieurs pneumatiques non conformes sur un même véhicule = **une seule contravention** (Cass. crim. 25/05/1994). Noter au PV le numéro du/des pneumatique(s) non conforme(s) (gravé sur le flanc)." },
  { code: "Code de la route", titre: "Les miroirs rétroviseurs / systèmes de vision indirecte", reference: "Art. R.316-6 du Code de la route", resume: "Tout véhicule à moteur (sauf véhicules/appareils agricoles sans cabine fermée) doit être muni d'un ou plusieurs systèmes de vision indirecte permettant au conducteur de surveiller l'arrière depuis son siège (natinf 22627)." },
  { code: "Code de la route", titre: "Les essuie-glaces", reference: "Art. R.316-4 du Code de la route", resume: "Le pare-brise des véhicules à moteur (sauf cyclomoteurs 2/3 roues non carrossés, quadricycles légers non carrossés et motocyclettes) doit être muni d'au moins un essuie-glace à surface d'action, puissance et fréquence suffisantes pour une vision distincte de la route." },
  { code: "Code de la route", titre: "Les plaques", reference: "Art. R.317-8 à R.317-11 du Code de la route", resume: "Tout véhicule à moteur, remorque ou semi-remorque agricole doit être muni d'une plaque comportant le nom/la marque du constructeur, le type, le numéro d'identification du véhicule (V.I.N., inscrit rubrique E du certificat), et des informations techniques (poids, niveau sonore...). Le V.I.N. est aussi frappé à froid sur un élément indémontable. Non-conformité : natinf 22628." },
  { code: "Code de la route", titre: "Nuisances causées par les véhicules (bruit, usage intempestif de l'avertisseur sonore)", reference: "Art. R.318-1, R.318-3, R.416-1, R.416-2 du Code de la route", resume: "Les véhicules ne doivent pas émettre de bruits susceptibles de gêner les usagers ou les riverains." },
  { code: "Code de la route", titre: "Les certificats d'immatriculation", reference: "Art. R.322-1 à R.322-8 du Code de la route", resume: "Les véhicules à moteur (sauf cyclomobiles légers et EDPM), les remorques de PTAC >500 kg et les semi-remorques doivent être immatriculés. Le certificat comporte le numéro à reporter sur les plaques (natinf 7543). Depuis le 15 avril 2009, le numéro est attribué à titre définitif." },
  { code: "Code de la route", titre: "Le contrôle technique des véhicules légers, des véhicules motorisés à deux ou trois roues et quadricycles à moteur", reference: "Art. R.323-22 du Code de la route", resume: "Vérifie le bon état de marche et d'entretien du véhicule, réalisé dans un centre agréé à l'initiative du propriétaire." },
  { code: "Code de la route", titre: "L'immobilisation", reference: "Art. L.325-1 à L.325-13, R.325-1 à R.325-11 du Code de la route", resume: "Obligation faite par un OPJ, un APJ ou un APJA au conducteur/propriétaire d'un véhicule de le maintenir sur place ou à proximité du lieu de constatation, en se conformant aux règles de stationnement. Le véhicule reste sous la garde juridique de son propriétaire/conducteur." },
  { code: "Code de la route", titre: "L'obstacle à une mesure d'immobilisation (DÉLIT)", reference: "Art. L.325-3-1 C.R.", resume: "Réprime l'obstacle à l'immobilisation administrative ainsi que la mise en circulation malgré l'immobilisation prescrite (natinf 6245, 697, 21925, 21926) — contrôle alcoolémie obligatoire, retrait de 6 points." },
  { code: "Code de la route", titre: "La mise en fourrière", reference: "Art. L.325-1 à L.325-3, L.325-7 à L.325-13, R.325-1 et suivants du Code de la route", resume: "Transfert d'un véhicule en un lieu désigné par l'autorité administrative ou judiciaire, en vue d'y être retenu jusqu'à décision, aux frais du propriétaire." },
  { code: "Code de la route", titre: "L'obstacle à un ordre d'envoi en fourrière (DÉLIT)", reference: "Art. L.325-3-1 C.R.", resume: "Réprimé (natinf 25818) — contrôle alcoolémie obligatoire, dépistage stupéfiants facultatif, retrait de 6 points. Les A.P.J.A. ne sont pas habilités à le constater par PV. La non-restitution du certificat d'immatriculation dans les délais est également réprimée (natinf 21254)." },
  { code: "Code de la route", titre: "La ceinture de sécurité / systèmes de retenue pour enfant", reference: "Art. R.412-1, R.412-1-1, R.412-2 du Code de la route", resume: "Concerne tout véhicule sauf autobus/autocars PTAC >3,5 T." },
  { code: "Code de la route", titre: "Principes généraux de circulation", reference: "Art. R.412-6 à R.412-16 du Code de la route", resume: "Tout conducteur doit adopter un comportement prudent et respectueux, avec une prudence accrue envers les usagers vulnérables. Il doit se tenir en état/position d'exécuter commodément toutes les manœuvres (natinf 6090) — champ de vision et possibilités de mouvement non réduits par passagers, objets ou vitres non transparentes." },
  { code: "Code de la route", titre: "Intersections et priorités de passage", reference: "Art. R.412-29 à R.412-33, R.415-1 à R.415-15 du Code de la route", resume: "Le conducteur venant de la gauche cède le passage à celui venant de la droite, sauf signalisation contraire (natinf 207)." },
  { code: "Code de la route", titre: "Sens de circulation", reference: "Art. R.412-26 à R.412-28-1 du Code de la route", resume: "Constitué par l'action intentionnelle de placer sur une voie ouverte à la circulation publique un objet faisant obstacle au passage des véhicules, ou d'employer un moyen quelconque pour y faire obstacle (véhicules, panneaux, arbres abattus, chaussée défoncée...). **La tentative est punissable** (natinf 2271, natinf 11050 pour la tentative). **Vise exclusivement l'entrave à…" },
  { code: "Code de la route", titre: "Entrave / trouble à la circulation routière", reference: "Art. L.412-1 et R.412-51 du Code de la route", resume: "Constitué par l'action intentionnelle de placer sur une voie ouverte à la circulation publique un objet faisant obstacle au passage des véhicules, ou d'employer un moyen quelconque pour y faire obstacle (véhicules, panneaux, arbres abattus, chaussée défoncée...). **La tentative est punissable** (natinf 2271, natinf 11050 pour la tentative). **Vise exclusivement l'entrave à…" },
  { code: "Code de la route", titre: "Circulation sur autoroutes et bretelles de raccordement", reference: "Art. R.412-8, R.412-22, R.421-1 à R.421-10 du Code de la route", resume: "Franchissement et chevauchement **interdits** (natinf 11325 franchissement, 11326 chevauchement). **Exception** : chevauchement autorisé pour dépasser en sécurité un EDPM ou un cycle." },
  { code: "Code de la route", titre: "Lignes continues et discontinues", reference: "Art. R.412-18 à R.412-23 du Code de la route", resume: "Franchissement et chevauchement **interdits** (natinf 11325 franchissement, 11326 chevauchement). **Exception** : chevauchement autorisé pour dépasser en sécurité un EDPM ou un cycle." },
  { code: "Code de la route", titre: "Règles de circulation des engins de déplacement personnel motorisés (E.D.P.M.)", reference: "Art. R.412-43-1 à R.412-43-3, R.317-23-1, R.321-4-2 du Code de la route", resume: "Les conducteurs d'E.D.P.M. doivent être âgés d'au moins **14 ans**." },
  { code: "Code de la route", titre: "Vitesses des véhicules", reference: "Art. R.413-1 à R.413-19 du Code de la route", resume: "Interdiction de gêner la marche normale des autres véhicules en circulant sans raison valable à vitesse anormalement réduite, ou à moins de 80 km/h sur la voie la plus à gauche d'une autoroute en bonnes conditions et circulation fluide." },
  { code: "Code de la route", titre: "Croisement", reference: "Art. R.414-1 à R.414-3 du Code de la route", resume: "Il y a croisement entre deux véhicules circulant en sens inverse sur une même chaussée." },
  { code: "Code de la route", titre: "Dépassement", reference: "Art. R.414-4 à R.414-17 du Code de la route", resume: "Les dépassements s'effectuent **à gauche** (natinf 6102), sauf si le véhicule précédent a signalé son intention de tourner à gauche (natinf 11067)." },
  { code: "Code de la route", titre: "Le gilet de haute visibilité", reference: "Art. R.416-19, R.412-43-3, R.431-1-1 du Code de la route", resume: "Port obligatoire de nuit ou en cas de visibilité insuffisante de jour (gilet ou équipement rétro-réfléchissant, natinf 33361). Dispositif d'éclairage complémentaire non éblouissant/non clignotant autorisé en complément." },
  { code: "Code de la route", titre: "Les règles générales", reference: "Art. R.417-1, R.417-4 du Code de la route", resume: "Seul le stationnement contraire aux règles peut être sanctionné (art. R.417-4 C.R.)." },
  { code: "Code de la route", titre: "Le stationnement abusif", reference: "Art. R.417-12, R.417-13 du Code de la route", resume: "La **mise en fourrière** peut être prescrite si le conducteur/titulaire est absent ou refuse de faire cesser le stationnement abusif malgré injonction." },
  { code: "Code de la route", titre: "Arrêt / stationnement gênant", reference: "Art. R.417-10 du Code de la route — Art. L.2213-2, L.2213-3 du C.G.C.T.", resume: "La mise en fourrière peut être prescrite si le conducteur/propriétaire est absent ou refuse de faire cesser le stationnement gênant." },
  { code: "Code de la route", titre: "Arrêt ou stationnement dangereux", reference: "Art. R.417-9 du Code de la route", resume: "Tout véhicule à l'arrêt ou en stationnement doit être placé de manière à ne pas constituer un danger pour les usagers." },
  { code: "Code de la route", titre: "Arrêt ou stationnement sur un passage piétons ou à ses abords", reference: "Art. R.417-5, R.417-11 du Code de la route", resume: "Le véhicule est arrêté ou stationné en empiétant directement sur le passage piétons — natinf 32532 (stationnement), natinf 32533 (arrêt). Si le véhicule n'est pas un engin de déplacement personnel motorisé ou un cycle à pédalage assisté, vérifier également le cas n°3." },
  { code: "Code de la route", titre: "Cas n°1 — empiètement direct sur le passage piéton", reference: "Art. R.417-5 C.R.", resume: "Le véhicule est arrêté ou stationné en empiétant directement sur le passage piétons — natinf 32532 (stationnement), natinf 32533 (arrêt). Si le véhicule n'est pas un engin de déplacement personnel motorisé ou un cycle à pédalage assisté, vérifier également le cas n°3." },
  { code: "Code de la route", titre: "Cas n°2 — stationnement très gênant sur le passage", reference: "Art. R.417-11, 5° C.R.", resume: "Le véhicule est arrêté ou stationné sur un passage réservé à la circulation des piétons — natinf 31088 (stationnement), natinf 31096 (arrêt)." },
  { code: "Code de la route", titre: "Cas n°3 — stationnement très gênant en amont", reference: "Art. R.417-11, 8°c C.R.", resume: "Le véhicule (hors EDPM et cycles à pédalage assisté) est arrêté ou stationné sur une distance de **5 mètres en amont** d'un passage piétons, dans le sens de la circulation, en dehors des emplacements matérialisés à cet effet — natinf 31092 (stationnement), natinf 31096 (arrêt)." },
  { code: "Code de la route", titre: "Arrêt ou stationnement (autoroute)", reference: "Art. R.421-1, R.421-5 et R.421-7 du Code de la route", resume: "Sauf en cas de **nécessité absolue**, les conducteurs ne doivent pas arrêter ou stationner leur véhicule sur les chaussées, accotements, bandes d'arrêt d'urgence et bretelles de raccordement des autoroutes (natinf 7573)." },
  { code: "Code de la route", titre: "Le casque et les gants de protection", reference: "Art. R.431-1 à R.431-1-2 du Code de la route", resume: "Tout conducteur ou passager d'une motocyclette, d'un cyclomoteur, d'un tricycle ou d'un quadricycle à moteur doit être coiffé d'un **casque homologué et attaché** (natinf 12931 moto, 12932 cyclo, 22921 tricycle/quad pour le conducteur ; 12933, 22922 pour le passager)." },
  { code: "Code de la route", titre: "Le casque de protection « cycliste »", reference: "Art. R.431-1-3 du Code de la route", resume: "Le conducteur et le passager d'un cycle âgés de **moins de 12 ans** doivent porter un casque « cycliste » conforme (marquage CE) et attaché. **Le non-respect de cette obligation par le mineur lui-même n'est pas réprimé.**" },
  { code: "Code de la route", titre: "Le délit de fuite", reference: "Art. 434-10 du Code pénal — Art. L.231-1 et R.231-1 du Code de la route", resume: "Le fait, pour tout conducteur d'un véhicule ou engin terrestre, fluvial ou maritime, sachant qu'il vient de causer ou d'occasionner un accident, de ne pas s'arrêter et de tenter ainsi d'échapper à la responsabilité pénale ou civile qu'il peut avoir encourue, constitue une infraction." },
  { code: "Code de la sécurité intérieure", titre: "La caméra piéton", reference: "Art. L.241-1, R.241-1 à R.241-5 du Code de la sécurité intérieure", resume: "Dans l'exercice de leurs missions de prévention/protection et de police judiciaire, les agents de la police nationale peuvent procéder, au moyen de caméras individuelles, à un enregistrement audiovisuel de leurs interventions, pour prévenir les incidents et constater des infractions/collecter des preuves. Les enregistrements peuvent aussi servir à la formation et à la…" },
  { code: "Code de la sécurité intérieure", titre: "Le placement sous vidéosurveillance", reference: "Art. L.256-1 à L.256-5 C.S.I.", resume: "Complète, sans s'y substituer, la surveillance humaine — contrôle en temps réel, enregistrement des séquences (sans le son), le simple renvoi d'images sans enregistrement est proscrit. S'applique aux GAV et retenues douanières." },
  { code: "Code de la sécurité intérieure", titre: "Les principaux fichiers", reference: "Art. R.434-21 C.S.I.", resume: "Les policiers doivent connaître et respecter les finalités et les règles d'utilisation des fichiers auxquels ils ont accès." },
  { code: "Code de la sécurité intérieure", titre: "La palpation de sécurité", reference: "Art. R.434-16 C.S.I.", resume: "« La palpation de sécurité est exclusivement une mesure de sûreté. Elle ne revêt pas un caractère systématique. Elle est réservée aux cas dans lesquels elle apparaît nécessaire à la garantie de la sécurité du policier ou du gendarme qui l'accomplit ou de celle d'autrui. » Chaque fois que possible, elle est pratiquée à l'abri du regard du public, et exécutée par une personne…" },
  { code: "Code de la sécurité intérieure", titre: "L'usage de la coercition", reference: "Art. R.434-18 C.S.I.", resume: "L'emploi de la force n'intervient qu'en cas de nécessité et de façon proportionnée — tout recours injustifié constitue des violences illégitimes (responsabilité pénale et disciplinaire). Décrire précisément dans le rapport/PV les actes de résistance et les moyens de coercition employés ; distinguer les blessures dues à l'interpellation de celles antérieures (constat médical…" },
  { code: "Code de la sécurité intérieure", titre: "Le cadre légal d'usage des armes", reference: "Art. L.435-1 du Code de la sécurité intérieure", resume: "Le policier doit respecter trois conditions pour que les règles de l'usage de l'arme s'appliquent :" },
  { code: "CESEDA", titre: "Le contrôle du séjour et de la circulation des étrangers", reference: "Art. L.812-2, L.812-3 et suivants, L.813-1, L.813-5, L.411-1, L.414-4 à L.414-9 du CESEDA — Art. 441-8 du Code pénal", resume: "Le contrôle des étrangers vise à vérifier le respect des obligations de détention, port et présentation des pièces autorisant à circuler ou séjourner en France." },
  { code: "CESEDA", titre: "Lors d'un contrôle d'identité", reference: "Art. L.812-2/2° CESEDA", resume: "Les personnes contrôlées (art. 78-1, 78-2, 78-2-1, 78-2-2 C.P.P.) doivent justifier leur identité. Si le contrôle révèle une nationalité étrangère, elles peuvent être tenues de présenter leurs pièces de circulation/séjour. **La déduction de la nationalité doit se fonder sur des critères objectifs excluant toute discrimination** — la simple évocation d'être né à l'étranger…" },
  { code: "CESEDA", titre: "Lorsque la qualité d'étranger est apparente", reference: "Art. L.812-2/1° CESEDA", resume: "Contrôle direct possible sans contrôle d'identité préalable, fondé sur des **éléments d'extranéité objectifs et extérieurs** à la personne — toute discrimination (couleur de peau, langue, tenue) est exclue." },
  { code: "CESEDA", titre: "Lors d'une visite sommaire d'un véhicule", reference: "Art. L.812-3 et s. CESEDA", resume: "Vise tous véhicules circulant sur voie publique dans des zones délimitées : 20 km en deçà des frontières Schengen ; 20 km du littoral dans les départements à pression migratoire désignés par arrêté ; 10 km autour de certains ports/aéroports frontaliers ; aires de stationnement/péages autoroutiers dans le prolongement de ces zones." },
  { code: "Code de la justice pénale des mineurs", titre: "Le mineur suspecté", reference: "Art. L.311-1 C.J.P.M.", resume: "Peut être accompagné par ses représentants légaux ou un adulte approprié, si l'enquêteur estime que c'est dans l'intérêt supérieur de l'enfant et sans préjudice pour la procédure." },
  { code: "Code de la justice pénale des mineurs", titre: "1. Avis aux représentants légaux", reference: "Art. L.412-1, L.412-2 C.J.P.M.", resume: "Obligation d'aviser par tout moyen les représentants légaux/la personne/le service auquel le mineur est confié. En cas de crime/délit puni d'emprisonnement, s'il n'a pas sollicité d'avocat, les représentants sont avisés de leur droit d'en faire la demande." },
  { code: "Code de la justice pénale des mineurs", titre: "2. Assistance d'un avocat", reference: "Art. L.412-2 C.J.P.M.", resume: "Le mineur est **obligatoirement assisté** d'un avocat. Sans désignation, information du bâtonnier pour commission d'office." },
  { code: "Code de la justice pénale des mineurs", titre: "3. Droit à l'information", reference: "Art. R.412-1 C.J.P.M.", resume: "Le document source reproduit les canevas complets de PV de notification de placement en garde à vue (majeur et mineur, y compris retenue judiciaire des 10-13 ans), et de notification des droits du suspect libre. Ces outils de rédaction pratique sont sous-tendus par les règles détaillées dans les fiches ci-dessus. Se référer au fascicule original (pages 115 à 133) pour les…" },
  { code: "Code de la justice pénale des mineurs", titre: "Des mineurs en garde à vue", reference: "Art. L.413-12 C.J.P.M.", resume: "**Obligatoire et systématique**, tous cadres d'enquête confondus. Le mineur (ou son représentant) n'a pas à être informé ni à donner son accord — vient en complément du PV. En cas d'impossibilité technique, le procureur/juge d'instruction est immédiatement avisé, avec précision de la nature de l'impossibilité au PV." },
  { code: "Code de la santé publique", titre: "La conduite sous l'influence de l'alcool : les faits réprimés", reference: "Art. L.234-1, L.234-8, R.234-1 du Code de la route — Art. L.3354-2 du Code de la santé publique", resume: "Basée sur la constatation d'un taux d'alcool dans l'air expiré ou le sang, mesuré sauf impossibilité par éthylomètre (ou prélèvement sanguin)." },
  { code: "Code de la santé publique", titre: "L'ivresse publique et manifeste (I.P.M.)", reference: "Art. L.3341-1, R.3353-1 du Code de la santé publique", resume: "Toute personne trouvée en état d'ivresse dans un lieu public est, par mesure de police, conduite à ses frais (après examen médical attestant que son état de santé ne s'y oppose pas) dans le local de police/gendarmerie le plus proche ou une chambre de sûreté, pour y être retenue jusqu'à ce qu'elle ait recouvré la raison. Si l'audition immédiate n'est pas nécessaire, elle…" },
  { code: "Code de la santé publique", titre: "L'usage illicite de stupéfiants", reference: "Art. L.3421-1, L.3421-5, L.3421-6 du Code de la santé publique — Art. 222-41 du Code pénal", resume: "L'usage illicite de l'une des substances ou plantes classées comme stupéfiants est une infraction." },
  { code: "Code de la santé publique", titre: "Identification et détection des produits stupéfiants", reference: "Art. L.5132-1, L.5132-6 du Code de la santé publique", resume: "Vocabulaire et classification des principales substances stupéfiantes (naturelles, de synthèse, médicaments détournés) et de leurs effets." },
  { code: "Code rural et de la pêche maritime", titre: "Les chiens d'attaque, de garde ou de défense", reference: "Art. L.211-12 et suivants du Code rural et de la pêche maritime", resume: "Le code rural classe certains chiens considérés comme les plus dangereux en 2 catégories : 1re catégorie (chiens d'attaque) et 2e catégorie (chiens de garde ou de défense). Les détenteurs sont soumis à des règles particulières (attestation d'aptitude, permis de détention, accès à certains lieux)." },
  { code: "Code rural et de la pêche maritime", titre: "Lutte contre la maltraitance animale", reference: "Art. 515-14 C. civ. — Art. 521-1 à 522-2 C.P. — Art. L.214-1, R.215-4, L.215-11 C.R.P.M.", resume: "Les animaux sont des êtres vivants doués de sensibilité (art. 515-14 C. civ.) et doivent être placés par leur propriétaire dans des conditions compatibles avec les impératifs biologiques de leur espèce. Depuis le 01/10/2022, tout acquéreur d'un animal de compagnie doit signer un certificat d'engagement et de connaissance des besoins de l'espèce. Un référent « maltraitance…" },
  { code: "Code des transports", titre: "Les cas dans lesquels le policier peut procéder à un contrôle d'identité", reference: "Art. 78-2 à 78-2-5, L.2241-1-2 Code des transports", resume: "L'identité peut être contrôlée s'il existe une ou plusieurs raisons plausibles de soupçonner :" },
  { code: "Code des transports", titre: "5. Réseaux ferroviaires et guidés", reference: "Art. L.2241-1-2 C. transports", resume: "OPJ/APJ territorialement compétents (d'initiative), APJA : inspection visuelle des bagages sur les lignes/gares, fouille avec le consentement du propriétaire." },
  { code: "Code des assurances", titre: "L'assurance obligatoire", reference: "Art. L.211-1, R.211-14-0 à R.211-21-6 du Code des assurances — Art. L.324-1, L.324-2 du Code de la route", resume: "Toute personne physique ou morale (autre que l'État) doit être couverte par une assurance responsabilité civile pour faire circuler ou stationner un véhicule terrestre à moteur (immatriculé ou non) ou une remorque (natinf 6163)." },
  { code: "Code des assurances", titre: "Le cadre légal du contrôle routier", reference: "Art. R.233-1 et R.233-3 du Code de la route — Art. R.211-14-0 et suivants du Code des assurances", resume: "Les OPJ et APJ peuvent **interrompre d'initiative** la progression d'un véhicule à moteur (léger, poids lourd, deux-roues...), **en l'absence d'infraction préalable**, pour contrôler les pièces afférentes à la conduite et à la circulation." },
  { code: "Code de l'action sociale et des familles", titre: "Arrêt / stationnement très gênant", reference: "Art. R.417-11 du Code de la route — Art. L.2213-2, L.2213-3 du C.G.C.T., L.241-3 du C.A.S.F.", resume: "La mise en fourrière peut être prescrite si le conducteur/titulaire est absent ou refuse de faire cesser le stationnement très gênant." },
  { code: "Autres textes réglementaires", titre: "Nota — conduite par les policiers adjoints", reference: "Art. 134-1 R.G.E.P.N.", resume: "Seuls les P.A. titulaires du permis correspondant et dont les aptitudes ont été testées par le service d'emploi peuvent conduire un véhicule administratif." },
];

const CANEVAS_PV = [
  {
    theme: "Plainte contre X (auteur inconnu)",
    reference: "Procès-verbal de saisine — pages 18 à 21 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de rédaction", aide: "L'A.P.J. peut recevoir la plainte ailleurs qu'au service (domicile, hôpital...).", motsCles: ["service", "domicile"] },
      { titre: "2. Instructions", aide: "S'agissant d'un PV de saisine, l'A.P.J. agit sur « instructions permanentes du chef de service ».", motsCles: ["instructions permanentes", "chef de service"] },
      { titre: "3. Réception du déclarant", aide: "Mentionner les coordonnées d'un éventuel interprète. Selon la gravité des faits, informer immédiatement l'O.P.J. avant toute rédaction. Description succincte des circonstances.", motsCles: ["se présente", "victime", "informe"] },
      { titre: "4. Cadre juridique", aide: "Situer l'action en flagrance ou en préliminaire : « vu les articles 53 et suivants » ou « vu les articles 75 et suivants du C.P.P. ».", motsCles: ["article 53", "article 75", "flagrant", "préliminaire"] },
      { titre: "5. Droits des victimes", aide: "Informer des dispositions de l'art. 10-2 C.P.P. Nota : demande de dommages-intérêts (art. 420-1 C.P.P.) → se conformer aux consignes du Parquet local.", motsCles: ["10-2", "droits", "victime"] },
      { titre: "6. Identité", aide: "La petite identité de la victime est relevée lors de la création du Compte Rendu d'Infraction — rappel du nom et prénom suffit ici.", motsCles: ["nom", "prénom"] },
      { titre: "7. Déclarations", aide: "Déroulé des faits en H.L.M. (Heure, Lieu, Motif), à la 1re personne, récit libre puis guidé (questions ouvertes). Signalement du/des auteurs (sexe, âge apparent, taille, corpulence, type, cheveux, yeux, signes particuliers) et lien avec la victime. Reconnaissance éventuelle (photos, glace sans tain).", motsCles: ["heure", "lieu", "signalement"] },
      { titre: "8. Dépôt de plainte", aide: "Certaines infractions sont conditionnées par le dépôt de plainte (ex : diffamation).", motsCles: ["dépose plainte"] },
      { titre: "9. Remise de documents", aide: "Par le plaignant : certificats médicaux, chèques, factures se rapportant à l'affaire.", motsCles: ["remet", "documents"] },
      { titre: "10. Demande de copie du PV", aide: "Éventuelle demande de la victime (art. 15-3 al.2 C.P.P.).", motsCles: ["copie", "procès-verbal"] },
      { titre: "11. Énonciation terminale (clôture)", aide: "Lecture faite personnellement (ou mention si impossible : non-voyant, ne sait pas lire — lecture alors faite par l'A.P.J.). Signature après lecture. Heure de fin facultative pour une plainte.", motsCles: ["lecture", "signe", "persiste"] },
      { titre: "12. Annexes", aide: "Les documents remis par le plaignant sont annexés au PV (rubrique en marge).", motsCles: ["annexons", "documents remis"] },
      { titre: "13. Mention", aide: "Remise à la victime : formulaire d'information des droits des victimes, récépissé de plainte, éventuellement copie du PV.", motsCles: ["formulaire", "récépissé"] },
      { titre: "14. Avis O.P.J.", aide: "L'A.P.J. avise l'O.P.J. des faits contenus dans la plainte.", motsCles: ["rendons compte", "officier de police judiciaire"] },
    ],
  },
  {
    theme: "Constatations sur les lieux d'une infraction",
    reference: "Pages 45-46 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de saisine", aide: "Endroit exact où se situe l'équipage.", motsCles: ["rue", "lieu"] },
      { titre: "2. Instructions", aide: "En patrouille : instructions permanentes du chef de service. Sur demande de l'O.P.J. (après plainte) : en flagrance selon ses instructions, en préliminaire sous son contrôle.", motsCles: ["instructions", "chef de service"] },
      { titre: "3. Assistants éventuels", aide: "Fonctionnaires accompagnant le rédacteur pour la mission.", motsCles: ["assisté", "service"] },
      { titre: "4. Mission", aide: "But de la mission initiale.", motsCles: ["mission", "patrouille"] },
      { titre: "5. Saisine", aide: "Mode de saisine de l'équipage (réquisition victime, avis téléphonique, appel radio CIC) + mesures conservatoires prises/sollicitées.", motsCles: ["requis", "réquisition", "avis"] },
      { titre: "6. Cadre juridique", aide: "Flagrance (constatations proches de l'infraction) ou préliminaire (ex : cambriolage constaté plusieurs jours après).", motsCles: ["flagrant", "préliminaire"] },
      { titre: "7. Transport", aide: "Localisation exacte (ville, rue, n°, immeuble, étage, porte). Heure précise d'arrivée et contact avec le requérant/la victime (petite identité). Vérification de la matérialité des faits.", motsCles: ["heure", "arrivée", "constatons"] },
      { titre: "8. Assistance P.T.S.", aide: "Réquisition possible exigée par le service PTS (SDPTS/BPTS/SRPTS). Ne commencer les constatations qu'en sa présence, sauf nécessité absolue. Nota : le CPP n'impose pas la présence du chef de maison ou de 2 témoins — règle de prudence, non une obligation légale.", motsCles: ["police technique", "scientifique", "PTS"] },
    ],
  },
  {
    theme: "Enquête de voisinage (recherche de témoins)",
    reference: "Page 63 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de l'opération", aide: "Endroit exact de l'enquête de voisinage.", motsCles: ["rue", "adresse"] },
      { titre: "2. Instructions", aide: "En flagrance : selon les instructions de l'O.P.J. En préliminaire : sous son contrôle.", motsCles: ["instructions", "officier de police judiciaire"] },
      { titre: "3. Cadre juridique", aide: "Flagrance ou préliminaire.", motsCles: ["flagrant", "préliminaire"] },
      { titre: "4. Assistants éventuels", aide: "Fonctionnaires accompagnant le rédacteur.", motsCles: ["assisté"] },
      { titre: "5. Opération", aide: "Lieu : adresses précises énumérées. Personnes contactées susceptibles de fournir des éléments utiles. Résultat : négatif, ou identification succincte des témoins avec résumé du témoignage.", motsCles: ["contactées", "témoins", "résultat"] },
    ],
  },
  {
    theme: "Contrôle d'identité suivi de la découverte d'une arme",
    reference: "Pages 87-88 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de saisine", aide: "Endroit exact où se situe l'équipage.", motsCles: ["rue", "lieu"] },
      { titre: "2. Instructions", aide: "En patrouille, PV de saisine : instructions permanentes du chef de service.", motsCles: ["instructions permanentes", "chef de service"] },
      { titre: "3. Assistants éventuels", aide: "Fonctionnaires accompagnant, tenue de l'équipage précisée (uniforme, tenue bourgeoise, port du brassard).", motsCles: ["assisté", "uniforme"] },
      { titre: "4. Mission", aide: "But de la mission initiale.", motsCles: ["mission", "patrouille"] },
      { titre: "5. Constatations", aide: "Faits observés relatés précisément, en faisant ressortir les éléments justifiant le contrôle d'identité — mentionner le cadre (art. 78-2 al.2 à 17, ou 78-2-1).", motsCles: ["78-2", "constatons"] },
      { titre: "6. Instructions", aide: "L'A.P.J. agit sur l'ordre et sous la responsabilité d'un O.P.J. — pas d'obligation de solliciter une autorisation préalable. La formule « sur l'ordre et sous la responsabilité » doit figurer au PV SOUS PEINE DE NULLITÉ.", motsCles: ["sur l'ordre", "sous la responsabilité"] },
      { titre: "7. Visa de l'article du C.P.P.", aide: "Selon les constatations, référence à l'alinéa de l'art. 78-2 ou à l'art. 78-2-1.", motsCles: ["78-2", "code de procédure pénale"] },
      { titre: "8. Contrôle", aide: "Heure et lieu du contrôle mentionnés.", motsCles: ["heure", "procédons"] },
      { titre: "9. Palpation de sécurité", aide: "Pas systématique — seulement selon les circonstances, dès qu'il faut vérifier l'absence d'objet dangereux. Localisation et description de l'arme découverte, catégorie précisée si le port est interdit.", motsCles: ["palpation", "sécurité", "arme"] },
      { titre: "10. Cadre juridique", aide: "Le port de l'arme découverte étant interdit, le rédacteur agit en flagrant délit.", motsCles: ["flagrant délit", "article 53"] },
      { titre: "11. Interpellation", aide: "Heure et lieu (si différent du contrôle) mentionnés. Comportement de l'individu précisé. Menottage motivé le cas échéant (art. 803 C.P.P.) — seulement si intention manifeste de se soustraire ou dangerosité.", motsCles: ["interpellons", "heure"] },
      { titre: "12. Identité", aide: "Identification en style indirect : état civil et adresse uniquement, à l'exclusion de tout autre élément de personnalité.", motsCles: ["nom", "né le", "adresse"] },
      { titre: "13. Présentation O.P.J.", aide: "Heure précisée, compte-rendu verbal, remise éventuelle d'objets appréhendés, instructions données mentionnées.", motsCles: ["présentons", "officier de police judiciaire"] },
      { titre: "14. Mention", aide: "Recherches administratives (FPR, TAJ) inscrites après l'avis à l'O.P.J. — précise qu'elles ont bien été effectuées et sans résultat.", motsCles: ["fichier des personnes recherchées", "aucune recherche"] },
    ],
  },
  {
    theme: "Interpellation d'un individu auteur d'une infraction",
    reference: "Pages 92-95 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de saisine", aide: "Endroit exact où se situe l'équipage.", motsCles: ["rue", "lieu"] },
      { titre: "2. Instructions", aide: "En patrouille : instructions permanentes du chef de service.", motsCles: ["instructions permanentes", "chef de service"] },
      { titre: "3. Assistants éventuels", aide: "Fonctionnaires accompagnant, tenue de l'équipage précisée.", motsCles: ["assisté", "uniforme"] },
      { titre: "4. Mission", aide: "But de la mission initiale.", motsCles: ["mission", "patrouille"] },
      { titre: "5. Constatations", aide: "Faits observés et constitutifs de l'infraction relatés précisément — préciser l'heure de constatation/arrivée si nécessaire.", motsCles: ["constatons", "heure"] },
      { titre: "6. Cadre juridique", aide: "Indiquer le cadre juridique de l'intervention pour établir les pouvoirs et droits attachés.", motsCles: ["flagrant délit", "article 53"] },
      { titre: "7. Interpellation", aide: "L'heure exacte est FONDAMENTALE — c'est aussi le début de l'éventuelle garde à vue. Comportement de l'individu précisé. Lieu exact si différent des lieux précédemment cités.", motsCles: ["interpellons", "heure"] },
      { titre: "8. Palpation de sécurité", aide: "Menottage motivé si nécessaire (art. 803 C.P.P.) — intention manifeste de fuite ou dangerosité. Objets découverts : situés et décrits.", motsCles: ["palpation", "sécurité"] },
      { titre: "9. Identité", aide: "De l'interpellé en style indirect : état civil et adresse uniquement.", motsCles: ["nom", "né le", "adresse"] },
      { titre: "10. Constatations et appréhensions éventuelles", aide: "Méthode D.R.D.A. : Décrire l'objet → le Représenter à l'interpellé → recueillir sa brève Déclaration en style direct (appartenance seulement, ce n'est PAS une audition) → Appréhender aux fins de remise à l'O.P.J.", motsCles: ["appréhendons", "déclare"] },
      { titre: "11. Avis O.P.J.", aide: "Instructions reçues et divers avis (invitation victime/témoin, avis radio) mentionnés.", motsCles: ["avisons", "officier de police judiciaire"] },
      { titre: "12. Retour au service", aide: "Si usage de la force nécessaire : actes de résistance et moyens de coercition utilisés pour y répondre précisés.", motsCles: ["service", "sans incident"] },
      { titre: "13. Énonciation terminale (clôture)", aide: "Signature si déclarations en style direct ; pas de signature si style indirect. Heure facultative.", motsCles: ["lecture", "signe"] },
      { titre: "14. Présentation O.P.J.", aide: "Heure précisée, compte-rendu verbal, remise d'objets appréhendés, instructions mentionnées.", motsCles: ["présentons", "officier de police judiciaire"] },
      { titre: "15. Mention", aide: "Recherches administratives (FPR, TAJ) — précise qu'elles ont bien été effectuées.", motsCles: ["fichier des personnes recherchées", "aucune recherche"] },
    ],
  },
  {
    theme: "Notification de placement en garde à vue et des droits",
    reference: "Pages 124-125 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de rédaction", aide: "Endroit exact de la notification.", motsCles: ["service", "au service"] },
      { titre: "2. Cadre juridique", aide: "Enquête de flagrance ou préliminaire — « vu les articles 53 et suivants » ou « 75 et suivants du C.P.P. ».", motsCles: ["article 53", "article 75"] },
      { titre: "3. Visa des articles du C.P.P.", aide: "« Vu les articles 62-2 à 63-4-3 du code de procédure pénale ».", motsCles: ["62-2", "63-4-3"] },
      { titre: "4. Instructions", aide: "Rappeler expressément que la garde à vue a été décidée par un O.P.J., et que l'A.P.J. agit sous son contrôle.", motsCles: ["décision", "officier de police judiciaire"] },
      { titre: "5. Identité", aide: "La petite identité de la personne faisant l'objet de la mesure.", motsCles: ["nom", "prénom"] },
      { titre: "6. Visa du ou des objectifs (art. 62-2 C.P.P.)", aide: "Cocher au moins un des 6 objectifs : investigations nécessitant la présence de la personne ; garantir sa présentation au procureur ; empêcher la modification de preuves/indices ; empêcher les pressions sur témoins/victimes/familles ; empêcher la concertation avec coauteurs/complices ; garantir les mesures pour faire cesser le crime/délit.", motsCles: ["unique moyen", "objectif"] },
      { titre: "7. Information", aide: "Dans une langue comprise : qualification/date/lieu présumés de l'infraction ; placement en GAV sur décision de l'O.P.J. ; durée et prolongations éventuelles (SAUF si peine d'emprisonnement < 1 an — pas de mention de prolongation possible).", motsCles: ["garde à vue", "durée"] },
      { titre: "8. Notification des droits", aide: "Droits des art. 63-1 à 63-4-2 C.P.P. (+ art. 706-112-1 si majeur protégé) : faire des déclarations/répondre/se taire ; être assisté d'un interprète ; consulter certaines pièces (PV de notification, certificat médical, PV d'audition).", motsCles: ["se taire", "avocat", "interprète"] },
    ],
  },
  {
    theme: "Audition du mis en cause gardé à vue",
    reference: "Pages 155-156 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de rédaction", aide: "Peut être ailleurs qu'au service (autre service, hôpital...).", motsCles: ["service"] },
      { titre: "2. Instructions", aide: "En flagrance : selon les instructions de l'O.P.J. En préliminaire : sous son contrôle.", motsCles: ["instructions", "officier de police judiciaire"] },
      { titre: "3. Cadre juridique", aide: "Enquête de flagrance ou préliminaire, situé précisément.", motsCles: ["flagrant", "préliminaire"] },
      { titre: "4. Visa des articles relatifs à l'assistance de l'avocat", aide: "Visa éventuel de l'art. 706-112-1 C.P.P. si majeur protégé (tutelle, curatelle, sauvegarde de justice).", motsCles: ["avocat", "706-112-1"] },
      { titre: "5. Assistants éventuels", aide: "Collègue mentionné avec grade, nom, service.", motsCles: ["assisté"] },
      { titre: "6. Présence de l'avocat", aide: "DÉLAI D'ATTENTE DE 2 HEURES obligatoire avant de débuter l'audition, à partir de l'avis à l'avocat. N'interdit pas une audition limitée à l'identité (état civil et adresse) durant ce délai.", motsCles: ["avocat", "2 heures", "deux heures"] },
      { titre: "7. Présence d'un titulaire de l'autorité parentale ou adulte désigné", aide: "Pour un mineur (art. L.311-1 C.J.P.M.), si l'enquêteur l'estime dans l'intérêt supérieur de l'enfant. L'audition peut débuter après 2h en leur absence.", motsCles: ["mineur", "représentant légal"] },
      { titre: "8. Identité", aide: "Grande identité du mis en cause.", motsCles: ["nom", "né le"] },
      { titre: "9. Déclarations", aide: "Récit libre du suspect à la 1re personne, ni subjectif ni dirigé. Aveux : préciser H.L.M. (Heure, Lieu, Motif). Questions-réponses pour préciser/rectifier ou démontrer la mauvaise foi. Représentation d'objets/documents saisis. Formule de conclusion (aveux ou persistance de la négation).", motsCles: ["question", "réponse"] },
      { titre: "10. Énonciation terminale (clôture)", aide: "L'heure de fin d'audition est INDISPENSABLE.", motsCles: ["heure", "signe"] },
    ],
  },
  {
    theme: "Perquisition en enquête préliminaire",
    reference: "Pages 175-176 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de rédaction", aide: "Endroit exact où se situe l'équipage.", motsCles: ["rue", "lieu"] },
      { titre: "2. Instructions", aide: "L'A.P.J., ne pouvant perquisitionner qu'en préliminaire, agit SOUS LE CONTRÔLE de l'O.P.J.", motsCles: ["sous le contrôle", "officier de police judiciaire"] },
      { titre: "3. Cadre juridique", aide: "Enquête préliminaire UNIQUEMENT — visa de l'art. 76 C.P.P.", motsCles: ["préliminaire", "article 76"] },
      { titre: "4. Assistants", aide: "Fonctionnaires accompagnant, éventuellement spécialistes PTS.", motsCles: ["assisté"] },
      { titre: "5. Identité", aide: "De la personne chez qui l'opération a lieu, avec sa situation au moment du transport (gardée à vue, suspect libre).", motsCles: ["nom", "domicile"] },
      { titre: "6. Assentiment préalable", aide: "Inscription MANUSCRITE sur l'imprimé d'autorisation de perquisition et saisies. Indiquer toute impossibilité d'écrire, tout refus ou impossibilité d'assister à la perquisition.", motsCles: ["assentiment", "autorisation"] },
    ],
  },
  {
    theme: "Confrontation entre la victime et une personne gardée à vue",
    reference: "Pages 195-196 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de rédaction", aide: "Endroit exact de la confrontation.", motsCles: ["service"] },
      { titre: "2. Instructions", aide: "En flagrance : selon les instructions de l'O.P.J. En préliminaire : sous son contrôle.", motsCles: ["instructions"] },
      { titre: "3. Cadre juridique", aide: "Enquête de flagrance ou préliminaire.", motsCles: ["flagrant", "préliminaire"] },
      { titre: "4. Visa des articles relatifs à l'assistance de l'avocat", aide: "Gardé à vue : art. 63-4-2 et 63-4-3 C.P.P. Victime : art. 63-4-5 C.P.P.", motsCles: ["avocat", "63-4"] },
      { titre: "5. Assistants éventuels", aide: "Indispensable en cas de risque d'incident, d'évasion, ou de nombreuses personnes à confronter.", motsCles: ["assisté"] },
      { titre: "6. Personnes présentes", aide: "Identité des personnes mises en présence, et présence ou non de leur avocat.", motsCles: ["mettons en présence", "identité"] },
      { titre: "7. Rappel des règles de bon déroulement", aide: "L'enquêteur conserve la DIRECTION EXCLUSIVE de l'acte, peut y mettre fin en cas de difficulté. Mention de tout incident (avec ou sans interruption).", motsCles: ["direction", "règles"] },
      { titre: "8. Opération", aide: "Lecture des déclarations en présence de toutes les parties. Audition contradictoire : les personnes s'adressent EXCLUSIVEMENT à l'enquêteur, jamais entre elles.", motsCles: ["lecture", "déclarations"] },
      { titre: "9. Questions-Réponses", aide: "Deux méthodes possibles (séparées ou conjointes) : question à tous les participants (chacun répond à son tour), ou question à chaque partie à tour de rôle en présence de l'autre (seule la personne visée répond).", motsCles: ["question", "réponse"] },
      { titre: "10. Questions des avocats", aide: "Uniquement à l'issue de la confrontation. L'enquêteur peut s'y opposer si nuisibles à l'enquête (mention du refus). Observations écrites possibles, remises à l'enquêteur.", motsCles: ["avocat", "issue"] },
    ],
  },
  {
    theme: "Contrôle du séjour et de la circulation d'un étranger",
    reference: "Pages 208-211 du recueil de PV",
    etapes: [
      { titre: "1. Lieu de saisine", aide: "Endroit exact où se situe l'équipage.", motsCles: ["rue", "lieu"] },
      { titre: "2. Instructions", aide: "En patrouille : instructions permanentes du chef de service.", motsCles: ["instructions permanentes", "chef de service"] },
      { titre: "3. Assistants", aide: "Fonctionnaires accompagnant, tenue de l'équipage précisée.", motsCles: ["assisté", "uniforme"] },
      { titre: "4. Mission", aide: "But de la mission initiale.", motsCles: ["mission", "patrouille"] },
      { titre: "5. Constatations", aide: "Faits justifiant le contrôle d'identité relatés précisément — cadre de l'art. 78-2 al.2 à 17, ou 78-2-1.", motsCles: ["78-2", "constatons"] },
      { titre: "6. Instructions", aide: "« Sur l'ordre et sous la responsabilité » d'un O.P.J. — formule OBLIGATOIRE sous peine de nullité.", motsCles: ["sur l'ordre", "sous la responsabilité"] },
      { titre: "7. Visa de l'article du C.P.P.", aide: "Référence à l'alinéa de l'art. 78-2 ou à l'art. 78-2-1 selon les constatations.", motsCles: ["78-2", "code de procédure pénale"] },
      { titre: "8. Contrôle", aide: "Heure du début d'une éventuelle retenue pour vérification du droit au séjour, et lieu exact mentionnés.", motsCles: ["heure", "procédons"] },
      { titre: "9. Résultat du contrôle / constatation de la qualité d'étranger", aide: "Identification en style indirect (état civil, adresse). Élément OBJECTIF extérieur à la personne révélant la qualité d'étranger — ATTENTION : être né hors de France ou avoir un nom à consonance étrangère NE SUFFIT PAS.", motsCles: ["étranger", "nationalité"] },
      { titre: "10. Visa de l'article L.812-2/2° du CESEDA", aide: "Relatif au contrôle de la régularité de circulation et de séjour suite au contrôle d'identité.", motsCles: ["812-2", "CESEDA"] },
      { titre: "11. Contrôle du séjour et de circulation", aide: "Porte sur les pièces et documents autorisant à circuler et séjourner en France.", motsCles: ["pièces", "documents", "séjourner"] },
      { titre: "12. Interrogation du fichier A.G.D.R.E.F.2", aide: "À partir de l'état civil ou du numéro du titre de séjour présenté.", motsCles: ["AGDREF", "titre de séjour"] },
      { titre: "13. Palpation de sécurité", aide: "Selon les circonstances/comportement, peut s'effectuer avant le point 9.", motsCles: ["palpation", "sécurité"] },
      { titre: "14. Avis O.P.J.", aide: "Instructions reçues mentionnées.", motsCles: ["avisons", "officier de police judiciaire"] },
      { titre: "15. Retour au service", aide: "Mentionner l'acceptation ou le refus de la personne d'accompagner les fonctionnaires. Tout emploi de la force doit être circonstancié et proportionné.", motsCles: ["accepte", "suivre"] },
      { titre: "16. Énonciation terminale (clôture)", aide: "Signature si déclarations en style direct ; pas de signature si style indirect. Heure facultative.", motsCles: ["lecture", "signe"] },
      { titre: "17. Présentation O.P.J.", aide: "Heure précisée, compte-rendu verbal.", motsCles: ["présentons", "officier de police judiciaire"] },
      { titre: "18. Mention", aide: "Recherches administratives au FPR — précise qu'elles ont bien été effectuées.", motsCles: ["fichier des personnes recherchées", "aucune recherche"] },
      { titre: "19. Annexe", aide: "Copie de la réquisition du procureur justifiant le contrôle, si applicable.", motsCles: ["annexons", "réquisition"] },
    ],
  },
];
const EXEMPLES_PV = [
  {
    theme: "Plainte contre X (auteur inconnu)",
    entete: "AFFAIRE : Contre X… — OBJET : Qualification de l'infraction",
    corps: [
      { n: "1", phrases: ["Étant au service,"] },
      { n: "2", phrases: ["Agissant conformément aux instructions permanentes du (grade, NOM, Prénom), chef de (…)."] },
      { n: "3", phrases: ["Constatons que se présente M. (NOM, Prénom) qui nous informe avoir été victime de (infraction) commis le (date + heure), ou entre le (date + heure) et le (date + heure) à (lieu)."] },
      { n: "3", marge: "Si présence interprète", phrases: ["Constatons que se présente M. (NOM, Prénom), accompagné de M. (NOM, Prénom), lui servant d'interprète en langue (à préciser) qui nous informe que M. (NOM, Prénom) a été victime de (infraction) commis le (date + heure), ou entre le (date + heure) et le (date + heure) à (lieu)."] },
      { n: "4", phrases: ["Agissant en flagrant délit (ou en enquête préliminaire).", "Vu les articles 53 et suivants (ou 75 et suivants) du code de procédure pénale."] },
      { n: "5", phrases: ["Information reçue des droits mentionnés à l'article 10-2 du code de procédure pénale."] },
      { n: "6", phrases: ["M. (NOM, Prénom) nous déclare :", "« J'ai pris connaissance de mes droits et me réserve la possibilité d'y recourir à tout moment »."] },
      { n: "7", marge: "SUR LES FAITS", phrases: ["Déclarations de la victime — déroulé des faits : éléments constitutifs et circonstances aggravantes éventuelles, H.L.M. (Heure, Lieu, Motif),", "QUESTION : (énoncé de la question posée) ?", "RÉPONSE : (contenu de la réponse formulée).", "Signalement des auteurs — « Je suis capable de le ou les reconnaître … »"] },
      { n: "8", phrases: ["« Je dépose plainte contre X pour (…) »"] },
      { n: "9", phrases: ["« Je vous remets (…) »"] },
      { n: "10", phrases: ["Je souhaite obtenir la copie de mon procès-verbal de dépôt de plainte.", "Je n'ai rien de plus à ajouter »."] },
      { n: "11", phrases: ["Après lecture faite personnellement (ou par le truchement de M. NOM Prénom, interprète), M. (NOM, Prénom) persiste et signe avec nous le présent procès-verbal à (heure)."] },
      { n: "12", marge: "ANNEXES", phrases: ["De même suite,", "Annexons au présent les documents remis : (…)", "Dont procès-verbal."] },
      { n: "13", marge: "MENTION", phrases: ["De même suite,", "Remettons à la victime le formulaire d'information des droits des victimes, un récépissé de sa plainte et la copie du présent procès-verbal.", "Dont procès-verbal."] },
      { n: "14", marge: "AVIS O.P.J.", phrases: ["De même suite,", "Rendons compte au (grade, NOM, Prénom) officier de police judiciaire du service, des faits et lui remettons le présent procès-verbal.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Constatations sur les lieux d'une infraction",
    entete: "AFFAIRE : Contre X — OBJET : Compte-rendu d'infraction initial",
    corps: [
      { n: "1", phrases: ["Étant rue (…),"] },
      { n: "2", phrases: ["Agissant conformément aux instructions permanentes du (grade, NOM, Prénom), chef de (…)."] },
      { n: "3", phrases: ["Assisté du (grade, NOM, Prénom) du service, tous revêtus de nos uniformes,"] },
      { n: "4", phrases: ["De patrouille portée à bord du véhicule sérigraphié du service indicatif (…), en mission de sécurisation (lieu)"] },
      { n: "5", phrases: ["Recevons un appel radio du C.I.C. nous demandant de nous rendre (adresse) pour (libellé mission) suite à (infraction commise) commis (date éventuelle)."] },
      { n: "6", phrases: ["Agissant en flagrant délit (ou en enquête préliminaire).", "Vu les articles 53 et suivants (ou 75 et suivants) du code de procédure pénale."] },
      { n: "7", phrases: ["Nous transportons (adresse),", "Où étant à (heure d'arrivée), prenons contact avec M. (petite identité), requérant (ou victime) qui nous confirme les termes de son appel (ou de sa plainte)."] },
      { n: "8", marge: "Si P.T.S. sur place", phrases: ["Notons la présence de M. (NOM, Prénom, grade) du service de police technique et scientifique (à préciser)."] },
      { n: "8", marge: "Attente arrivée P.T.S.", phrases: ["À (heure), notons l'arrivée de (NOM, Prénom, grade) du service de police technique et scientifique (à préciser)."] },
      { n: "9", texteLibre: "Constatations — description générale (situation géographique, environnement, voies d'accès), puis description précise (mode opératoire — effraction, escalade —, objets/traces/indices découverts). Technique M.A.S. : MODIFICATION (déplacé, endommagé), APPORT (traces/objets laissés par l'auteur), SUPPRESSION (objets volés). Pour tout objet : technique S.D.I.S.S. (Situation, Description, Interpellation, Saisie-Scellés)." },
    ],
  },
  {
    theme: "Enquête de voisinage (recherche de témoins)",
    entete: "AFFAIRE : Contre X — OBJET : Enquête de voisinage rue (…) à (ville)",
    corps: [
      { n: "1", phrases: ["Étant rue (…),"] },
      { n: "2", phrases: ["Agissant conformément aux instructions reçues (ou sous le contrôle) du (grade, NOM, Prénom), officier de police judiciaire,"] },
      { n: "3", phrases: ["Poursuivant l'enquête de flagrance (ou en préliminaire),", "Vu les articles 53 et suivants (ou 75 et suivants) du code de procédure pénale."] },
      { n: "4", phrases: ["Assisté du (grade, NOM, Prénom) du service, tous revêtus de nos uniformes,"] },
      { n: "5", phrases: ["Procédons à une enquête de voisinage rue (…) et ses environs, plus précisément (…),", "De l'ensemble des personnes contactées, seules sont susceptibles de nous fournir des éléments intéressant l'enquête :", "M. (NOM, Prénom, adresse, téléphone), qui (résumé témoignage), H.L.M. (Heure, Lieu, Motif : le (date), à (heure), a vu ou entendu…),", "Mme (NOM, Prénom, adresse, téléphone), qui (résumé témoignage), H.L.M. (Heure, Lieu, Motif : le (date), à (heure), a vu ou entendu…),", "Ces personnes ont été invitées à se présenter au service afin d'être entendues par procès-verbal."] },
      { n: "6", phrases: ["Dont procès-verbal que signent avec nous nos assistants."] },
      { n: "7", marge: "AVIS O.P.J.", phrases: ["De même suite,", "Rendons compte au (grade, NOM Prénom) officier de police judiciaire du résultat de l'enquête de voisinage effectuée et lui remettons le présent procès-verbal.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Contrôle d'identité suivi de la découverte d'une arme",
    entete: "OBJET : Contrôle d'identité suivi de découverte d'une arme",
    corps: [
      { n: "1", phrases: ["Étant rue (…),"] },
      { n: "2", phrases: ["Agissant conformément aux instructions permanentes du (grade, NOM, Prénom), chef de (…)."] },
      { n: "3", phrases: ["Assisté du (grade, NOM, Prénom) du service, tous revêtus de nos uniformes,"] },
      { n: "4", phrases: ["De patrouille portée à bord du véhicule sérigraphié du service indicatif (…), en mission de sécurisation (lieu)"] },
      { n: "5", phrases: ["Constatons que (description sommaire de l'individu et des faits observés)"] },
      { n: "6", phrases: ["Agissant sur l'ordre et sous la responsabilité du (grade, NOM, Prénom), officier de police judiciaire,"] },
      { n: "7", phrases: ["Vu l'article 78-2 alinéa (à préciser ou 78-2-1) du code de procédure pénale."] },
      { n: "8", phrases: ["Procédons à (heure) au contrôle de l'identité de l'individu à hauteur de (lieu précis de contrôle).", "Invitons l'intéressé à nous décliner son identité."] },
      { n: "9", marge: "Si déclaration verbale", phrases: ["Il déclare être démuni de documents justifiant de son identité et se nommer (NOM, Prénom), être né le (date), être de nationalité (à préciser), et demeurer (adresse à préciser)."] },
      { n: "9", marge: "Si constat sur document", phrases: ["Il nous présente un (à préciser), au nom de (NOM, Prénom) né le (date), domicilié (à préciser), où apparaît la nationalité (à préciser)."] },
      { n: "9", marge: "Si palpation positive", phrases: ["Palpé par mesure de sécurité, il est trouvé porteur (localisation de l'objet) de (description de l'objet),", "Interpellé sur l'objet découvert lors de la palpation, l'intéressé nous déclare : « (cet objet m'appartient ou ne m'appartient pas) »."] },
      { n: "9", phrases: ["Appréhendons (objet) aux fins de remise à l'officier de police judiciaire."] },
      { n: "10", phrases: ["Dès lors, agissant en flagrant délit, vu les articles 53 et suivants du code de procédure pénale,"] },
      { n: "11", phrases: ["Interpellons M. (NOM, Prénom) à (heure), à hauteur de (lieu précis de l'intervention)."] },
      { n: "12", phrases: ["Invitons l'intéressé à nous décliner son identité. Il déclare se nommer (NOM, Prénom), né le (date) à (lieu) et adresse."] },
      { n: "13", marge: "PRÉSENTATION O.P.J.", phrases: ["De même suite,", "À (heure), présentons M. (NOM, Prénom) au (grade, NOM, Prénom) officier de police judiciaire, et lui remettons (l'objet) appréhendé.", "Dont procès-verbal."] },
      { n: "14", marge: "MENTION", phrases: ["De même suite,", "Mentionnons que M. (NOM, Prénom) ne fait l'objet d'aucune recherche au fichier des personnes recherchées.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Interpellation d'un individu auteur d'une infraction",
    entete: "AFFAIRE : Contre X — OBJET : Interpellation de NOM, Prénom, âge, domicile",
    corps: [
      { n: "1", phrases: ["Étant rue (…),"] },
      { n: "2", phrases: ["Agissant conformément aux instructions permanentes du (grade, NOM, Prénom), chef de (…)."] },
      { n: "3", phrases: ["Assisté du (grade, NOM, Prénom) du service, tous revêtus de nos uniformes,"] },
      { n: "4", phrases: ["De patrouille portée à bord du véhicule sérigraphié du service indicatif (…), en mission de sécurisation (lieu)"] },
      { n: "5", phrases: ["Remarquons un individu (signalement sommaire) qui (description de son comportement délictueux)."] },
      { n: "4", marge: "Si requis par C.I.C.", phrases: ["De patrouille portée à bord du véhicule sérigraphié du service indicatif (…), en mission de sécurisation (lieu)", "Sommes requis par le centre d'information et de commandement afin de (mission confiée à préciser),"] },
      { n: "5", marge: "Si requis par C.I.C.", phrases: ["Nous transportons sur les lieux, où étant à (heure),", "Constatons que (description sommaire de l'individu et des faits observés),"] },
      { n: "6", phrases: ["Dès lors, agissant en flagrant délit, vu les articles 53 et suivants du code de procédure pénale."] },
      { n: "7", phrases: ["Interpellons le mis en cause à (heure) à hauteur de (lieu précis de l'interpellation)."] },
      { n: "8", marge: "Si menottage", phrases: ["Conformément à l'article 803 du code de procédure pénale, menottons l'intéressé considéré comme dangereux pour autrui ou pour lui-même (ou comme susceptible de tenter de prendre la fuite)."] },
      { n: "8", marge: "Si palpation positive", phrases: ["Palpé par mesure de sécurité, il n'est trouvé porteur d'aucun objet dangereux pour lui-même ou pour autrui,"] },
      { n: "8", marge: "Sinon", phrases: ["Palpé par mesure de sécurité, il est trouvé porteur (localisation de l'objet) de (description de l'objet),", "Interpellé sur l'objet découvert lors de la palpation, l'intéressé nous déclare : « (cet objet m'appartient ou ne m'appartient pas) »."] },
      { n: "9", phrases: ["Appréhendons (objet) aux fins de remise à l'officier de police judiciaire."] },
      { n: "10", marge: "Si constatations ultérieures", phrases: ["Invitons l'intéressé à nous décliner son identité. Il déclare se nommer (NOM, Prénom) et être né le (date) à (lieu) et adresse."] },
      { n: "11", phrases: ["Constatons (éventuelles dégradations ou autre constat…),"] },
      { n: "12", marge: "AVIS O.P.J.", phrases: ["Prenons immédiatement attache avec le (grade, NOM, Prénom), officier de police judiciaire du service. Informé des faits, il nous donne pour instructions de lui présenter l'individu dans les plus brefs délais."] },
      { n: "13", phrases: ["Prenons en charge M. (NOM, Prénom) et regagnons notre service sans incident (ou précisions si emploi de la force)"] },
      { n: "14", marge: "PRÉSENTATION O.P.J.", phrases: ["De même suite,", "À (heure), présentons M. (NOM, Prénom) au (grade, NOM, Prénom) officier de police judiciaire, et lui remettons (l'objet) appréhendé.", "Dont procès-verbal."] },
      { n: "15", marge: "MENTION", phrases: ["De même suite,", "Mentionnons que M. (NOM, Prénom) ne fait l'objet d'aucune recherche au fichier des personnes recherchées.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Notification de placement en garde à vue et des droits",
    entete: "AFFAIRE — OBJET : Notification de placement en garde à vue à",
    corps: [
      { n: "1", phrases: ["Étant au service,"] },
      { n: "2", phrases: ["Poursuivant l'enquête de flagrance (ou en préliminaire)", "Vu les articles 53 et suivants (ou 75 et suivants) du code de procédure pénale,"] },
      { n: "3", phrases: ["Vu les articles 62-2 à 63-4-3 du code de procédure pénale,"] },
      { n: "4", phrases: ["Agissant conformément aux instructions et sous le contrôle du (grade, NOM, Prénom), officier de police judiciaire, qui nous a informé de sa décision de placer en garde à vue la personne ci-après dénommée."] },
      { n: "5", phrases: ["Faisons comparaître devant nous le (la) nommé(e) :", "(petite identité)", "Lui notifions, en langue (à préciser) qu'il (qu'elle) comprend :"] },
      { n: "6", phrases: ["Que cette mesure étant l'unique moyen de parvenir à l'un au moins des objectifs suivants (énoncer le ou les objectifs choisis parmi les 6 de l'art. 62-2 C.P.P.)."] },
      { n: "7", phrases: ["Est placé(e) en garde à vue à compter de (heure) pour une durée de 24 heures (susceptible de prolongation), pour les faits de (qualification, date, lieu présumés de l'infraction)."] },
      { n: "8", phrases: ["Notifions les droits suivants : le droit de faire prévenir un proche/employeur/autorités consulaires ; le droit de communiquer avec l'un d'eux ; le droit d'être examiné par un médecin ; le droit d'être assisté par un avocat ; le droit d'être informé dans une langue comprise ; le droit de consulter certaines pièces de la procédure ; le droit de présenter des observations ; le droit de faire des déclarations, de répondre aux questions posées, ou de se taire."] },
    ],
  },
  {
    theme: "Audition du mis en cause gardé à vue",
    entete: "AFFAIRE — OBJET : Audition de Nom, Prénom, âge, profession, domicile",
    corps: [
      { n: "1", phrases: ["Étant au service,"] },
      { n: "2", phrases: ["Agissant conformément aux instructions reçues (ou sous le contrôle) de (grade, NOM, Prénom), officier de police judiciaire,", "Poursuivant l'enquête de flagrance (ou en préliminaire),"] },
      { n: "3", phrases: ["Vu les articles 53 et suivants (ou 75 et suivants) du code de procédure pénale."] },
      { n: "4", phrases: ["Vu les articles 63-4-2 et 63-4-3 du code de procédure pénale,", "Vu l'article 706-112-1 du code de procédure pénale."] },
      { n: "5", phrases: ["Assisté de (grade, NOM, Prénom),"] },
      { n: "6", marge: "Si présence avocat", phrases: ["En présence de M. (NOM, Prénom), avocat au barreau de (à préciser),"] },
      { n: "7", marge: "Si accompagnement mineur", phrases: ["En présence de M. (NOM, Prénom), (lien à préciser),"] },
      { n: "8", phrases: ["Faisons comparaître devant nous M. (NOM, Prénom),", "SUR SON IDENTITÉ :", "(grande identité)"] },
      { n: "9", phrases: ["SUR LES FAITS :", "(Recueil des déclarations spontanées de la personne, précision éventuelle Heure Lieu Motif — H.L.M.),", "QUESTION : (énoncé de la question posée) ?", "RÉPONSE : (contenu de la réponse formulée).", "Vous me représentez (citez les objets, documents).", "Je reconnais les faits qui me sont reprochés (préciser)."] },
      { n: "9", marge: "Ou (négation)", phrases: ["Je ne reconnais pas les faits qui me sont reprochés."] },
      { n: "9", marge: "Si présence avocat", phrases: ["Notre audition terminée, demandons à Maître (NOM, Prénom) s'il souhaite poser des questions à M. (NOM, Prénom)", "QUESTION DE MAÎTRE (NOM) : (énoncé de la question posée) ?", "RÉPONSE : (contenu de la réponse formulée par la personne).", "Constatons que Maître (NOM, Prénom) n'a plus de question à poser à M. (NOM, Prénom) et qu'il nous remet ses observations écrites."] },
      { n: "10", phrases: ["Après lecture faite personnellement, le(la) nommé(e) persiste et signe le présent avec nous le (date et heure)."] },
      { n: "11", marge: "ANNEXE", phrases: ["De même suite,", "Annexons au présent les observations écrites de Maître (NOM, Prénom).", "Dont procès-verbal."] },
      { n: "12", marge: "AVIS O.P.J.", phrases: ["De même suite,", "Rendons compte de cette audition à (grade, NOM, Prénom), officier de police judiciaire.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Perquisition en enquête préliminaire",
    entete: "AFFAIRE — OBJET : Perquisition du domicile de Nom, Prénom, âge, adresse",
    corps: [
      { n: "1", phrases: ["Étant au service,"] },
      { n: "2", phrases: ["Agissant sous le contrôle du (grade, NOM, Prénom), officier de police judiciaire,"] },
      { n: "3", phrases: ["Poursuivant l'enquête en préliminaire,", "Vu les articles 75 et 76 du code de procédure pénale"] },
      { n: "4", phrases: ["Assisté du (grade, NOM, Prénom) du service,"] },
      { n: "5", marge: "Si occupant en G.A.V.", phrases: ["Procédons à l'extraction des locaux de garde à vue du nommé (petite identité)", "Accompagné du susnommé,"] },
      { n: "5", marge: "Sinon", phrases: ["Accompagné du nommé (petite identité),"] },
      { n: "6", phrases: ["Muni de l'autorisation expresse et manuscrite, signée par (NOM, Prénom), nous autorisant à procéder à la perquisition de son domicile (ou autorisation JLD art. 76 C.P.P.),"] },
      { n: "7", phrases: ["Nous transportons (adresse)", "Constatons que le numéro correspond à (situation précise du lieu),", "Où étant à (heure),", "À l'aide de la clé (remise par NOM Prénom ou provenant de la fouille du gardé à vue), pénétrons dans les lieux."] },
      { n: "8", phrases: ["En la présence constante et effective de (Nom, Prénom) effectuons"] },
      { n: "9", phrases: ["Une minutieuse perquisition de son logement de type (F ) composé de (nombre et type de pièces).", "Dans la (pièce), dans le (meuble), découvrons (description de l'objet).", "Interpellé sur l'objet découvert, l'intéressé nous déclare : « (déclaration brève : cet objet m'appartient ou ne m'appartient pas) ».", "Saisissons et plaçons sous scellé (ouvert, fermé ou découvert) n° X (l'objet découvert).", "Notre perquisition, terminée à (heure) sans incident, ne nous permet de découvrir aucun autre objet, trace ou indice utile à l'enquête en cours.", "Refermons les lieux à l'aide des clés en notre possession."] },
      { n: "10", phrases: ["Après lecture faite personnellement, M. (NOM, Prénom) persiste et signe avec nous et nos assistants le présent procès-verbal ainsi que le scellé constitué."] },
      { n: "11", marge: "ANNEXE", phrases: ["De même suite,", "Annexons au présent l'autorisation expresse et manuscrite signée par (NOM, Prénom) nous autorisant à procéder à la perquisition de son domicile (ou autorisation JLD art. 76 C.P.P.).", "Dont procès-verbal."] },
      { n: "12", marge: "AVIS O.P.J.", phrases: ["De même suite,", "Rendons compte au (grade, NOM, Prénom) officier de police judiciaire de la perquisition effectuée.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Confrontation entre la victime et une personne gardée à vue",
    entete: "AFFAIRE — OBJET : Confrontation entre M. Nom, Prénom, et M. NOM, Prénom",
    corps: [
      { n: "1", phrases: ["Étant au service,"] },
      { n: "2", phrases: ["Agissant conformément aux instructions reçues (ou sous le contrôle) de (grade, NOM, Prénom), officier de police judiciaire,"] },
      { n: "3", phrases: ["Poursuivant l'enquête de flagrance (ou en préliminaire),", "Vu les articles 53 et suivants (ou 75 et suivants) du code de procédure pénale."] },
      { n: "4", phrases: ["Vu les articles 63-4-2, 63-4-3 et 63-4-5 du code de procédure pénale,"] },
      { n: "5", phrases: ["Assisté de (grade, NOM, Prénom),", "Vu les déclarations non concordantes,"] },
      { n: "6", phrases: ["En présence des personnes ci-après dénommées :", "M. (NOM, Prénom), et de son conseil Maître (1 - NOM, Prénom), avocat au barreau de (ville).", "Maître (2 - NOM, Prénom), avocat du barreau de (ville),"] },
      { n: "6", marge: "Si présence avocat victime", phrases: ["Faisons comparaître M. (NOM, Prénom), préalablement extrait des locaux de garde à vue."] },
      { n: "6", marge: "Si présence avocat GAV", phrases: ["L'informons que, conformément à sa demande, il va être assisté par Maître (2 - NOM, Prénom) qu'il a préalablement désigné (ou commis d'office)."] },
      { n: "7", marge: "Si présence avocats", phrases: ["Rappelons à Maître (1 - NOM, Prénom) et à Maître (2 - NOM, Prénom) qu'ils ne pourront poser des questions à la personne gardée à vue et à la victime qu'à l'issue de la confrontation. Leurs observations écrites éventuelles seront jointes au présent."] },
      { n: "8", phrases: ["Donnons lecture des déclarations respectives non concordantes.", "M. (NOM, Prénom) déclare : contenu des déclarations.", "M. (NOM, Prénom) déclare : contenu des déclarations."] },
      { n: "9", phrases: ["QUESTION : « énoncé de la question posée ? »", "RÉPONSE : « contenu de la réponse formulée ? »", "QUESTION : « énoncé de la question posée ? »", "RÉPONSE : « contenu de la réponse formulée ? »", "Notre confrontation terminée, demandons à Maître (1 - NOM, Prénom) s'il souhaite poser des questions."] },
      { n: "10", marge: "Si présence avocat victime", phrases: ["QUESTION de Maître (1 - NOM, Prénom) : « énoncé de la question ? »", "RÉPONSE de M. (NOM, Prénom) : « contenu de la réponse. »", "Constatons que Maître (1 - NOM, Prénom) n'a plus de question à poser.", "Demandons ensuite à Maître (2 - NOM, Prénom) s'il souhaite poser des questions."] },
      { n: "10", marge: "Si présence avocat GAV", phrases: ["QUESTION de Maître (2 - NOM, Prénom) à M. (NOM, Prénom) : « énoncé de la question ? »", "RÉPONSE de M. (NOM, Prénom) : « contenu de la réponse. »", "Constatons que Maître (2 - NOM, Prénom) n'a plus de question à poser."] },
      { n: "10", marge: "Si observations remises", phrases: ["Constatons que Maître (1 - NOM, Prénom) et que Maître (2 - NOM, Prénom) nous remettent des observations écrites."] },
      { n: "11", phrases: ["Après lecture faite personnellement, M. (NOM, Prénom) et M. (NOM, Prénom) persistent et signent chacun en ce qui le concerne, avec nous et notre assistant le présent procès-verbal à (heure)."] },
      { n: "12", marge: "ANNEXE", phrases: ["De même suite,", "Annexons au présent les observations écrites de Maître (NOM)", "Dont procès-verbal."] },
      { n: "13", marge: "AVIS O.P.J.", phrases: ["De même suite,", "Rendons compte de la confrontation à (grade, NOM, Prénom) officier de police judiciaire.", "Dont procès-verbal."] },
    ],
  },
  {
    theme: "Contrôle du séjour et de la circulation d'un étranger",
    entete: "OBJET : Contrôle d'identité et contrôle du séjour et de circulation de Nom, Prénom, âge, domicile",
    corps: [
      { n: "1", phrases: ["Étant rue (…),"] },
      { n: "2", phrases: ["Agissant conformément aux instructions permanentes du (grade, NOM, Prénom), chef de (…)."] },
      { n: "3", phrases: ["Assisté du (grade, NOM, Prénom) du service, tous revêtus de nos uniformes,"] },
      { n: "4", phrases: ["De patrouille portée à bord du véhicule sérigraphié du service indicatif (…), en mission de sécurisation (lieu)"] },
      { n: "5", phrases: ["Constatons que (description sommaire de l'individu et des faits observés)"] },
      { n: "6", phrases: ["Agissant sur l'ordre et sous la responsabilité du (grade, NOM, Prénom), officier de police judiciaire,"] },
      { n: "7", phrases: ["Vu l'article 78-2 alinéa (à préciser ou 78-2-1) du code de procédure pénale."] },
      { n: "8", phrases: ["Procédons à (heure) au contrôle de l'identité de l'individu à hauteur de (lieu précis de contrôle)."] },
      { n: "9", marge: "Si déclaration verbale", phrases: ["Il déclare être démuni de documents justifiant de son identité et se nommer (NOM, Prénom), être né le (date), être de nationalité (à préciser), et demeurer (adresse à préciser)."] },
      { n: "9", marge: "Si constat sur document", phrases: ["Il nous présente un (à préciser), au nom de (NOM, Prénom) né le (date), domicilié (à préciser), où apparaît la nationalité (à préciser)."] },
      { n: "10", phrases: ["Vu l'article L. 812-2/2° du code de l'entrée et du séjour des étrangers et du droit d'asile,"] },
      { n: "11", marge: "Si déclaration verbale", phrases: ["Procédons au contrôle des titres et documents permettant à cette personne de séjourner et de circuler sur le territoire national.", "L'intéressé indique être dans l'impossibilité de présenter ces documents et nous déclare ne pas en posséder."] },
      { n: "11", marge: "Si document présenté", phrases: ["L'intéressé nous présente (à préciser).", "Procédons à l'examen du document et constatons qu'il est démuni de visa nécessaire pour séjourner ou circuler sur le territoire national, (ou qu'il n'est pas accompagné de titre en cours de validité autorisant le séjour et la circulation sur le territoire national).", "Constatons que le document est porteur d'une vignette Schengen dont la validité est expirée."] },
      { n: "12", phrases: ["La consultation de l'application de gestion des dossiers des ressortissants étrangers en France permet de déterminer qu'aucun dossier n'est ouvert au nom de (NOM, Prénom) (ou qu'un dossier est ouvert au nom de (NOM, Prénom) sous les références (à préciser), et fait l'objet de (éventuelle mesure d'éloignement à préciser))."] },
      { n: "13", marge: "Si palpation effectuée", phrases: ["Palpé par mesure de sécurité, l'intéressé n'est trouvé porteur d'aucun objet susceptible d'être dangereux pour lui-même ou pour autrui."] },
      { n: "13", marge: "AVIS O.P.J.", phrases: ["Avisons M. (grade, NOM, Prénom) officier de police judiciaire, qui nous prescrit de lui mettre à disposition l'intéressé dans les plus brefs délais.", "Invitons (NOM, Prénom) à nous suivre au service, pour vérification, ce qu'il accepte sans aucune réticence."] },
      { n: "15", phrases: ["Prenons en charge M. (NOM, Prénom) et regagnons notre service sans incident."] },
      { n: "16", phrases: ["Après lecture faite personnellement, M. (NOM, Prénom) persiste et signe avec nous et nos assistants le présent procès-verbal à (heure)."] },
      { n: "17", marge: "PRÉSENTATION O.P.J.", phrases: ["De même suite,", "À (heure), présentons le nommé (NOM, Prénom) au (grade, NOM, Prénom) officier de police judiciaire.", "Dont procès-verbal."] },
      { n: "18", marge: "MENTION", phrases: ["De même suite,", "Mentionnons que le nommé (NOM, Prénom) ne fait l'objet d'aucune recherche au fichier des personnes recherchées.", "Dont procès-verbal."] },
      { n: "19", marge: "ANNEXE", phrases: ["De même suite,", "Annexons au présent copie de la réquisition de monsieur le procureur de la République près le Tribunal Judiciaire de (Ville)", "Dont procès-verbal."] },
    ],
  },
];




const NIVEAUX_PV = [
  {
    id: "guide",
    titre: "Débutant — Guidé",
    description: "Une case par étape, avec une aide affichée pour chacune. Idéal pour apprendre la structure.",
  },
  {
    id: "assiste",
    titre: "Intermédiaire — Assisté",
    description: "Une page libre, avec une check-list des étapes consultable à tout moment si besoin d'un rappel.",
  },
  {
    id: "autonome",
    titre: "Confirmé — Autonome",
    description: "Page blanche, aucune aide visible. Tu rédiges seul, puis tu compares à la grille de correction à la fin.",
  },
];

const QUESTIONS_REDIGEES = [
  {
    matiere: "Droit pénal général",
    question: "Quels sont les 4 grands principes du droit pénal français présentés dans le fascicule ?",
    reponse: "La légalité des infractions et des peines (art. 111-3 C.P.), la personnalité des peines (art. 121-1 C.P.), l'individualisation de la peine, et la non-rétroactivité de la loi pénale plus sévère (art. 112-1 C.P.).",
    motsCles: ["légalité", "personnalité", "individualisation", "rétroactivité"],
  },
  {
    matiere: "Droit pénal général",
    question: "Quelles sont les conditions de l'état de nécessité (art. 122-7 C.P.) ?",
    reponse: "Un danger actuel ou imminent menaçant une personne ou un bien, la nécessité de commettre une infraction pour la sauvegarder, et des moyens employés non disproportionnés par rapport à la gravité de la menace.",
    motsCles: ["danger", "imminent", "proportionnés"],
  },
  {
    matiere: "Droit pénal spécial",
    question: "Quelle est la différence entre l'extorsion et l'escroquerie ?",
    reponse: "L'extorsion suppose une remise obtenue par violence, menace de violences ou contrainte, la victime se dessaisissant elle-même du bien sous la contrainte. L'escroquerie suppose au contraire une remise obtenue par tromperie (faux nom, fausse qualité, manœuvres frauduleuses), sans violence ni contrainte.",
    motsCles: ["violence", "contrainte", "tromperie"],
  },
  {
    matiere: "Droit pénal spécial",
    question: "Cite 3 des circonstances qui caractérisent l'homicide routier (art. 221-18 C.P.).",
    reponse: "Par exemple : état d'ivresse ou usage de stupéfiants, absence de permis de conduire valide, excès de vitesse égal ou supérieur à 30 km/h, délit de fuite après l'accident, usage du téléphone tenu en main, ou refus d'obtempérer.",
    motsCles: ["ivresse", "permis", "vitesse"],
  },
  {
    matiere: "Droit pénal spécial",
    question: "Dans quelles conditions le délit de fuite (art. 434-10 C.P.) est-il constitué ?",
    reponse: "Un conducteur, sachant qu'il vient de causer ou d'occasionner un accident, ne s'arrête pas et tente ainsi d'échapper à sa responsabilité pénale ou civile. Il est aussi constitué si le conducteur s'arrête mais donne un faux nom ou une fausse adresse.",
    motsCles: ["accident", "arrête", "responsabilité"],
  },
  {
    matiere: "Droit pénal général",
    question: "Quelles sont les deux conditions nécessaires pour caractériser la tentative punissable ?",
    reponse: "Un commencement d'exécution (l'acte tend directement au crime ou au délit, au-delà d'un simple acte préparatoire) et l'absence de désistement volontaire (l'infraction a été interrompue par une cause étrangère à la volonté de l'auteur).",
    motsCles: ["commencement", "exécution", "désistement"],
  },
  {
    matiere: "Droit pénal général",
    question: "Quelles sont les 3 conditions préalables à l'usage d'une arme par un policier (art. L.435-1 C.S.I.) ?",
    reponse: "Agir dans l'exercice de ses fonctions, être revêtu de son uniforme ou des insignes extérieurs et apparents de sa qualité, et n'utiliser son arme qu'en cas d'absolue nécessité et de manière strictement proportionnée.",
    motsCles: ["fonctions", "uniforme", "nécessité", "proportionné"],
  },
  {
    matiere: "Droit pénal spécial",
    question: "Qu'est-ce qui distingue le vol de l'abus de confiance ?",
    reponse: "Le vol est une soustraction frauduleuse : l'auteur prend la chose à l'insu ou contre le gré de la victime. L'abus de confiance suppose au contraire une remise préalable volontaire de la chose, suivie d'un détournement par celui qui l'a reçue.",
    motsCles: ["soustraction", "remise", "détournement"],
  },
  {
    matiere: "Droit pénal spécial",
    question: "Quelle est la différence entre le meurtre et l'assassinat ?",
    reponse: "Le meurtre (art. 221-1 C.P.) est le fait de donner volontairement la mort à autrui, puni de 30 ans de réclusion. L'assassinat (art. 221-3 C.P.) est un meurtre commis avec préméditation ou guet-apens, c'est-à-dire lorsque l'intention homicide est antérieure à l'action ; il est puni de la réclusion à perpétuité.",
    motsCles: ["préméditation", "guet-apens", "perpétuité"],
  },
  {
    matiere: "Droit pénal spécial",
    question: "Qu'est-ce qui caractérise une résistance constitutive de rébellion, par opposition à une simple désobéissance ?",
    reponse: "La rébellion suppose un acte de résistance active et violente qui fait obstacle à l'accomplissement de la mission de l'agent. Une simple désobéissance aux ordres ou une résistance passive (comme se laisser traîner au sol) ne suffit pas.",
    motsCles: ["active", "violente", "passive"],
  },
  {
    matiere: "Procédure pénale",
    question: "Dans quel cadre un officier de police judiciaire peut-il placer une personne en garde à vue ?",
    reponse: "Pour un crime ou un délit puni d'une peine d'emprisonnement, lorsqu'il existe des raisons plausibles de soupçonner que la personne a commis ou tenté de commettre l'infraction, sous le contrôle du procureur de la République.",
    motsCles: ["emprisonnement", "procureur", "soupçonner"],
  },
  {
    matiere: "Procédure pénale",
    question: "Quelle est la différence entre l'enquête de flagrant délit et l'enquête préliminaire ?",
    reponse: "L'enquête de flagrant délit s'applique aux crimes et délits punis d'emprisonnement se commettant actuellement ou venant de se commettre, et donne des pouvoirs élargis mais limités dans le temps. L'enquête préliminaire s'applique à toutes les infractions, est caractérisée par l'absence de coercition, et dure 2 ans en droit commun.",
    motsCles: ["flagrance", "préliminaire", "coercition"],
  },
  {
    matiere: "Procédure pénale",
    question: "Quels sont les 3 régimes de valeur probante d'un procès-verbal ?",
    reponse: "Simple renseignement (enquête de flagrance, préliminaire ou commission rogatoire, art. 430 C.P.P.), preuve jusqu'à preuve contraire par écrit ou témoins (art. 431 C.P.P.), et preuve jusqu'à inscription de faux, réservée aux agents spécialisés habilités par une loi spéciale (art. 433 C.P.P.).",
    motsCles: ["renseignement", "preuve contraire", "inscription de faux"],
  },
  {
    matiere: "Procédure pénale",
    question: "Quels sont les principaux droits du gardé à vue dès le début de la mesure ?",
    reponse: "Le droit de faire prévenir un proche, son employeur ou les autorités consulaires (dans les 3h), le droit de demander un examen médical (dans les 3h), et le droit d'être assisté par un avocat, avec un entretien confidentiel de 30 minutes et l'assistance possible aux auditions et confrontations.",
    motsCles: ["prévenir", "examen médical", "avocat"],
  },
  {
    matiere: "Institution et valeurs",
    question: "Quelles sont les 3 grandes entités qui composent la police nationale ?",
    reponse: "La Direction générale de la police nationale (D.G.P.N.), la Direction générale de la sécurité intérieure (D.G.S.I.) et la Préfecture de police de Paris (P.P.).",
    motsCles: ["D.G.P.N.", "D.G.S.I.", "Préfecture"],
  },
  {
    matiere: "Déontologie & discipline",
    question: "Que doit faire un policier face à un ordre manifestement illégal de son supérieur hiérarchique ?",
    reponse: "Il doit refuser de l'exécuter, car le respect de la légalité doit l'emporter sur le devoir d'obéissance lorsque l'ordre est manifestement illégal et de nature à compromettre gravement un intérêt public (art. R. 434-5 C.S.I.).",
    motsCles: ["légalité", "illégal", "obéissance"],
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Que faut-il faire face à un enfant d'âge scolaire trouvé seul sur la voie publique pendant les heures de classe ?",
    reponse: "Relever son identité et sa filiation, le conduire à l'établissement scolaire où il est inscrit, aviser la brigade des mineurs, et rédiger une mention de main courante.",
    motsCles: ["identité", "établissement", "brigade des mineurs"],
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Que ne faut-il jamais faire lors d'une intervention face à une agression armée confirmée dans un établissement ?",
    reponse: "Ne jamais passer devant l'établissement en tenue ou véhicule identifiable, ne jamais utiliser les avertisseurs sonores et lumineux, ne jamais tenter de pénétrer dans l'établissement ou de bloquer les agresseurs, et ne jamais tirer de coups de feu d'intimidation.",
    motsCles: ["jamais", "pénétrer", "intimidation"],
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Quelle est la différence entre la palpation de sécurité, la fouille de sécurité et la fouille intégrale ?",
    reponse: "La palpation de sécurité est une mesure administrative sommaire par-dessus les vêtements, sans dénudation. La fouille de sécurité est pratiquée avant un placement en rétention, pour écarter tout objet dangereux. La fouille intégrale (art. 63-7 C.P.P.) est un moyen de recherche de preuve en garde à vue, pouvant impliquer un déshabillage complet.",
    motsCles: ["palpation", "fouille", "déshabillage"],
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Dans quels cas l'introduction au domicile d'autrui par un policier est-elle justifiée sans l'accord de l'occupant ?",
    reponse: "Notamment en cas de réclamation faite depuis l'intérieur du domicile (art. 59 C.P.P., même si elle s'avère fantaisiste par la suite), ou lorsque des indices laissent croire qu'une personne y est en péril grave, l'assistance à personne en péril étant alors une obligation légale (art. 223-6 al.2 C.P.).",
    motsCles: ["réclamation", "péril", "assistance"],
  },
  {
    matiere: "Technique & sécurité en intervention",
    question: "Décris le principe du triangle de sécurité lors d'une intervention à plusieurs.",
    reponse: "Il répartit les rôles entre un couvrant (qui surveille et protège), un intervenant (qui agit directement) et un périmètre maîtrisé, pour sécuriser l'ensemble de la zone d'action.",
    motsCles: ["couvrant", "intervenant", "périmètre"],
  },
  {
    matiere: "Secourisme (SST)",
    question: "Quelle est la conduite à tenir face à une victime inconsciente qui respire ?",
    reponse: "La placer en position latérale de sécurité (PLS), surveiller sa respiration, et alerter les secours en attendant leur arrivée.",
    motsCles: ["latérale", "sécurité", "respiration"],
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "À partir de quel taux d'alcoolémie la conduite devient-elle un délit pour un conducteur ordinaire ?",
    reponse: "Au-delà de 0,40 mg/l d'alcool dans l'air expiré ou 0,80 g/l dans le sang, la conduite sous l'empire d'un état alcoolique (C.E.E.A.) devient un délit ; entre 0,25 et 0,40 mg/l (ou 0,50 à 0,80 g/l), il s'agit d'une contravention de 4e classe.",
    motsCles: ["0,40", "0,80", "délit", "contravention"],
  },
  {
    matiere: "Circulation & sécurité routière",
    question: "Dans quels cas un OPJ ou un APJ doit-il retenir le permis de conduire à titre conservatoire ?",
    reponse: "Notamment en cas de C.E.E.A. ou C.E.I., de conduite après usage de stupéfiants, de dépassement de 40 km/h ou plus de la vitesse maximale autorisée constaté sur le champ, d'accident mortel ou corporel avec contravention associée, ou de refus d'obtempérer.",
    motsCles: ["alcool", "stupéfiants", "vitesse", "accident"],
  },
];


const MINDMAPS = {
  "Droit pénal général": {
    branches: [
      { title: "Grands principes", points: ["Légalité des infractions et des peines (art. 111-3 C.P.)", "Personnalité des peines (art. 121-1 C.P.)", "Non-rétroactivité de la loi pénale plus sévère (art. 112-1 C.P.)"] },
      { title: "Immunités & inviolabilités", points: ["Diplomatiques et consulaires (art. 29 conv. Vienne)", "Parlementaires : irresponsabilité et inviolabilité", "Familiale : vol entre ascendants/descendants/conjoints (art. 311-12 C.P.)"] },
      { title: "Causes d'irresponsabilité", points: ["Minorité : présomption de non-discernement <13 ans (art. 122-8)", "Trouble psychique ayant aboli le discernement (art. 122-1)", "Contrainte, erreur de droit, état de nécessité (art. 122-2, 122-3, 122-7)"] },
      { title: "Compétences police judiciaire", points: ["O.P.J. : seul compétent pour la garde à vue et la vérification d'identité", "A.P.J. : seconde l'O.P.J., pas de décision de garde à vue", "Assistants d'enquête : formalités procédurales sous contrôle de l'O.P.J."] },
      { title: "Tentative, complicité & légitime défense", points: ["Tentative : commencement d'exécution + absence de désistement (121-4/121-5)", "Complicité : aide, provocation ou instructions (121-7 C.P.)", "Légitime défense : atteinte injustifiée/actuelle/réelle, riposte proportionnée (122-5/122-6)"] },
      { title: "Usage légal des armes (L.435-1 C.S.I.)", points: ["3 conditions : fonctions, uniforme, nécessité absolue/proportion", "5 situations : atteinte à la vie, défense des lieux, fuite dangereuse, véhicule dangereux, périple meurtrier", "Sommations obligatoires sauf en cas d'atteinte immédiate à la vie"] },
    ],
  },
  "Droit pénal spécial": {
    branches: [
      { title: "Atteintes aux biens", points: ["Extorsion : remise obtenue par violence/contrainte (312-1 C.P.)", "Escroquerie : remise obtenue par tromperie (313-1 C.P.)", "Abus de confiance, filouterie et recel (314-1, 313-5, 321-1 C.P.)"] },
      { title: "Atteintes aux personnes", points: ["Atteintes involontaires : maladresse, imprudence, négligence (221-6, 222-19, 222-20 C.P.)", "Menaces, entrave aux secours, non-assistance à personne en péril (222-17, 223-5, 223-6 C.P.)", "Risque causé à autrui : mise en danger délibérée (223-1 C.P.)"] },
      { title: "Délits routiers spécifiques", points: ["Homicide routier et blessures routières : 10 circonstances (221-18 à 221-20 C.P.)", "Rodéo motorisé et son incitation (L.236-1, L.236-2 C.R.)", "Délit de fuite après accident (434-10 C.P. et L.231-1 C.R.)"] },
      { title: "Autorité de l'État & stupéfiants", points: ["Menaces envers un dépositaire de l'autorité publique (433-3 C.P.)", "Usage illicite de stupéfiants (L.3421-1 C.S.P.)", "Cession ou offre de stupéfiants en vue de consommation personnelle (222-39 C.P.)"] },
      { title: "Vol, violences & atteintes à la vie", points: ["Vol : soustraction frauduleuse (311-1/311-3 C.P.), AFD si ≤300€", "Violences volontaires graduées selon l'ITT, aggravées contre les FSI (222-14-5)", "Meurtre (221-1) et assassinat avec préméditation (221-3 C.P.)"] },
      { title: "Atteintes sexuelles", points: ["Viol : pénétration/acte bucco-génital sans consentement (222-23 C.P.)", "Agressions sexuelles autres que le viol (222-27 C.P.)", "Harcèlement, exhibition, outrage sexiste et atteinte à l'intimité (222-33, 222-32, 222-33-1-1, 226-3-1)"] },
      { title: "Autorité & probité", points: ["Outrage et rébellion envers un dépositaire de l'autorité publique (433-5, 433-6/7)", "Provocation directe à la rébellion (433-10 C.P.)", "Corruption passive et active (432-11, 433-1 C.P.)"] },
    ],
  },
  "Procédure pénale": {
    branches: [
      { title: "Contrôles d'identité", points: ["Art. 78-2 al.2-6 CPP : à l'initiative des policiers (5 cas)", "Art. 78-2 al.7 CPP : sur réquisitions écrites du procureur", "Vérification d'identité (78-3) : compétence exclusive de l'O.P.J."] },
      { title: "Garde à vue", points: ["Conditions : crime/délit puni d'emprisonnement + objectif précis (62-2)", "Durée : 24h, prolongeable de 24h par le procureur (délit ≥1 an)", "Décision exclusive de l'O.P.J. ; notification par O.P.J. ou A.P.J. sous contrôle"] },
      { title: "Cadres d'enquête", points: ["Flagrance (53-73 CPP) : crimes/délits punis d'emprisonnement, en cours", "Préliminaire (75-78 CPP) : toutes infractions, sans coercition, 2 ans", "Commission rogatoire (81, 151-154 CPP) : domaine exclusif de l'O.P.J."] },
      { title: "Organisation judiciaire", points: ["Magistrats du siège (juges, inamovibles) et du parquet (procureurs)", "Tribunal de police (contraventions), tribunal correctionnel (délits)", "Cour d'assises (crimes, avec jury) et cour criminelle départementale (15-20 ans, sans récidive)"] },
      { title: "Procès-verbaux", points: ["3 valeurs : simple renseignement, preuve contraire, inscription de faux (429-433)", "6 parties : titre, incipit, corps, déclarations, qualification, clôture", "Rédigé au présent, à la 1ère personne du pluriel, sans rature non approuvée"] },
      { title: "Droits du gardé à vue", points: ["Prévenir un proche/employeur/consulat sous 3h (63-2)", "Examen médical sous 3h (63-3)", "Avocat dès le début : entretien 30 min, pièces, assistance auditions (63-3-1 à 63-4-3)"] },
    ],
  },
  "Institution et valeurs": {
    branches: [
      { title: "Formation & organisation", points: ["Formation initiale : 24 mois (12 en école + 12 en stage)", "3 entités : D.G.P.N., D.G.S.I., Préfecture de police de Paris", "D.G.P.N. pilote D.N.P.J., D.N.S.P., D.N.P.A.F., I.G.P.N., D.C.C.R.S., Académie de police"] },
      { title: "Hiérarchie des grades", points: ["Corps d'encadrement : gardien → brigadier-chef → major", "Corps de commandement : capitaine → commandant → commandant divisionnaire", "Corps de conception : commissaires"] },
      { title: "Contrôle & discipline", points: ["I.G.P.N. : contrôle interne (enquêtes, audits, inspections)", "Défenseur des droits : contrôle externe (art. R.434-24 C.S.I.)", "4 groupes de sanctions, de l'avertissement à la révocation"] },
      { title: "Laïcité", points: ["Neutralité de l'État, liberté de religion, pluralisme", "Agent public : neutre, ne manifeste pas sa religion au travail", "Usager : liberté d'exprimer ses convictions, sauf ordre public"] },
    ],
  },
  "Déontologie & discipline": {
    branches: [
      { title: "Obligations générales", points: ["Obéissance sauf ordre manifestement illégal (R.434-5)", "Secret et discrétion professionnelle (R.434-8, R.434-12)", "Probité : pas d'intérêt personnel opposé à l'administration (R.434-9)"] },
      { title: "Discernement & impartialité", points: ["Discernement : adapter la réponse aux risques et délais (R.434-10)", "Impartialité : équité, neutralité, laïcité (R.434-11)", "Dignité en tout temps, y compris hors service (R.434-12)"] },
      { title: "Voie disciplinaire", points: ["Indépendante de la voie pénale", "4 groupes de sanctions croissantes", "Suspension = mesure provisoire, pas une sanction"] },
      { title: "Obligations spécifiques", points: ["Réserve : modération dans l'expression des opinions (R.434-29)", "Obligation d'agir même hors service (R.434-19)", "Serment avant la prise de fonctions (L.434-1 A)"] },
    ],
  },
  "Technique & sécurité en intervention": {
    branches: [
      { title: "Avant l'intervention", points: ["Renseignement et reconnaissance", "Répartition des rôles", "Anticipation des issues"] },
      { title: "Triangle de sécurité", points: ["Un couvrant", "Un intervenant", "Un périmètre maîtrisé"] },
      { title: "Palpation & menottage", points: ["Palpation : mesure de sûreté NON systématique (R.434-16 C.S.I.)", "Menottage : justifié si danger ou risque de fuite (803 CPP), toujours dans le dos", "Proscrit pour mineurs de 13 ans hors affaire criminelle"] },
      { title: "Mineurs en danger", points: ["Fugue = disparition inquiétante, même volontaire (74-1 CPP)", "Enfant seul en heures scolaires : identité, école, brigade mineurs", "Mendicité d'un enfant <6 ans : 7 ans - 100 000 € (227-15 al.2)"] },
      { title: "Publics vulnérables & stupéfiants", points: ["Malade mental : dialogue calme, jamais de mensonge ni d'ironie", "Soins sans consentement : demande d'un tiers ou péril imminent (L.3212-1)", "AFD stupéfiants exclue si mineur, conducteur, ou grande quantité"] },
      { title: "Interventions à haut risque", points: ["Alarme établissement : approche discrète, pénétration sur ordre du CIC", "Agression armée : jamais d'intimidation ni de blocage", "Sinistre : bilan rapide, périmètre de sécurité, préservation des indices"] },
      { title: "Domicile & voisinage", points: ["Violation de domicile : introduction/maintien par contrainte (226-4 CP)", "Introduction justifiée : réclamation intérieure ou personne en péril", "Bruits : domestiques (R.1336-5), chantier, tapages nocturnes (R.623-2)"] },
      { title: "Différend familial & IPM", points: ["Violences au sein du couple : toujours délictuelles, quelle que soit l'ITT", "Brigade de protection des familles : lutte violences femmes/enfants/aînés", "I.P.M. : état évident en lieu public, indépendant du taux d'alcool (R.3353-1)"] },
    ],
  },
  "Secourisme (SST)": {
    branches: [
      { title: "Protéger", points: ["Écarter le sur-accident", "Baliser la zone", "Ne jamais se mettre en danger"] },
      { title: "Alerter", points: ["15 (SAMU) / 18 (pompiers) / 112", "Message clair : lieu, nombre, état"] },
      { title: "Secourir", points: ["PLS si inconscient et respire", "Massage cardiaque si arrêt cardio-respiratoire", "Compression directe si hémorragie"] },
      { title: "Cas particuliers", points: ["Étouffement : Heimlich", "Malaise : position d'attente adaptée", "Brûlure : refroidir à l'eau tempérée"] },
    ],
  },
  "Circulation & sécurité routière": {
    branches: [
      { title: "Alcool", points: ["Délit (C.E.E.A.) : ≥ 0,40 mg/l air ou 0,80 g/l sang (art. L.234-1 C.R.)", "Contravention 4e classe sous ces seuils (seuils réduits pour bus/probatoire)", "C.E.I. : délit indépendant du taux, sur signes extérieurs"] },
      { title: "Stupéfiants", points: ["Dépistage salivaire ou urinaire : 4 familles de substances", "Vérifications par prélèvement salivaire ou sanguin si positif/refus", "Refus de vérifications = délit (art. L.235-3 C.R.)"] },
      { title: "Rétention & permis à points", points: ["Rétention max 72h (120h si examens médicaux) — art. L.224-1 C.R.", "Suspension préfectorale possible jusqu'à 6 mois (1 an aggravé)", "Capital 6→12 points, retrait 6 pts (délit) ou 1-6 pts (contravention)"] },
      { title: "Contrôle routier & priorités", points: ["Contrôle d'initiative possible sans infraction préalable (R.233-1 C.R.)", "Pas de fouille du coffre en simple contrôle routier", "Priorité à droite par défaut, arrêt absolu au STOP et au feu rouge"] },
    ],
  },
};

const ADMIN_NAME = "Thimy";
// Accès admin : taper ce prénom suffit, sans code (voir Login ci-dessous).

const TOTAL_POINTS_PAR_MATIERE = Object.fromEntries(
  Object.entries(MINDMAPS).map(([nom, d]) => [nom, d.branches.reduce((s, b) => s + b.points.length, 0)])
);

/* ------------------------- STORAGE HELPERS ------------------------- */

function normalizeKey(name) {
  // Ignore casing and any spacing differences (ex: "Camille B", "camille b", "CamilleB" → même session)
  return name.trim().toLowerCase().replace(/\s+/g, "");
}

function defaultStudent(name, pin, isAdmin = false, approuve = true) {
  return {
    name,
    pin,
    isAdmin,
    approuve,
    acquis: {},
    pratique: { tir: "", course: "", natation: "", gtpi: "" },
    createdAt: Date.now(),
  };
}

async function loadStudent(name) {
  try {
    const res = await window.storage.get(`student:${normalizeKey(name)}`, true);
    if (res && res.value) return JSON.parse(res.value);
  } catch (e) {
    /* not found yet */
  }
  return null;
}

async function saveStudent(data) {
  try {
    await window.storage.set(`student:${normalizeKey(data.name)}`, JSON.stringify(data), true);
    return true;
  } catch (e) {
    console.error("Erreur de sauvegarde", e);
    return false;
  }
}

async function listStudents() {
  try {
    const res = await window.storage.list("student:", true);
    return res && res.keys ? res.keys.map((k) => k.replace("student:", "")) : [];
  } catch (e) {
    return [];
  }
}

async function rawGetStudent(rawKey) {
  try {
    const res = await window.storage.get(`student:${rawKey}`, true);
    if (res && res.value) return JSON.parse(res.value);
  } catch (e) {
    /* not found */
  }
  return null;
}

async function rawDeleteStudent(rawKey) {
  try {
    await window.storage.delete(`student:${rawKey}`, true);
  } catch (e) {
    console.error("Erreur de nettoyage", e);
  }
}

async function deleteStudent(name) {
  try {
    await window.storage.delete(`student:${normalizeKey(name)}`, true);
    return true;
  } catch (e) {
    console.error("Erreur de suppression", e);
    return false;
  }
}

/* ----------------------------- AUTHENTIFICATION SERVEUR ----------------------------- */
// Ces deux fonctions appellent les fonctions serverless dédiées quand elles
// sont disponibles (déploiement Netlify réel). Si elles ne répondent pas
// (ex : aperçu artefact Claude.ai, sans backend), ok vaut null : c'est le
// signal pour retomber sur un fonctionnement local simplifié, sans jeton.

async function verifierPinServeur(name, pin) {
  try {
    const res = await fetch("/api/verify-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, pin }),
    });
    const data = await res.json();
    if (typeof data.ok === "undefined") return { ok: null };
    return data;
  } catch (e) {
    // Pas de backend joignable (ex : aperçu artefact Claude.ai) ou réponse
    // non JSON (page 404 générique) : signal pour le repli local.
    return { ok: null };
  }
}

async function adminAuthenticate(name) {
  try {
    const res = await fetch("/api/admin-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (typeof data.ok === "undefined") return { ok: null };
    return data;
  } catch (e) {
    return { ok: null };
  }
}

function definirJetonAuth(token) {
  if (typeof window !== "undefined" && window.storage && typeof window.storage.setAuthToken === "function") {
    window.storage.setAuthToken(token);
  }
}

/* ----------------------------- SUPPORT / TICKETS ----------------------------- */

async function listTickets() {
  try {
    const res = await window.storage.list("ticket:", true);
    return res && res.keys ? res.keys : [];
  } catch (e) {
    return [];
  }
}

async function loadTicket(rawKey) {
  try {
    const res = await window.storage.get(rawKey, true);
    if (res && res.value) return JSON.parse(res.value);
  } catch (e) {
    /* not found */
  }
  return null;
}

async function saveTicket(ticket) {
  try {
    await window.storage.set(`ticket:${ticket.id}`, JSON.stringify(ticket), true);
    return true;
  } catch (e) {
    console.error("Erreur de sauvegarde du ticket", e);
    return false;
  }
}

/* --------------------------- UI HELPERS --------------------------- */

function colorFor(C, key) {
  return { red: C.red, navy: C.navy, gold: C.gold }[key] || C.navy;
}

function avancementDe(matiereNom, acquis) {
  const total = TOTAL_POINTS_PAR_MATIERE[matiereNom] || 1;
  const checked = Object.keys(acquis).filter((k) => k.startsWith(`${matiereNom}-`) && acquis[k]).length;
  return Math.round((checked / total) * 100);
}

function Eyebrow({ children, C }) {
  return <div className="text-xs font-bold tracking-[0.18em] uppercase mb-1" style={{ color: C.gold }}>{children}</div>;
}

function Stamp({ C, size = 40 }) {
  return (
    <div className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: size, height: size, border: `2px solid ${C.gold}`, color: C.gold }}>
      <Shield size={size * 0.5} strokeWidth={2} />
    </div>
  );
}

function Card({ C, children, style = {}, className = "", onClick }) {
  return (
    <div onClick={onClick} className={`rounded-lg ${className}`} style={{ background: C.card, border: `1px solid ${C.line}`, ...style }}>
      {children}
    </div>
  );
}

function BackButton({ C, onClick, label = "Retour" }) {
  return (
    <button onClick={onClick} className="text-xs font-semibold flex items-center gap-1 mb-4" style={{ color: C.slate }}>
      <ChevronLeft size={14} /> {label}
    </button>
  );
}

function ConfirmDialog({ C, data, onClose }) {
  if (!data) return null;
  const confirmer = () => {
    data.onConfirm();
    onClose();
  };
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg p-6"
        style={{ background: C.card, border: `1px solid ${C.line}` }}
      >
        <div className="flex items-start gap-3 mb-5">
          <div className="mt-0.5 flex-shrink-0" style={{ color: C.gold }}>
            <Shield size={18} />
          </div>
          <div className="text-sm leading-relaxed" style={{ color: C.ink }}>{data.message}</div>
        </div>
        <div className="flex gap-3 justify-end flex-wrap">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md text-sm font-semibold"
            style={{ border: `1px solid ${C.line}`, color: C.ink }}
          >
            Annuler
          </button>
          <button
            onClick={confirmer}
            className="px-4 py-2 rounded-md text-sm font-bold"
            style={{ background: C.red, color: "#fff" }}
          >
            {data.confirmLabel || "Continuer"}
          </button>
        </div>
      </div>
    </div>
  );
}

function SectionTitle({ C, children }) {
  return (
    <h1 className="text-2xl font-extrabold uppercase tracking-wide pb-2 mb-6 inline-block" style={{ color: C.ink, borderBottom: `3px solid ${C.gold}` }}>
      {children}
    </h1>
  );
}

function ProgressBar({ C, value, color }) {
  return (
    <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: C.line }}>
      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${value}%`, background: color }} />
    </div>
  );
}

/* ----------------------------- LOGIN ----------------------------- */

function Login({ C, onEnter }) {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [pinConfirm, setPinConfirm] = useState("");
  const [step, setStep] = useState("name"); // "name" | "newPin" | "existingPin" | "disambiguation"
  const [error, setError] = useState("");
  const [existing, setExisting] = useState([]);
  const [checking, setChecking] = useState(false);
  const [existingRecord, setExistingRecord] = useState(null);
  const [surname, setSurname] = useState("");

  useEffect(() => {
    (async () => {
      const keys = await listStudents();
      const records = await Promise.all(
        keys.filter((k) => k !== normalizeKey(ADMIN_NAME)).map((k) => loadStudent(k))
      );
      const names = records.filter(Boolean).map((r) => r.name);
      setExisting(names.sort((a, b) => a.localeCompare(b)));
    })();
  }, []);

  const goToName = (n) => {
    setName(n);
    setPin("");
    setPinConfirm("");
    setError("");
    handleContinue(n);
  };

  const handleContinue = async (nameOverride) => {
    const clean = (nameOverride ?? name).trim();
    if (!clean) return;
    setName(clean);
    setError("");

    if (clean.toLowerCase() === ADMIN_NAME.toLowerCase()) {
      // Accès admin direct, sans code : taper le prénom suffit. Le passage
      // par le serveur sert uniquement à obtenir le jeton nécessaire aux
      // actions sensibles (approbation, suppression, réponses support) —
      // voir la remarque sur ce choix dans admin-auth.js.
      setChecking(true);
      const resultat = await adminAuthenticate(ADMIN_NAME);
      if (resultat.ok === false) {
        setChecking(false);
        setError(resultat.error || "Accès refusé.");
        return;
      }
      if (resultat.ok === true) {
        definirJetonAuth(resultat.token);
      }
      // resultat.ok === null : pas de backend disponible (aperçu Claude.ai) —
      // on continue sans jeton, comme avant.
      let record = await loadStudent(ADMIN_NAME);
      if (!record) {
        record = defaultStudent(ADMIN_NAME, null, true);
        await saveStudent(record);
      } else if (!record.isAdmin) {
        record = { ...record, isAdmin: true };
        await saveStudent(record);
      }
      setChecking(false);
      onEnter(record);
      return;
    }

    setChecking(true);
    const record = await loadStudent(clean);
    setChecking(false);
    if (record) {
      setName(record.name);
      setExistingRecord(record);
      setStep("existingPin");
    } else {
      setStep("newPin");
    }
  };

  const handleCreate = async () => {
    if (!/^\d{4}$/.test(pin)) { setError("Le code doit contenir 4 chiffres."); return; }
    if (pin !== pinConfirm) { setError("Les deux codes ne correspondent pas."); return; }
    const record = defaultStudent(name, pin, false, false);
    await saveStudent(record);
    setStep("attenteApprobation");
  };

  const handleUnlock = async () => {
    setChecking(true);
    const resultat = await verifierPinServeur(name, pin);
    setChecking(false);

    let recordActuel = existingRecord;

    if (resultat.ok === false) {
      setError(resultat.error || "Code incorrect.");
      return;
    } else if (resultat.ok === true) {
      definirJetonAuth(resultat.token);
      recordActuel = resultat.student;
    } else {
      // resultat.ok === null : pas de backend disponible (aperçu Claude.ai) —
      // repli sur la vérification locale historique.
      if (existingRecord.pin && existingRecord.pin !== pin) {
        setError("Code incorrect.");
        return;
      }
    }

    if (recordActuel.approuve === false) {
      setExistingRecord(recordActuel);
      setStep("attenteApprobation");
      return;
    }
    onEnter(recordActuel);
  };

  const revenirVerifierApprobation = async () => {
    setChecking(true);
    const resultat = await verifierPinServeur(name, pin);
    let record = null;
    if (resultat.ok === true) {
      record = resultat.student;
    } else if (resultat.ok === null) {
      record = await loadStudent(name);
    }
    setChecking(false);

    if (!record || record.approuve === false) {
      setError("Ta session n'a pas encore été validée par l'administrateur.");
      return;
    }
    if (resultat.ok === true) {
      definirJetonAuth(resultat.token);
    }
    onEnter(record);
  };

  const handleDisambiguate = async () => {
    const suffix = surname.trim();
    if (!suffix) { setError("Ajoute au moins la première lettre de ton nom de famille (ex : B)."); return; }
    const fullName = `${name} ${suffix}`.trim();
    setChecking(true);
    const record = await loadStudent(fullName);
    setChecking(false);
    if (record) {
      setError("Cette combinaison existe déjà aussi. Essaie une autre lettre ou ton nom complet.");
      return;
    }
    setName(fullName);
    setError("");
    setPin("");
    setPinConfirm("");
    setStep("newPin");
  };

  return (
    <div className="w-full h-full flex items-center justify-center" style={{ background: C.bg, minHeight: 640 }}>
      <Card C={C} className="p-8 w-full max-w-md">
        <div className="flex flex-col items-center text-center mb-6">
          <Stamp C={C} size={48} />
          <div className="mt-3 text-white font-extrabold text-lg" style={{ color: C.ink }}>GPX RÉVISION</div>
          <div className="text-sm" style={{ color: C.slate }}>SENS — 281ème promotion</div>
        </div>

        {step === "name" && (
          <>
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Prénom + première lettre du nom de famille</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleContinue()}
              placeholder="Ex : Camille B."
              className="w-full mt-2 mb-1 px-3 py-2.5 rounded-md text-sm outline-none"
              style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
            />
            <div className="text-xs mb-4" style={{ color: C.slate }}>
              Écris ton prénom suivi de la première lettre de ton nom de famille (ex : "Camille B."), puis ton code secret à l'étape suivante. Cela évite toute confusion si plusieurs élèves ont le même prénom.
            </div>
            <button onClick={() => handleContinue()} disabled={checking} className="w-full py-2.5 rounded-md text-sm font-bold" style={{ background: C.navy, color: "#fff" }}>
              {checking ? "Vérification…" : "Continuer"}
            </button>

            {existing.length > 0 && (
              <div className="mt-6">
                <div className="text-xs mb-2" style={{ color: C.slate }}>Sessions déjà créées dans la classe :</div>
                <div className="flex flex-wrap gap-2">
                  {existing.map((n) => (
                    <button key={n} onClick={() => goToName(n)} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {step === "newPin" && (
          <>
            <div className="text-sm mb-4" style={{ color: C.ink }}>
              "<span className="font-bold">{name}</span>" est un nouvel identifiant. Choisis un code secret à 4 chiffres pour protéger ta session. L'administrateur devra valider ta demande avant ton premier accès.
            </div>
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Code (4 chiffres)</label>
            <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="••••"
              className="w-full mt-2 mb-3 px-3 py-2.5 rounded-md text-sm outline-none tracking-[0.3em]" style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }} />
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Confirme le code</label>
            <input value={pinConfirm} onChange={(e) => setPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))} inputMode="numeric" placeholder="••••"
              className="w-full mt-2 mb-4 px-3 py-2.5 rounded-md text-sm outline-none tracking-[0.3em]" style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }} />
            {error && <div className="text-xs mb-3" style={{ color: C.red }}>{error}</div>}
            <button onClick={handleCreate} className="w-full py-2.5 rounded-md text-sm font-bold" style={{ background: C.navy, color: "#fff" }}>Créer ma session</button>
            <button onClick={() => { setStep("name"); setError(""); }} className="w-full py-2 mt-2 text-xs font-semibold" style={{ color: C.slate }}>← Changer de prénom</button>
          </>
        )}

        {step === "attenteApprobation" && (
          <>
            <div className="flex flex-col items-center text-center mb-2">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mb-3" style={{ background: `${C.gold}20` }}>
                <Users size={22} style={{ color: C.gold }} />
              </div>
              <div className="font-bold text-base mb-2" style={{ color: C.ink }}>En attente de validation</div>
              <div className="text-sm mb-4" style={{ color: C.slate }}>
                Ta session "<span className="font-semibold">{name}</span>" a bien été créée, mais elle doit d'abord être validée par l'administrateur (Thimy) avant que tu puisses y accéder. Reviens un peu plus tard et réessaie de te connecter.
              </div>
            </div>
            {error && <div className="text-xs mb-3 text-center" style={{ color: C.red }}>{error}</div>}
            <button onClick={revenirVerifierApprobation} disabled={checking} className="w-full py-2.5 rounded-md text-sm font-bold" style={{ background: C.navy, color: "#fff" }}>
              {checking ? "Vérification…" : "Réessayer maintenant"}
            </button>
            <button onClick={() => { setStep("name"); setError(""); setPin(""); setPinConfirm(""); }} className="w-full py-2 mt-2 text-xs font-semibold" style={{ color: C.slate }}>← Retour</button>
          </>
        )}

        {step === "existingPin" && (
          <>
            <div className="text-sm mb-4" style={{ color: C.ink }}>
              Une session "<span className="font-bold">{name}</span>" existe déjà. Entre ton code secret pour y accéder.
            </div>
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Code (4 chiffres)</label>
            <input value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))} onKeyDown={(e) => e.key === "Enter" && handleUnlock()} inputMode="numeric" placeholder="••••"
              className="w-full mt-2 mb-4 px-3 py-2.5 rounded-md text-sm outline-none tracking-[0.3em]" style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }} />
            {error && <div className="text-xs mb-3" style={{ color: C.red }}>{error}</div>}
            <button onClick={handleUnlock} className="w-full py-2.5 rounded-md text-sm font-bold" style={{ background: C.navy, color: "#fff" }}>Accéder à ma session</button>
            <button onClick={() => setStep("codeOublie")} className="w-full py-2 mt-2 text-xs font-semibold" style={{ color: C.gold }}>Code oublié ?</button>
            <button onClick={() => { setStep("disambiguation"); setError(""); setPin(""); }} className="w-full py-2 text-xs font-semibold" style={{ color: C.gold }}>
              On a juste le même prénom, ce n'est pas moi →
            </button>
            <button onClick={() => { setStep("name"); setError(""); setPin(""); }} className="w-full py-2 text-xs font-semibold" style={{ color: C.slate }}>← Ce n'est pas moi</button>
          </>
        )}

        {step === "disambiguation" && (
          <>
            <div className="text-sm mb-4" style={{ color: C.ink }}>
              Une session "<span className="font-bold">{name}</span>" existe déjà, mais ce n'est pas toi. Ajoute la première lettre de ton nom de famille pour créer ta propre session distincte.
            </div>
            <label className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Première lettre du nom de famille (ou nom complet)</label>
            <input
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleDisambiguate()}
              placeholder="Ex : B."
              className="w-full mt-2 mb-1 px-3 py-2.5 rounded-md text-sm outline-none"
              style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
            />
            <div className="text-xs mb-4" style={{ color: C.slate }}>
              Ta session s'appellera "<span className="font-semibold">{name} {surname.trim() || "…"}</span>".
            </div>
            {error && <div className="text-xs mb-3" style={{ color: C.red }}>{error}</div>}
            <button onClick={handleDisambiguate} disabled={checking} className="w-full py-2.5 rounded-md text-sm font-bold" style={{ background: C.navy, color: "#fff" }}>
              {checking ? "Vérification…" : "Continuer"}
            </button>
            <button onClick={() => { setStep("existingPin"); setError(""); setSurname(""); }} className="w-full py-2 mt-2 text-xs font-semibold" style={{ color: C.slate }}>← Retour</button>
          </>
        )}

        {step === "codeOublie" && (
          <>
            <div className="text-sm mb-4" style={{ color: C.ink }}>
              Pas de panique. Il n'y a pas de récupération automatique, mais l'administrateur (Thimy) peut réinitialiser ton code depuis l'onglet "Sessions élèves" de son espace admin.
            </div>
            <div className="text-xs mb-5" style={{ color: C.slate }}>
              Demande-lui de te donner un nouveau code pour ta session "<span className="font-semibold">{name}</span>".
            </div>
            <button onClick={() => { setStep("existingPin"); setError(""); }} className="w-full py-2.5 rounded-md text-sm font-bold" style={{ background: C.navy, color: "#fff" }}>
              J'ai récupéré mon nouveau code
            </button>
            <button onClick={() => { setStep("name"); setError(""); setPin(""); }} className="w-full py-2 mt-2 text-xs font-semibold" style={{ color: C.slate }}>← Retour</button>
          </>
        )}

        <div className="text-[11px] mt-6 text-center" style={{ color: C.slate }}>
          Chacun a sa propre session, protégée par son identifiant (prénom + première lettre du nom de famille) et son code : tout ce que tu fais dans l'app reste entièrement privé, personne d'autre ne peut le consulter.
        </div>
      </Card>
    </div>
  );
}

/* ----------------------------- SEARCH INPUT ----------------------------- */

function SearchInput({ C, value, onChange, placeholder }) {
  return (
    <div className="relative w-full">
      <Search
        size={17}
        strokeWidth={2}
        className="absolute top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ left: 14, color: C.slate }}
      />
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md outline-none"
        style={{
          border: `1px solid ${C.line}`,
          background: C.card,
          color: C.ink,
          fontSize: 16,
          lineHeight: "1.4",
          padding: "11px 14px 11px 40px",
        }}
      />
    </div>
  );
}

/* ----------------------------- TABS ----------------------------- */

function Dashboard({ C, student, onNaviguerVersFiche }) {
  const avancements = MATIERES.map((m) => ({ ...m, avancement: avancementDe(m.nom, student.acquis) }));
  const moyenne = Math.round(avancements.reduce((s, m) => s + m.avancement, 0) / avancements.length) || 0;
  const plusFaible = [...avancements].sort((a, b) => a.avancement - b.avancement)[0];
  const [recherche, setRecherche] = useState("");
  const resultats = recherche.trim() ? rechercherFiches(recherche, 12) : [];

  return (
    <div>
      <Eyebrow C={C}>Session de {student.name}</Eyebrow>
      <SectionTitle C={C}>Tableau de service</SectionTitle>

      <div className="max-w-2xl mb-6">
        <SearchInput
          C={C}
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          placeholder="Rechercher dans toutes les fiches (les 7 documents)…"
        />
        {recherche.trim() && (
          <div className="mt-3 flex flex-col gap-2">
            {resultats.length === 0 ? (
              <div className="text-sm" style={{ color: C.slate }}>Aucun résultat pour "{recherche}".</div>
            ) : (
              resultats.map((r, i) => (
                <Card C={C} key={i} onClick={() => onNaviguerVersFiche(r.docTitre, r.sectionNumero, r.ficheIndex)} className="p-3 cursor-pointer">
                  <div className="font-semibold text-sm" style={{ color: C.ink }}>{r.ficheTitre}</div>
                  <div className="text-[11px] mb-1" style={{ color: C.gold }}>{r.docTitre} — {r.sectionNumero}. {r.sectionTitre}</div>
                  <div className="text-xs leading-relaxed" style={{ color: C.slate }}>{extraitAutour(r.texteBrut, recherche)}</div>
                </Card>
              ))
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card C={C} className="p-5">
          <div className="text-sm mb-1" style={{ color: C.slate }}>Avancement global</div>
          <div className="text-3xl font-extrabold" style={{ color: C.ink }}>{moyenne}%</div>
        </Card>
        <Card C={C} className="p-5">
          <div className="text-sm mb-1" style={{ color: C.slate }}>Fiches disponibles</div>
          <div className="text-3xl font-extrabold" style={{ color: C.ink }}>{MATIERES.reduce((s, m) => s + m.fiches, 0)}</div>
        </Card>
        <Card C={C} className="p-5">
          <div className="text-sm mb-1" style={{ color: C.slate }}>Matière la plus fragile</div>
          <div className="text-base font-bold" style={{ color: C.red }}>{plusFaible.nom}</div>
        </Card>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {avancements.map((m) => (
          <Card C={C} key={m.nom} className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm" style={{ color: C.ink }}>{m.nom}</span>
              <span className="text-xs font-bold" style={{ color: colorFor(C, m.couleur) }}>{m.avancement}%</span>
            </div>
            <ProgressBar C={C} value={m.avancement} color={colorFor(C, m.couleur)} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function renderEmphasis(text, accent) {
  if (!text) return null;
  const parts = String(text).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={i} style={{ color: accent }}>{part.slice(2, -2)}</strong>;
    }
    return <React.Fragment key={i}>{part}</React.Fragment>;
  });
}

function OutlineNode({ node, C, accent, depth, compact }) {
  const color = compact ? "#fff" : C.slate;
  const titleColor = compact ? "#DDC98E" : accent;
  const sizeClass = depth === 0 ? "text-sm font-extrabold uppercase tracking-wide" : depth === 1 ? "text-sm font-bold" : "text-sm font-semibold";
  return (
    <div className={depth === 0 ? "mt-3 first:mt-0" : "mt-2 ml-4"} style={depth > 0 ? { borderLeft: `2px solid ${compact ? "rgba(255,255,255,0.25)" : C.line}`, paddingLeft: "0.75rem" } : {}}>
      <div className={sizeClass} style={{ color: titleColor }}>
        {node.niveau ? `${node.niveau}. ` : ""}{node.titre}
      </div>
      {node.texte && (
        <div className="text-sm leading-relaxed mt-1" style={{ color }}>
          {renderEmphasis(node.texte, titleColor)}
        </div>
      )}
      {node.points && (
        <ul className="flex flex-col gap-1.5 mt-1">
          {node.points.map((p, j) => (
            <li key={j} className="text-sm leading-relaxed flex gap-2" style={{ color }}>
              <span className="flex-shrink-0" style={{ color: titleColor }}>—</span>
              <span>{renderEmphasis(p, titleColor)}</span>
            </li>
          ))}
        </ul>
      )}
      {node.enfants && node.enfants.map((child, i) => (
        <OutlineNode key={i} node={child} C={C} accent={accent} depth={depth + 1} compact={compact} />
      ))}
    </div>
  );
}

function FicheBody({ C, fiche, accent, compact = false, masquerTitre = false }) {
  if (fiche.plan) {
    return (
      <div>
        {!masquerTitre && fiche.titre && (
          <div className={compact ? "text-base font-extrabold mb-1" : "text-lg font-extrabold mb-1"} style={{ color: compact ? "#fff" : C.ink }}>
            {fiche.titre}
          </div>
        )}
        {fiche.reference && (
          <div className="text-xs font-bold inline-block px-2 py-0.5 rounded mb-2" style={{ background: compact ? "rgba(255,255,255,0.15)" : `${accent}18`, color: compact ? "#fff" : accent }}>
            {fiche.reference}
          </div>
        )}
        {fiche.definition && (
          <div className="text-sm leading-relaxed italic mb-2" style={{ color: compact ? "#fff" : C.ink }}>
            {renderEmphasis(fiche.definition, compact ? "#DDC98E" : accent)}
          </div>
        )}
        <div>
          {fiche.plan.map((node, i) => (
            <OutlineNode key={i} node={node} C={C} accent={accent} depth={0} compact={compact} />
          ))}
        </div>
      </div>
    );
  }
  if (fiche.sections) {
    return (
      <div>
        {!masquerTitre && fiche.titre && (
          <div className={compact ? "text-base font-extrabold mb-1" : "text-lg font-extrabold mb-1"} style={{ color: compact ? "#fff" : C.ink }}>
            {fiche.titre}
          </div>
        )}
        {fiche.reference && (
          <div className="text-xs font-bold inline-block px-2 py-0.5 rounded mb-3" style={{ background: compact ? "rgba(255,255,255,0.15)" : `${accent}18`, color: compact ? "#fff" : accent }}>
            {fiche.reference}
          </div>
        )}
        <div className="flex flex-col gap-3 mt-1">
          {fiche.sections.map((s, i) => (
            <div key={i}>
              <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: compact ? "#DDC98E" : accent }}>{s.label}</div>
              {s.texte && (
                <div className="text-sm leading-relaxed" style={{ color: compact ? "#fff" : C.slate }}>
                  {renderEmphasis(s.texte, compact ? "#DDC98E" : accent)}
                </div>
              )}
              {s.points && (
                <ul className="flex flex-col gap-1.5 mt-0.5">
                  {s.points.map((p, j) => (
                    <li key={j} className="text-sm leading-relaxed flex gap-2" style={{ color: compact ? "#fff" : C.slate }}>
                      <span className="flex-shrink-0" style={{ color: compact ? "#DDC98E" : accent }}>—</span>
                      <span>{renderEmphasis(p, compact ? "#DDC98E" : accent)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
  // Legacy simple format fallback
  return (
    <div>
      {!masquerTitre && (
        <div className={compact ? "text-base font-extrabold mb-2" : "font-bold mb-1"} style={{ color: compact ? "#fff" : C.ink }}>{fiche.titre || fiche.matiere}</div>
      )}
      <div className="text-sm leading-relaxed" style={{ color: compact ? "#fff" : C.slate }}>{fiche.essentiel}</div>
    </div>
  );
}


const DOCUMENTS_FICHES = [DOC_DPG_DPS_AVANCE, DOC_INSTITUTION_VALEURS, DOC_DPG_DPS_INITIAL, DOC_MEMENTO_CR, DOC_PI_AVANCE, DOC_PI_INITIAL, DOC_RECUEIL_PV];

function extraireTexteNoeud(node) {
  let parts = [];
  if (node.niveau) parts.push(node.niveau);
  if (node.titre) parts.push(node.titre);
  if (node.texte) parts.push(node.texte);
  if (node.points) parts.push(...node.points);
  if (node.enfants) node.enfants.forEach((e) => parts.push(...extraireTexteNoeud(e)));
  return parts;
}

function extraireTexteFiche(fiche) {
  let parts = [fiche.titre || "", fiche.reference || "", fiche.definition || ""];
  if (fiche.plan) fiche.plan.forEach((node) => parts.push(...extraireTexteNoeud(node)));
  if (fiche.sections) {
    fiche.sections.forEach((s) => {
      parts.push(s.label || "");
      parts.push(s.texte || "");
      if (s.points) parts.push(...s.points);
    });
  }
  return parts.filter(Boolean).join(" ");
}

function extraitAutour(texte, requete, longueur = 140) {
  const norm = normaliserTexte(texte);
  const idx = norm.indexOf(normaliserTexte(requete));
  if (idx === -1) return texte.slice(0, longueur) + (texte.length > longueur ? "…" : "");
  const debut = Math.max(0, idx - 40);
  const fin = Math.min(texte.length, idx + requete.length + 100);
  return (debut > 0 ? "…" : "") + texte.slice(debut, fin) + (fin < texte.length ? "…" : "");
}

const INDEX_FICHES = DOCUMENTS_FICHES.flatMap((doc) =>
  doc.sections.flatMap((section) =>
    section.fiches.map((fiche, ficheIndex) => ({
      docTitre: doc.titre,
      sectionNumero: section.numero,
      sectionTitre: section.titre,
      ficheIndex,
      ficheTitre: fiche.titre,
      texteBrut: extraireTexteFiche(fiche),
      texteNorm: normaliserTexte(extraireTexteFiche(fiche)),
    }))
  )
);

function rechercherFiches(requete, limite = 30) {
  const q = normaliserTexte(requete.trim());
  if (!q) return [];
  const mots = q.split(/\s+/).filter(Boolean);
  return INDEX_FICHES.filter((entry) => mots.every((m) => entry.texteNorm.includes(m))).slice(0, limite);
}

function DocumentDPGDPS({ C, cibleFiche, onCibleConsommee }) {
  const [docActif, setDocActif] = useState(null);
  const [sectionActive, setSectionActive] = useState(1);
  const [fichesOuvertes, setFichesOuvertes] = useState({});
  const [rechercheDoc, setRechercheDoc] = useState("");
  const accent = colorFor(C, "red");

  const toggleFiche = (cle) => {
    setFichesOuvertes((prev) => ({ ...prev, [cle]: !prev[cle] }));
  };

  useEffect(() => {
    if (!cibleFiche) return;
    setDocActif(cibleFiche.docTitre);
    setSectionActive(cibleFiche.sectionNumero);
    const cle = `${cibleFiche.docTitre}|${cibleFiche.sectionNumero}|${cibleFiche.ficheIndex}`;
    setFichesOuvertes((prev) => ({ ...prev, [cle]: true }));
    if (onCibleConsommee) onCibleConsommee();
  }, [cibleFiche]);

  const resultatsRecherche = rechercheDoc.trim() ? rechercherFiches(rechercheDoc, 25) : [];

  if (!docActif) {
    return (
      <div>
        <Eyebrow C={C}>Fiches synthèse — classeur par document</Eyebrow>
        <SectionTitle C={C}>Choisis un document</SectionTitle>

        <div className="max-w-2xl mb-4">
          <SearchInput C={C} value={rechercheDoc} onChange={(e) => setRechercheDoc(e.target.value)} placeholder="Rechercher une fiche dans les 7 documents…" />
        </div>

        {rechercheDoc.trim() ? (
          <div className="flex flex-col gap-2 max-w-2xl">
            {resultatsRecherche.length === 0 ? (
              <div className="text-sm" style={{ color: C.slate }}>Aucun résultat pour "{rechercheDoc}".</div>
            ) : (
              resultatsRecherche.map((r, i) => (
                <Card C={C} key={i} onClick={() => {
                  setDocActif(r.docTitre);
                  setSectionActive(r.sectionNumero);
                  const cle = `${r.docTitre}|${r.sectionNumero}|${r.ficheIndex}`;
                  setFichesOuvertes((prev) => ({ ...prev, [cle]: true }));
                  setRechercheDoc("");
                }} className="p-3 cursor-pointer">
                  <div className="font-semibold text-sm" style={{ color: C.ink }}>{r.ficheTitre}</div>
                  <div className="text-[11px] mb-1" style={{ color: C.gold }}>{r.docTitre} — {r.sectionNumero}. {r.sectionTitre}</div>
                  <div className="text-xs leading-relaxed" style={{ color: C.slate }}>{extraitAutour(r.texteBrut, rechercheDoc)}</div>
                </Card>
              ))
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3 max-w-2xl">
            {DOCUMENTS_FICHES.map((d) => {
              const nbFiches = d.sections.reduce((s, sec) => s + sec.fiches.length, 0);
              return (
                <Card C={C} key={d.titre} onClick={() => { setDocActif(d.titre); setSectionActive(1); }} className="p-5 cursor-pointer flex items-center justify-between gap-4">
                  <div>
                    <div className="font-extrabold text-lg mb-1" style={{ color: C.ink }}>{d.titre}</div>
                    <div className="text-xs" style={{ color: C.slate }}>{d.sections.length} sections — {nbFiches} fiches</div>
                  </div>
                  <ChevronRight size={20} style={{ color: C.slate }} />
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const document = DOCUMENTS_FICHES.find((d) => d.titre === docActif) || DOCUMENTS_FICHES[0];
  const section = document.sections.find((s) => s.numero === sectionActive);

  return (
    <div>
      <BackButton C={C} onClick={() => setDocActif(null)} label="Choisir un autre document" />
      <Eyebrow C={C}>Fiches synthèse — classeur par document</Eyebrow>
      <SectionTitle C={C}>{document.titre}</SectionTitle>

      <div className="flex flex-wrap gap-2 mb-6">
        {document.sections.map((s) => {
          const active = s.numero === sectionActive;
          return (
            <button key={s.numero} onClick={() => setSectionActive(s.numero)} className="text-xs px-3 py-2 rounded-md font-semibold text-left"
              style={{ border: `1px solid ${active ? accent : C.line}`, background: active ? accent : "transparent", color: active ? "#fff" : C.ink }}>
              <span className="font-extrabold">{s.numero}.</span> {s.titre}
            </button>
          );
        })}
      </div>

      {section && (
        <div>
          <div className="text-xs font-bold uppercase tracking-wide mb-4" style={{ color: accent }}>
            Section {section.numero} — {section.titre}
          </div>
          <div className="flex flex-col gap-3">
            {section.fiches.map((f, i) => {
              const cle = `${document.titre}|${section.numero}|${i}`;
              const estOuverte = !!fichesOuvertes[cle];
              return (
                <Card C={C} key={i} className="overflow-hidden" style={{ borderLeft: `4px solid ${accent}` }}>
                  <button onClick={() => toggleFiche(cle)} className="w-full text-left p-4 flex items-center justify-between gap-3">
                    <span className="text-lg font-extrabold" style={{ color: C.ink }}>{f.titre}</span>
                    <ChevronRight size={18} style={{ color: C.slate, flexShrink: 0, transform: estOuverte ? "rotate(90deg)" : "none", transition: "transform 0.15s" }} />
                  </button>
                  {estOuverte && (
                    <div className="px-4 pb-4">
                      <FicheBody C={C} fiche={f} accent={accent} masquerTitre />
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function ArticlesLoi({ C }) {
  const codesDisponibles = [...new Set(ARTICLES_LOI.map((a) => a.code))];
  const [filtre, setFiltre] = useState("Tous");
  const [recherche, setRecherche] = useState("");

  const parCode = filtre === "Tous" ? ARTICLES_LOI : ARTICLES_LOI.filter((a) => a.code === filtre);
  const rechercheNorm = normaliserTexte(recherche.trim());
  const articles = rechercheNorm
    ? parCode.filter((a) => normaliserTexte(a.titre + " " + a.reference + " " + a.resume).includes(rechercheNorm))
    : parCode;

  const compteParCode = codesDisponibles.map((code) => ({
    code,
    n: ARTICLES_LOI.filter((a) => a.code === code).length,
  }));

  return (
    <div>
      <Eyebrow C={C}>{ARTICLES_LOI.length} articles — classés par code</Eyebrow>
      <SectionTitle C={C}>Articles de loi</SectionTitle>

      <div className="max-w-2xl mb-4">
        <SearchInput C={C} value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un article, un mot-clé…" />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setFiltre("Tous")} className="text-xs px-3 py-1.5 rounded-full font-semibold"
          style={{ border: `1px solid ${filtre === "Tous" ? C.navy : C.line}`, background: filtre === "Tous" ? C.navy : "transparent", color: filtre === "Tous" ? "#fff" : C.ink }}>
          Tous ({ARTICLES_LOI.length})
        </button>
        {compteParCode.map(({ code, n }) => {
          const active = filtre === code;
          return (
            <button key={code} onClick={() => setFiltre(code)} className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={{ border: `1px solid ${active ? C.navy : C.line}`, background: active ? C.navy : "transparent", color: active ? "#fff" : C.ink }}>
              {code} ({n})
            </button>
          );
        })}
      </div>

      {articles.length === 0 ? (
        <div className="text-sm" style={{ color: C.slate }}>Aucun article ne correspond à cette recherche.</div>
      ) : (
        <div className="flex flex-col gap-3 max-w-2xl">
          {articles.map((a, i) => (
            <Card C={C} key={i} className="p-4">
              <div className="flex items-center gap-2 mb-1">
                <Scale size={14} style={{ color: C.gold }} />
                <span className="font-bold text-sm" style={{ color: C.ink }}>{a.reference}</span>
              </div>
              <div className="text-xs font-semibold mb-2" style={{ color: C.gold }}>{a.titre}</div>
              <div className="text-sm leading-relaxed" style={{ color: C.slate }}>{renderEmphasis(a.resume, C.gold)}</div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}


function normaliserTexte(s) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function evaluerReponseAuto(texte, motsCles) {
  const norm = normaliserTexte(texte || "");
  if (norm.trim().length < 15) return false;
  const trouves = motsCles.filter((k) => norm.includes(normaliserTexte(k)));
  return trouves.length >= Math.ceil(motsCles.length / 2);
}

function validerEtapeCanevas(texte, motsCles) {
  const norm = normaliserTexte(texte || "");
  const trouves = motsCles.filter((k) => norm.includes(normaliserTexte(k)));
  const manquants = motsCles.filter((k) => !norm.includes(normaliserTexte(k)));
  const seuil = Math.ceil(motsCles.length / 2);
  const longueurSuffisante = norm.trim().length >= 15;
  const valide = longueurSuffisante && trouves.length >= seuil;
  return { valide, trouves, manquants, longueurSuffisante };
}

const TAILLE_SESSION_EXAMEN = 25;

function tirerSessionExamen(pool, taille = TAILLE_SESSION_EXAMEN) {
  const melange = [...pool];
  for (let i = melange.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [melange[i], melange[j]] = [melange[j], melange[i]];
  }
  return melange.slice(0, taille);
}

function ExamensBlancs({ C, onExamEnCoursChange, onDemanderConfirmation }) {
  const [mode, setMode] = useState("qcm");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reponse, setReponse] = useState("");
  const [verifie, setVerifie] = useState(false);
  const [corrigeVisible, setCorrigeVisible] = useState(false);
  const [bilan, setBilan] = useState({ bien: 0, revoir: 0 });
  const [termine, setTermine] = useState(false);
  const [matieresSelectionnees, setMatieresSelectionnees] = useState(MATIERES.map((m) => m.nom));
  const [selecteurOuvert, setSelecteurOuvert] = useState(true);
  const [qcmActif, setQcmActif] = useState(false);
  const [audioActif, setAudioActif] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);

  const questionsRedigeesFiltrees = QUESTIONS_REDIGEES.filter((q) => matieresSelectionnees.includes(q.matiere));
  const qcmFiltre = QCM_QUESTIONS.filter((q) => matieresSelectionnees.includes(q.matiere));
  const question = sessionQuestions[index];
  const estCorrecteAuto = verifie && question ? evaluerReponseAuto(reponse, question.motsCles) : null;
  const sessionEnCours = mode === "redaction" && started && !termine;

  useEffect(() => {
    if (onExamEnCoursChange) onExamEnCoursChange(sessionEnCours || qcmActif || audioActif);
  }, [sessionEnCours, qcmActif, audioActif]);

  useEffect(() => {
    return () => {
      if (onExamEnCoursChange) onExamEnCoursChange(false);
    };
  }, []);


  const toggleMatiere = (nom) => {
    setMatieresSelectionnees((prev) => (prev.includes(nom) ? prev.filter((m) => m !== nom) : [...prev, nom]));
  };

  const demarrer = () => {
    setSessionQuestions(tirerSessionExamen(questionsRedigeesFiltrees));
    setStarted(true);
    setIndex(0);
    setReponse("");
    setVerifie(false);
    setCorrigeVisible(false);
    setBilan({ bien: 0, revoir: 0 });
    setTermine(false);
  };

  const verifier = () => {
    setVerifie(true);
  };

  const noter = (ok) => {
    setBilan((b) => ({ ...b, [ok ? "bien" : "revoir"]: b[ok ? "bien" : "revoir"] + 1 }));
    if (index + 1 < sessionQuestions.length) {
      setIndex((i) => i + 1);
      setReponse("");
      setVerifie(false);
      setCorrigeVisible(false);
    } else {
      setTermine(true);
    }
  };

  const uneSessionEstActive = sessionEnCours || qcmActif || audioActif;

  const changerMode = (nouveauMode) => {
    if (!uneSessionEstActive) {
      setMode(nouveauMode);
      setStarted(false);
      return;
    }
    onDemanderConfirmation(
      "Une session est en cours dans cet onglet. Changer d'onglet abandonnera ta progression actuelle. Continuer ?",
      () => { setMode(nouveauMode); setStarted(false); },
      "Changer d'onglet"
    );
  };

  const quitterSession = () => {
    if (!sessionEnCours) {
      setStarted(false);
      return;
    }
    onDemanderConfirmation(
      "Abandonner cette session en cours ? Ta progression sur cette question sera perdue.",
      () => setStarted(false),
      "Arrêter la session"
    );
  };

  const changerCoursSelectionnes = (action) => {
    if (!uneSessionEstActive) {
      action();
      return;
    }
    onDemanderConfirmation(
      "Changer les cours sélectionnés pendant une session en cours va la réinitialiser. Continuer ?",
      () => { setStarted(false); action(); },
      "Réinitialiser"
    );
  };

  const SelecteurCours = (
    <Card C={C} className="p-4 mb-5 max-w-2xl" style={{ borderColor: C.gold }}>
      <button onClick={() => setSelecteurOuvert((v) => !v)} className="w-full flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 text-left">
          <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: `${C.gold}20`, color: C.gold }}>
            <SlidersHorizontal size={15} />
          </span>
          <div>
            <div className="text-sm font-bold" style={{ color: C.ink }}>
              Cours inclus dans l'examen
            </div>
            <div className="text-xs" style={{ color: C.slate }}>
              {matieresSelectionnees.length}/{MATIERES.length} matière{matieresSelectionnees.length > 1 ? "s" : ""} sélectionnée{matieresSelectionnees.length > 1 ? "s" : ""} — clique pour {selecteurOuvert ? "réduire" : "choisir"}
            </div>
          </div>
        </div>
        <span className="flex-shrink-0" style={{ color: C.gold }}>
          {selecteurOuvert ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </span>
      </button>
      {selecteurOuvert && (
        <div className="mt-4">
          <div className="text-xs mb-3" style={{ color: C.slate }}>
            Décoche les matières que tu ne veux pas réviser dans cette session — le tirage des questions se fera uniquement parmi celles cochées.
          </div>
          <div className="flex gap-2 mb-3">
            <button onClick={() => changerCoursSelectionnes(() => setMatieresSelectionnees(MATIERES.map((m) => m.nom)))} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
              Tout sélectionner
            </button>
            <button onClick={() => changerCoursSelectionnes(() => setMatieresSelectionnees([]))} className="text-xs px-3 py-1.5 rounded-full font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
              Tout désélectionner
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {MATIERES.map((m) => {
              const active = matieresSelectionnees.includes(m.nom);
              return (
                <button key={m.nom} onClick={() => changerCoursSelectionnes(() => toggleMatiere(m.nom))} className="flex items-center gap-2 text-left px-3 py-2 rounded-md text-sm"
                  style={{ border: `1px solid ${active ? colorFor(C, m.couleur) : C.line}`, background: active ? `${colorFor(C, m.couleur)}12` : "transparent" }}>
                  <span className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ border: `1.5px solid ${active ? colorFor(C, m.couleur) : C.slate}`, background: active ? colorFor(C, m.couleur) : "transparent" }}>
                    {active && <Check size={11} color="#fff" />}
                  </span>
                  <span style={{ color: C.ink }}>{m.nom}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
        <div>
          <Eyebrow C={C}>Conditions réelles</Eyebrow>
          <SectionTitle C={C}>Examens blancs</SectionTitle>
        </div>
        <div className="flex gap-2">
          {[{ id: "qcm", label: "QCM" }, { id: "redaction", label: "Questions rédigées" }, { id: "audio", label: "Mode audio (train/voiture)" }].map((m) => {
            const active = mode === m.id;
            return (
              <button key={m.id} onClick={() => changerMode(m.id)} className="text-sm px-4 py-2 rounded-md font-semibold"
                style={{ border: `1px solid ${active ? C.navy : C.line}`, background: active ? C.navy : "transparent", color: active ? "#fff" : C.slate }}>
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {SelecteurCours}

      {matieresSelectionnees.length === 0 ? (
        <Card C={C} className="p-6 max-w-xl">
          <div className="text-sm" style={{ color: C.slate }}>Sélectionne au moins un cours ci-dessus pour démarrer une session.</div>
        </Card>
      ) : (
        <>
          {mode === "qcm" && <QCMExamen C={C} questions={qcmFiltre} onActifChange={setQcmActif} onDemanderConfirmation={onDemanderConfirmation} />}

          {mode === "redaction" && !started && (
            <Card C={C} className="p-6 max-w-xl">
              <div className="font-bold mb-2" style={{ color: C.ink }}>Questions rédigées — {Math.min(TAILLE_SESSION_EXAMEN, questionsRedigeesFiltrees.length)} questions</div>
              <div className="text-sm mb-4" style={{ color: C.slate }}>
                Pas de choix multiple : tu écris ta réponse toi-même, puis tu la compares à la correction pour t'auto-évaluer.
              </div>
              <button onClick={demarrer} disabled={questionsRedigeesFiltrees.length === 0} className="px-4 py-2 rounded-md text-sm font-semibold"
                style={{ background: questionsRedigeesFiltrees.length === 0 ? C.line : C.navy, color: questionsRedigeesFiltrees.length === 0 ? C.slate : "#fff" }}>
                {questionsRedigeesFiltrees.length === 0 ? "Aucune question pour ces cours" : "Démarrer la session"}
              </button>
            </Card>
          )}

          {mode === "redaction" && started && !termine && question && (
            <Card C={C} className="p-6 max-w-2xl">
              <button onClick={quitterSession} className="text-xs font-semibold flex items-center gap-1 mb-4" style={{ color: C.red }}>
                <X size={14} /> Arrêter la session
              </button>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>{question.matiere}</span>
                <span className="text-xs" style={{ color: C.slate }}>{index + 1} / {sessionQuestions.length}</span>
              </div>
              <div className="font-bold text-lg mb-4" style={{ color: C.ink }}>{question.question}</div>

              <textarea
                value={reponse}
                onChange={(e) => { setReponse(e.target.value); setVerifie(false); }}
                placeholder="Écris ta réponse ici…"
                rows={5}
                className="w-full px-3 py-2.5 rounded-md text-sm outline-none resize-none mb-2"
                style={{
                  border: `2px solid ${verifie ? (estCorrecteAuto ? C.green : C.red) : C.line}`,
                  background: C.bg,
                  color: C.ink,
                }}
              />

              {verifie && (
                <div className="text-xs font-bold mb-4" style={{ color: estCorrecteAuto ? C.green : C.red }}>
                  {estCorrecteAuto ? "✓ Détection auto : réponse plutôt bonne" : "✗ Détection auto : il manque des éléments importants"}
                  <span className="font-normal" style={{ color: C.slate }}> — détection approximative par mots-clés, vérifie toujours avec la correction complète.</span>
                </div>
              )}

              {!verifie ? (
                <button onClick={verifier} disabled={reponse.trim().length === 0} className="px-4 py-2 rounded-md text-sm font-semibold"
                  style={{ background: reponse.trim().length === 0 ? C.line : C.navy, color: reponse.trim().length === 0 ? C.slate : "#fff" }}>
                  Vérifier ma réponse
                </button>
              ) : !corrigeVisible ? (
                <button onClick={() => setCorrigeVisible(true)} className="px-4 py-2 rounded-md text-sm font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
                  Voir la correction complète
                </button>
              ) : (
                <>
                  <div className="p-4 rounded-md mb-4" style={{ background: `${C.gold}12`, border: `1px solid ${C.line}` }}>
                    <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.gold }}>Correction</div>
                    <div className="text-sm leading-relaxed" style={{ color: C.ink }}>{question.reponse}</div>
                  </div>
                  <div className="flex gap-3 flex-wrap">
                    <button onClick={() => noter(true)} className="px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2" style={{ background: C.navy, color: "#fff" }}>
                      <Check size={14} /> J'ai bien répondu
                    </button>
                    <button onClick={() => noter(false)} className="px-4 py-2 rounded-md text-sm font-semibold" style={{ border: `1px solid ${C.red}`, color: C.red }}>
                      À revoir
                    </button>
                  </div>
                </>
              )}
            </Card>
          )}

          {mode === "redaction" && termine && (
            <Card C={C} className="p-6 max-w-xl text-center">
              <div className="font-bold text-lg mb-2" style={{ color: C.ink }}>Session terminée</div>
              <div className="text-sm mb-5" style={{ color: C.slate }}>
                {bilan.bien} bonne(s) réponse(s) sur {sessionQuestions.length}, {bilan.revoir} à revoir.
              </div>
              <button onClick={demarrer} className="px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 mx-auto" style={{ background: C.navy, color: "#fff" }}>
                <RotateCcw size={14} /> Recommencer
              </button>
            </Card>
          )}

          {mode === "audio" && <ModeAudio C={C} questions={questionsRedigeesFiltrees} onActifChange={setAudioActif} onDemanderConfirmation={onDemanderConfirmation} />}
        </>
      )}
    </div>
  );
}

function QCMExamen({ C, questions, onActifChange, onDemanderConfirmation }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState([]);
  const [valide, setValide] = useState(false);
  const [score, setScore] = useState(0);
  const [termine, setTermine] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);

  useEffect(() => {
    if (onActifChange) onActifChange(started && !termine);
  }, [started, termine]);

  const question = sessionQuestions[index];
  const estMultiple = question ? Array.isArray(question.correct) : false;
  const reponsesCorrectes = question ? (estMultiple ? question.correct : [question.correct]) : [];

  const demarrer = () => {
    setSessionQuestions(tirerSessionExamen(questions));
    setStarted(true);
    setIndex(0);
    setSelection([]);
    setValide(false);
    setScore(0);
    setTermine(false);
  };

  const choisir = (i) => {
    if (valide) return;
    if (estMultiple) {
      setSelection((s) => (s.includes(i) ? s.filter((x) => x !== i) : [...s, i]));
    } else {
      setSelection([i]);
    }
  };

  const valider = () => {
    if (selection.length === 0 || valide) return;
    setValide(true);
    const estCorrecte =
      selection.length === reponsesCorrectes.length &&
      selection.every((s) => reponsesCorrectes.includes(s));
    if (estCorrecte) setScore((s) => s + 1);
  };

  const suivant = () => {
    if (index + 1 < sessionQuestions.length) {
      setIndex((i) => i + 1);
      setSelection([]);
      setValide(false);
    } else {
      setTermine(true);
    }
  };

  if (!started) {
    return (
      <Card C={C} className="p-6 max-w-xl">
        <div className="font-bold mb-2" style={{ color: C.ink }}>QCM — {Math.min(TAILLE_SESSION_EXAMEN, questions.length)} questions</div>
        <div className="text-sm mb-4" style={{ color: C.slate }}>
          Selon les cours sélectionnés ci-dessus, sans chrono. Sélectionne une réponse puis valide-la pour éviter les clics involontaires.
        </div>
        <button onClick={demarrer} disabled={questions.length === 0} className="px-4 py-2 rounded-md text-sm font-semibold"
          style={{ background: questions.length === 0 ? C.line : C.navy, color: questions.length === 0 ? C.slate : "#fff" }}>
          {questions.length === 0 ? "Aucune question pour ces cours" : "Démarrer la session"}
        </button>
      </Card>
    );
  }

  if (termine) {
    return (
      <Card C={C} className="p-6 max-w-xl text-center">
        <div className="font-bold text-lg mb-2" style={{ color: C.ink }}>Session terminée</div>
        <div className="text-sm mb-5" style={{ color: C.slate }}>
          {score} bonne(s) réponse(s) sur {sessionQuestions.length}.
        </div>
        <button onClick={demarrer} className="px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 mx-auto" style={{ background: C.navy, color: "#fff" }}>
          <RotateCcw size={14} /> Recommencer
        </button>
      </Card>
    );
  }

  const quitterSession = () => {
    onDemanderConfirmation(
      "Abandonner cette session QCM en cours ? Ta progression sera perdue.",
      () => setStarted(false),
      "Arrêter la session"
    );
  };

  return (
    <Card C={C} className="p-6 max-w-2xl">
      <button onClick={quitterSession} className="text-xs font-semibold flex items-center gap-1 mb-4" style={{ color: C.red }}>
        <X size={14} /> Arrêter la session
      </button>

      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>{question.matiere}</span>
        <span className="text-xs" style={{ color: C.slate }}>{index + 1} / {sessionQuestions.length}</span>
      </div>

      <div className="font-bold text-lg mb-2" style={{ color: C.ink }}>{question.question}</div>
      {estMultiple && (
        <div className="text-xs font-semibold mb-3" style={{ color: C.gold }}>
          Plusieurs réponses sont possibles ({reponsesCorrectes.length} attendues).
        </div>
      )}

      <div className="flex flex-col gap-2 mb-4">
        {question.options.map((opt, i) => {
          const estCorrecte = reponsesCorrectes.includes(i);
          const estSelectionnee = selection.includes(i);
          let bg = "transparent";
          let border = C.line;
          if (valide) {
            if (estCorrecte) { bg = `${C.green}20`; border = C.green; }
            else if (estSelectionnee) { bg = `${C.red}15`; border = C.red; }
          } else if (estSelectionnee) {
            bg = `${C.navy}10`;
            border = C.navy;
          }
          return (
            <button
              key={i}
              onClick={() => choisir(i)}
              className="text-left px-4 py-3 rounded-md text-sm flex items-center gap-3"
              style={{ border: `1px solid ${border}`, background: bg, color: C.ink, cursor: valide ? "default" : "pointer" }}
            >
              {estMultiple && (
                <span
                  className="flex-shrink-0 w-4 h-4 rounded flex items-center justify-center"
                  style={{ border: `1.5px solid ${estSelectionnee || (valide && estCorrecte) ? (valide ? (estCorrecte ? C.green : C.red) : C.navy) : C.slate}`, background: estSelectionnee ? (valide ? (estCorrecte ? C.green : C.red) : C.navy) : "transparent" }}
                >
                  {estSelectionnee && <Check size={11} color="#fff" />}
                </span>
              )}
              {opt}
            </button>
          );
        })}
      </div>

      {valide && question.explication && (
        <div className="p-4 rounded-md mb-4" style={{ background: `${C.gold}12`, border: `1px solid ${C.line}` }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.gold }}>Point clé</div>
          <div className="text-sm leading-relaxed" style={{ color: C.ink }}>{question.explication}</div>
        </div>
      )}

      {!valide ? (
        <button
          onClick={valider}
          disabled={selection.length === 0}
          className="px-4 py-2 rounded-md text-sm font-semibold"
          style={{ background: selection.length === 0 ? C.line : C.navy, color: selection.length === 0 ? C.slate : "#fff" }}
        >
          Valider ma réponse
        </button>
      ) : (
        <button onClick={suivant} className="px-4 py-2 rounded-md text-sm font-semibold" style={{ background: C.navy, color: "#fff" }}>
          {index + 1 < sessionQuestions.length ? "Question suivante →" : "Voir le résultat"}
        </button>
      )}
    </Card>
  );
}

function ModeAudio({ C, questions, onActifChange, onDemanderConfirmation }) {
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [reponseVisible, setReponseVisible] = useState(false);
  const [bilan, setBilan] = useState({ bien: 0, revoir: 0 });
  const [termine, setTermine] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [sessionQuestions, setSessionQuestions] = useState([]);
  const supported = typeof window !== "undefined" && "speechSynthesis" in window;

  useEffect(() => {
    if (onActifChange) onActifChange(started && !termine);
  }, [started, termine]);

  const question = sessionQuestions[index];

  const parler = (texte) => {
    if (!supported) return;
    try {
      window.speechSynthesis.cancel();
      const utt = new window.SpeechSynthesisUtterance(texte);
      utt.lang = "fr-FR";
      utt.rate = 0.95;
      utt.onstart = () => setSpeaking(true);
      utt.onend = () => setSpeaking(false);
      window.speechSynthesis.speak(utt);
    } catch (e) {
      console.error("Synthèse vocale indisponible", e);
    }
  };

  const demarrer = () => {
    const tirage = tirerSessionExamen(questions);
    setSessionQuestions(tirage);
    setStarted(true);
    setIndex(0);
    setReponseVisible(false);
    setBilan({ bien: 0, revoir: 0 });
    setTermine(false);
    setTimeout(() => parler(tirage[0].question), 300);
  };

  const rejouerQuestion = () => parler(question.question);
  const ecouterReponse = () => {
    setReponseVisible(true);
    parler(question.reponse);
  };

  const noter = (ok) => {
    setBilan((b) => ({ ...b, [ok ? "bien" : "revoir"]: b[ok ? "bien" : "revoir"] + 1 }));
    if (index + 1 < sessionQuestions.length) {
      const next = index + 1;
      setIndex(next);
      setReponseVisible(false);
      setTimeout(() => parler(sessionQuestions[next].question), 300);
    } else {
      window.speechSynthesis?.cancel();
      setTermine(true);
    }
  };

  if (!supported) {
    return (
      <Card C={C} className="p-6 max-w-xl">
        <div className="font-bold mb-2" style={{ color: C.ink }}>Synthèse vocale indisponible</div>
        <div className="text-sm" style={{ color: C.slate }}>
          Cet appareil ou ce navigateur ne prend pas en charge la lecture audio. Essaie plutôt le mode "Questions rédigées".
        </div>
      </Card>
    );
  }

  if (!started) {
    return (
      <Card C={C} className="p-6 max-w-xl">
        <div className="font-bold mb-2" style={{ color: C.ink }}>Mode audio — {Math.min(TAILLE_SESSION_EXAMEN, questions.length)} questions</div>
        <div className="text-sm mb-2" style={{ color: C.slate }}>
          La question est lue à voix haute. Réponds à voix haute toi-même, puis écoute la correction pour t'auto-évaluer. Idéal en train ou en tant que passager en voiture.
        </div>
        <div className="text-xs mb-4" style={{ color: C.gold }}>
          Au volant, ne manipule pas l'écran : fais-toi passer les questions par un passager, ou utilise ce mode à l'arrêt.
        </div>
        <button onClick={demarrer} disabled={questions.length === 0} className="px-4 py-2 rounded-md text-sm font-semibold"
          style={{ background: questions.length === 0 ? C.line : C.navy, color: questions.length === 0 ? C.slate : "#fff" }}>
          {questions.length === 0 ? "Aucune question pour ces cours" : "Démarrer la session audio"}
        </button>
      </Card>
    );
  }

  if (termine) {
    return (
      <Card C={C} className="p-6 max-w-xl text-center">
        <div className="font-bold text-lg mb-2" style={{ color: C.ink }}>Session terminée</div>
        <div className="text-sm mb-5" style={{ color: C.slate }}>
          {bilan.bien} bonne(s) réponse(s) sur {sessionQuestions.length}, {bilan.revoir} à revoir.
        </div>
        <button onClick={demarrer} className="px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2 mx-auto" style={{ background: C.navy, color: "#fff" }}>
          <RotateCcw size={14} /> Recommencer
        </button>
      </Card>
    );
  }

  return (
    <Card C={C} className="p-6 max-w-2xl">
      <button
        onClick={() => {
          onDemanderConfirmation(
            "Abandonner cette session audio en cours ? Ta progression sera perdue.",
            () => { window.speechSynthesis?.cancel(); setStarted(false); },
            "Arrêter la session"
          );
        }}
        className="text-xs font-semibold flex items-center gap-1 mb-4"
        style={{ color: C.red }}
      >
        <X size={14} /> Arrêter la session
      </button>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>{question.matiere}</span>
        <span className="text-xs" style={{ color: C.slate }}>{index + 1} / {sessionQuestions.length}</span>
      </div>

      <div className="flex flex-col items-center text-center py-6">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: speaking ? C.gold : C.navy, transition: "background 0.2s" }}
        >
          <Volume2 size={26} color="#fff" />
        </div>
        <div className="text-sm mb-1" style={{ color: C.slate }}>{speaking ? "Lecture en cours…" : "Question posée à voix haute"}</div>
        <button onClick={rejouerQuestion} className="text-xs px-3 py-1.5 rounded-md font-semibold mt-2" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
          Réécouter la question
        </button>
      </div>

      <div className="text-xs text-center mb-5" style={{ color: C.slate }}>
        Réponds à voix haute, puis écoute la correction pour comparer.
      </div>

      {!reponseVisible ? (
        <button onClick={ecouterReponse} className="w-full py-3 rounded-md text-sm font-semibold flex items-center justify-center gap-2" style={{ background: C.navy, color: "#fff" }}>
          <Volume2 size={16} /> Écouter la correction
        </button>
      ) : (
        <>
          <div className="p-4 rounded-md mb-4" style={{ background: `${C.gold}12`, border: `1px solid ${C.line}` }}>
            <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.gold }}>Correction</div>
            <div className="text-sm leading-relaxed" style={{ color: C.ink }}>{question.reponse}</div>
          </div>
          <div className="flex gap-3 flex-wrap">
            <button onClick={() => noter(true)} className="px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2" style={{ background: C.navy, color: "#fff" }}>
              <Check size={14} /> J'ai bien répondu
            </button>
            <button onClick={() => noter(false)} className="px-4 py-2 rounded-md text-sm font-semibold" style={{ border: `1px solid ${C.red}`, color: C.red }}>
              À revoir
            </button>
          </div>
        </>
      )}
    </Card>
  );
}

function FacsimilePV({ C, exemple, canevas }) {
  return (
    <div className="rounded-lg overflow-hidden" style={{ border: `2px solid ${C.navy}`, background: "#FEFDF8" }}>
      {/* En-tête officiel */}
      <div className="p-5 text-center" style={{ borderBottom: `2px solid ${C.gold}`, background: C.navy }}>
        <div className="text-xs font-bold tracking-widest" style={{ color: C.goldSoft || C.gold }}>RÉPUBLIQUE FRANÇAISE</div>
        <div className="text-[11px] mt-1" style={{ color: "#fff" }}>MINISTÈRE DE L'INTÉRIEUR</div>
        <div className="text-[11px]" style={{ color: "#fff" }}>DIRECTION GÉNÉRALE DE LA POLICE NATIONALE</div>
        <div className="text-lg font-extrabold uppercase tracking-wide mt-3" style={{ color: "#fff" }}>Procès-verbal</div>
        {exemple.entete && <div className="text-[11px] mt-2 italic" style={{ color: C.goldSoft || C.gold }}>{exemple.entete}</div>}
      </div>

      {/* Bloc identité rédacteur */}
      <div className="px-5 py-3 text-xs" style={{ background: `${C.gold}10`, borderBottom: `1px solid ${C.line}`, color: C.slate }}>
        L'an deux mille…, le … à … heure — Nous, Prénom NOM, Grade, en fonction à (service), AGENT DE POLICE JUDICIAIRE en résidence à (ville).
      </div>

      {/* Corps numéroté */}
      <div className="p-5 flex flex-col gap-4">
        {exemple.corps.map((partie, i) => (
          <div key={i} className="flex gap-3">
            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold" style={{ background: C.gold, color: C.navy }}>
              {partie.n}
            </div>
            <div className="flex-1 pt-1">
              {partie.marge && (
                <div className="text-[10px] font-bold uppercase tracking-wide mb-1" style={{ color: C.red }}>{partie.marge}</div>
              )}
              {partie.texteLibre ? (
                <div className="text-sm leading-relaxed" style={{ color: C.slate }}>{partie.texteLibre}</div>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {partie.phrases.map((phrase, j) => (
                    <div key={j} className="text-sm leading-relaxed italic pl-3" style={{ color: C.ink, borderLeft: `2px solid ${C.line}` }}>
                      « {phrase} »
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Pied de page signatures */}
      <div className="px-5 py-3 text-xs flex justify-between" style={{ borderTop: `1px solid ${C.line}`, color: C.slate }}>
        <span>(signature de l'intéressé)</span>
        <span>(signature de l'A.P.J.)</span>
      </div>
    </div>
  );
}

function ExemplePV({ C }) {
  const [theme, setTheme] = useState(null);
  const [recherche, setRecherche] = useState("");

  if (!theme) {
    const exemplesFiltres = EXEMPLES_PV.filter((ex) => normaliserTexte(ex.theme).includes(normaliserTexte(recherche.trim())));
    return (
      <div>
        <Eyebrow C={C}>Modèles complets — recueil officiel de PV</Eyebrow>
        <SectionTitle C={C}>Exemple PV</SectionTitle>
        <div className="text-sm mb-5 px-4 py-3 rounded-md max-w-2xl" style={{ background: `${C.gold}12`, color: C.slate, border: `1px solid ${C.line}` }}>
          Le texte intégral d'un procès-verbal type, tel qu'il apparaît dans le recueil officiel — en-tête réglementaire, numérotation en marge, formules imposées. Idéal pour visualiser la forme finale avant de s'entraîner dans "Entraînement PV".
        </div>
        <div className="max-w-2xl mb-4">
          <SearchInput C={C} value={recherche} onChange={(e) => setRecherche(e.target.value)} placeholder="Rechercher un type de PV…" />
        </div>
        {exemplesFiltres.length === 0 ? (
          <div className="text-sm" style={{ color: C.slate }}>Aucun type de PV ne correspond à cette recherche.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {exemplesFiltres.map((ex) => {
              const canevas = CANEVAS_PV.find((c) => c.theme === ex.theme);
              return (
                <Card key={ex.theme} C={C} onClick={() => setTheme(ex.theme)} className="p-4 flex items-center justify-between cursor-pointer">
                  <div>
                    <span className="text-sm font-semibold" style={{ color: C.ink }}>{ex.theme}</span>
                    <div className="text-xs mt-0.5" style={{ color: C.slate }}>{ex.corps.length} parties {canevas ? `— ${canevas.etapes.length} étapes` : ""}</div>
                  </div>
                  <ChevronRight size={16} style={{ color: C.slate }} />
                </Card>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  const exemple = EXEMPLES_PV.find((e) => e.theme === theme);
  const canevas = CANEVAS_PV.find((c) => c.theme === theme);

  return (
    <div>
      <BackButton C={C} onClick={() => setTheme(null)} label="Choisir un autre exemple" />
      <Eyebrow C={C}>Modèle complet</Eyebrow>
      <SectionTitle C={C}>{theme}</SectionTitle>
      {canevas?.reference && <div className="text-xs mb-5" style={{ color: C.slate }}>{canevas.reference}</div>}

      <div className="max-w-2xl">
        <FacsimilePV C={C} exemple={exemple} canevas={canevas} />

        {canevas && (
          <Card C={C} className="p-4 mt-4">
            <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.gold }}>Rappel des étapes du canevas</div>
            <div className="flex flex-col gap-2">
              {canevas.etapes.map((etape) => (
                <div key={etape.titre} className="text-xs">
                  <span className="font-semibold" style={{ color: C.ink }}>{etape.titre}</span>
                  <span style={{ color: C.slate }}> — {etape.aide}</span>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

function reponseModelePourEtape(theme, etapeTitre) {
  const exemple = EXEMPLES_PV.find((e) => e.theme === theme);
  if (!exemple || !etapeTitre) return null;
  const m = etapeTitre.match(/^(\d+)/);
  if (!m) return null;
  const num = m[1];
  const parties = exemple.corps.filter((p) => p.n.split(/[-–]/).map((s) => s.trim()).includes(num));
  return parties.length ? parties : null;
}

function ReponseModele({ C, parties, titre = "Réponse à écrire (modèle du recueil de PV)" }) {
  if (!parties) return null;
  return (
    <div className="mt-3 p-3 rounded-md" style={{ background: `${C.navy}08`, border: `1px solid ${C.line}` }}>
      <div className="text-[10px] font-bold uppercase tracking-wide mb-2" style={{ color: C.navy === "#0A1120" ? "#8FA3D6" : C.navy }}>{titre}</div>
      {parties.map((p, i) => (
        <div key={i} className="mb-2 last:mb-0">
          {p.marge && <div className="text-[10px] font-bold uppercase mb-0.5" style={{ color: C.red }}>{p.marge}</div>}
          {p.texteLibre ? (
            <div className="text-xs leading-relaxed" style={{ color: C.slate }}>{p.texteLibre}</div>
          ) : (
            <div className="flex flex-col gap-1">
              {p.phrases.map((phrase, j) => (
                <div key={j} className="text-xs italic leading-relaxed" style={{ color: C.ink }}>« {phrase} »</div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function EntrainementPV({ C }) {
  const [theme, setTheme] = useState(null);
  const [niveau, setNiveau] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [reponsesGuide, setReponsesGuide] = useState({});
  const [feedbackGuide, setFeedbackGuide] = useState({});
  const [texteLibre, setTexteLibre] = useState("");
  const [checklistOuverte, setChecklistOuverte] = useState(false);
  const [reponsesReveleesAssiste, setReponsesReveleesAssiste] = useState({});
  const [correctionVisible, setCorrectionVisible] = useState(false);
  const [rechercheTheme, setRechercheTheme] = useState("");

  const canevasActif = CANEVAS_PV.find((c) => c.theme === theme);
  const etapes = canevasActif ? canevasActif.etapes : [];
  const etapeActuelle = etapes[stepIndex];
  const reponseActuelle = etapeActuelle ? (reponsesGuide[etapeActuelle.titre] || "") : "";
  const feedbackActuel = etapeActuelle ? feedbackGuide[etapeActuelle.titre] : null;

  const reset = () => {
    setTheme(null);
    setNiveau(null);
    setStepIndex(0);
    setReponsesGuide({});
    setFeedbackGuide({});
    setTexteLibre("");
    setChecklistOuverte(false);
    setReponsesReveleesAssiste({});
    setCorrectionVisible(false);
  };

  const changerTheme = () => {
    setTheme(null);
    setNiveau(null);
  };

  const validerEtape = () => {
    if (!reponseActuelle.trim() || !etapeActuelle) return;
    const motsCles = etapeActuelle.motsCles || [];
    const resultat = validerEtapeCanevas(reponseActuelle, motsCles);
    let feedback;
    if (!resultat.longueurSuffisante) {
      feedback = "Ta réponse est trop courte pour couvrir cette étape — développe un peu plus.";
    } else if (resultat.valide) {
      feedback = resultat.manquants.length === 0
        ? "Tous les éléments attendus par le recueil de PV pour cette étape sont présents."
        : `Les mentions essentielles sont là. Pour être complet, tu peux encore ajouter : ${resultat.manquants.join(", ")}.`;
    } else {
      feedback = `Il manque des mentions attendues par le recueil de PV pour cette étape : ${resultat.manquants.join(", ")}.`;
    }
    setFeedbackGuide((f) => ({ ...f, [etapeActuelle.titre]: { valide: resultat.valide, feedback } }));
  };

  const etapeSuivante = () => {
    if (stepIndex + 1 < etapes.length) {
      setStepIndex((i) => i + 1);
    } else {
      setStepIndex(etapes.length); // état "terminé" — au-delà de la dernière étape
    }
  };

  const etapePrecedente = () => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
    }
  };

  // ---- Étape 1 : choix du thème ----
  if (!theme) {
    const themesFiltres = CANEVAS_PV.filter((c) => normaliserTexte(c.theme).includes(normaliserTexte(rechercheTheme.trim())));
    return (
      <div>
        <Eyebrow C={C}>Rédaction — canevas réels du recueil de PV</Eyebrow>
        <SectionTitle C={C}>Entraînement PV</SectionTitle>
        <div className="text-sm mb-5 px-4 py-3 rounded-md max-w-2xl" style={{ background: `${C.gold}12`, color: C.slate, border: `1px solid ${C.line}` }}>
          Chaque type d'acte a sa propre structure exacte, extraite du recueil officiel de procès-verbaux — les PV sont des documents hyper-formalisés, chaque étape compte.
        </div>
        <div className="max-w-2xl mb-4">
          <SearchInput C={C} value={rechercheTheme} onChange={(e) => setRechercheTheme(e.target.value)} placeholder="Rechercher un type de PV…" />
        </div>
        {themesFiltres.length === 0 ? (
          <div className="text-sm" style={{ color: C.slate }}>Aucun type de PV ne correspond à cette recherche.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl">
            {themesFiltres.map((c) => (
              <Card key={c.theme} C={C} onClick={() => setTheme(c.theme)} className="p-4 flex items-center justify-between cursor-pointer">
                <div>
                  <span className="text-sm font-semibold" style={{ color: C.ink }}>{c.theme}</span>
                  <div className="text-xs mt-0.5" style={{ color: C.slate }}>{c.etapes.length} étapes</div>
                </div>
                <ChevronRight size={16} style={{ color: C.slate }} />
              </Card>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ---- Étape 2 : choix du niveau ----
  if (!niveau) {
    return (
      <div>
        <BackButton C={C} onClick={changerTheme} label="Changer de thème" />
        <Eyebrow C={C}>{theme}</Eyebrow>
        <SectionTitle C={C}>Choisis ton niveau d'autonomie</SectionTitle>
        {canevasActif?.reference && (
          <div className="text-xs mb-4" style={{ color: C.slate }}>{canevasActif.reference}</div>
        )}
        <div className="flex flex-col gap-3 max-w-2xl">
          {NIVEAUX_PV.map((n) => (
            <Card key={n.id} C={C} onClick={() => setNiveau(n.id)} className="p-4 cursor-pointer">
              <div className="font-bold mb-1" style={{ color: C.ink }}>{n.titre}</div>
              <div className="text-sm" style={{ color: C.slate }}>{n.description}</div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // ---- Étape 3 : rédaction ----
  return (
    <div>
      <BackButton C={C} onClick={() => { setNiveau(null); setStepIndex(0); setReponsesGuide({}); setFeedbackGuide({}); setTexteLibre(""); setCorrectionVisible(false); setChecklistOuverte(false); setReponsesReveleesAssiste({}); }} label="Changer de niveau" />
      <div className="flex items-center justify-between mb-6">
        <div>
          <Eyebrow C={C}>{theme} — {NIVEAUX_PV.find((n) => n.id === niveau).titre}</Eyebrow>
          <SectionTitle C={C}>Rédaction du PV</SectionTitle>
        </div>
        <button onClick={reset} className="text-xs font-semibold px-3 py-2 rounded-md" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
          Recommencer
        </button>
      </div>

      {niveau === "guide" && (
        <div className="max-w-2xl">
          {stepIndex < etapes.length ? (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Étape {stepIndex + 1} / {etapes.length}</span>
                <div className="flex gap-1">
                  {etapes.map((et, i) => (
                    <span key={et.titre} className="w-2 h-2 rounded-full" style={{ background: i < stepIndex ? C.gold : i === stepIndex ? C.navy : C.line }} />
                  ))}
                </div>
              </div>
              <Card C={C} className="p-4">
                <div className="font-bold text-base mb-1" style={{ color: C.ink }}>{etapeActuelle.titre}</div>
                <div className="text-xs mb-3" style={{ color: C.gold }}>{etapeActuelle.aide}</div>
                <textarea
                  value={reponseActuelle}
                  onChange={(e) => { setReponsesGuide((r) => ({ ...r, [etapeActuelle.titre]: e.target.value })); }}
                  rows={5}
                  placeholder="Écris cette partie ici…"
                  className="w-full px-3 py-2 rounded-md text-sm outline-none resize-none mb-3"
                  style={{ border: `2px solid ${feedbackActuel ? (feedbackActuel.valide ? C.green : C.red) : C.line}`, background: C.bg, color: C.ink }}
                />

                {feedbackActuel && (
                  <div className="p-3 rounded-md mb-3 flex items-start gap-2" style={{ background: feedbackActuel.valide ? `${C.green}12` : `${C.red}10`, border: `1px solid ${C.line}` }}>
                    <span className="text-xs font-bold flex-shrink-0" style={{ color: feedbackActuel.valide ? C.green : C.red }}>
                      {feedbackActuel.valide ? "✓ Conforme" : "✗ À corriger"}
                    </span>
                    <span className="text-xs" style={{ color: C.ink }}>{feedbackActuel.feedback}</span>
                  </div>
                )}

                {feedbackActuel && (
                  <ReponseModele C={C} parties={reponseModelePourEtape(theme, etapeActuelle.titre)} />
                )}

                <div className="flex gap-2 flex-wrap">
                  <button
                    onClick={validerEtape}
                    disabled={!reponseActuelle.trim()}
                    className="px-4 py-2 rounded-md text-sm font-semibold"
                    style={{ background: !reponseActuelle.trim() ? C.line : C.navy, color: !reponseActuelle.trim() ? C.slate : "#fff" }}
                  >
                    {feedbackActuel ? "Revalider" : "Valider cette étape"}
                  </button>
                  {stepIndex > 0 && (
                    <button onClick={etapePrecedente} className="px-4 py-2 rounded-md text-sm font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
                      ← Étape précédente
                    </button>
                  )}
                  <button onClick={etapeSuivante} disabled={!reponseActuelle.trim()} className="px-4 py-2 rounded-md text-sm font-semibold ml-auto"
                    style={{ border: `1px solid ${!reponseActuelle.trim() ? C.line : C.gold}`, color: !reponseActuelle.trim() ? C.slate : C.gold }}>
                    {stepIndex + 1 < etapes.length ? "Étape suivante →" : "Terminer →"}
                  </button>
                </div>
              </Card>
            </>
          ) : (
            <Card C={C} className="p-5">
              <div className="font-bold text-lg mb-2" style={{ color: C.ink }}>PV terminé</div>
              <div className="text-sm mb-4" style={{ color: C.slate }}>
                {etapes.filter((e) => feedbackGuide[e.titre]?.valide).length} / {etapes.length} étapes conformes aux mentions du recueil de PV.
              </div>
              <div className="flex flex-col gap-3 mb-4">
                {etapes.map((etape) => (
                  <div key={etape.titre} className="text-sm p-3 rounded-md" style={{ border: `1px solid ${C.line}` }}>
                    <div className="font-semibold mb-1" style={{ color: C.ink }}>{etape.titre}</div>
                    <div className="text-xs whitespace-pre-wrap" style={{ color: C.slate }}>{reponsesGuide[etape.titre] || "(non rédigé)"}</div>
                  </div>
                ))}
              </div>
              <button onClick={() => setStepIndex(0)} className="px-4 py-2 rounded-md text-sm font-semibold mr-2" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
                ← Revoir les étapes
              </button>
              <button onClick={reset} className="px-4 py-2 rounded-md text-sm font-semibold flex items-center gap-2" style={{ background: C.navy, color: "#fff" }}>
                <RotateCcw size={14} /> Recommencer
              </button>
            </Card>
          )}
        </div>
      )}

      {niveau === "assiste" && (
        <div className="max-w-2xl">
          <Card C={C} className="p-4 mb-4">
            <button onClick={() => setChecklistOuverte((v) => !v)} className="w-full flex items-center justify-between">
              <span className="text-sm font-bold" style={{ color: C.ink }}>Check-list des étapes {checklistOuverte ? "▲" : "▼"}</span>
            </button>
            {checklistOuverte && (
              <div className="mt-3 flex flex-col gap-3">
                {etapes.map((etape) => (
                  <div key={etape.titre}>
                    <div className="text-xs">
                      <span className="font-semibold" style={{ color: C.ink }}>{etape.titre}</span>
                      <span style={{ color: C.slate }}> — {etape.aide}</span>
                    </div>
                    <button
                      onClick={() => setReponsesReveleesAssiste((s) => ({ ...s, [etape.titre]: !s[etape.titre] }))}
                      className="text-[11px] font-semibold mt-1"
                      style={{ color: C.gold }}
                    >
                      {reponsesReveleesAssiste[etape.titre] ? "Masquer la réponse ▲" : "Voir la réponse à écrire ▼"}
                    </button>
                    {reponsesReveleesAssiste[etape.titre] && (
                      <ReponseModele C={C} parties={reponseModelePourEtape(theme, etape.titre)} titre="Réponse à écrire (modèle)" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </Card>
          <textarea
            value={texteLibre}
            onChange={(e) => setTexteLibre(e.target.value)}
            rows={16}
            placeholder="Rédige ton PV en entier ici…"
            className="w-full px-4 py-3 rounded-md text-sm outline-none resize-none"
            style={{ border: `1px solid ${C.line}`, background: C.card, color: C.ink }}
          />
        </div>
      )}

      {niveau === "autonome" && (
        <div className="max-w-2xl">
          <textarea
            value={texteLibre}
            onChange={(e) => setTexteLibre(e.target.value)}
            rows={18}
            placeholder="Page blanche. Rédige ton PV comme si c'était en conditions réelles…"
            className="w-full px-4 py-3 rounded-md text-sm outline-none resize-none mb-4"
            style={{ border: `1px solid ${C.line}`, background: C.card, color: C.ink }}
          />
          {!correctionVisible ? (
            <button onClick={() => setCorrectionVisible(true)} className="px-4 py-2 rounded-md text-sm font-semibold" style={{ background: C.navy, color: "#fff" }}>
              Voir la grille de correction
            </button>
          ) : (
            <div>
              <div className="mb-3">
                <div className="text-xs font-bold uppercase tracking-wide" style={{ color: C.gold }}>Grille d'auto-correction</div>
                <div className="font-bold text-base" style={{ color: C.ink }}>{theme}</div>
                {canevasActif?.reference && <div className="text-xs" style={{ color: C.slate }}>{canevasActif.reference}</div>}
              </div>
              {(() => {
                const exempleActif = EXEMPLES_PV.find((e) => e.theme === theme);
                return exempleActif ? (
                  <FacsimilePV C={C} exemple={exempleActif} canevas={canevasActif} />
                ) : (
                  <Card C={C} className="p-4">
                    <div className="flex flex-col gap-2">
                      {etapes.map((etape) => (
                        <div key={etape.titre} className="text-xs">
                          <span className="font-semibold" style={{ color: C.ink }}>{etape.titre}</span>
                          <span style={{ color: C.slate }}> — {etape.aide}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                );
              })()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}


const TYPES_TICKET = [
  { id: "bug", label: "Signaler un bug", couleur: "red" },
  { id: "amelioration", label: "Proposer une amélioration", couleur: "gold" },
  { id: "question", label: "Poser une question à l'admin", couleur: "navy" },
];

function badgeStatut(ticket, C) {
  if (ticket.resolu) return { texte: "Résolu", bg: `${C.gold}20`, color: C.gold };
  if (ticket.reponseAdmin) return { texte: "Répondu", bg: `${C.navy}15`, color: C.navy === "#0A1120" ? "#8FA3D6" : C.navy };
  return { texte: "Nouveau", bg: `${C.red}15`, color: C.red };
}

function SupportTab({ C, student }) {
  return student.isAdmin ? <SupportAdmin C={C} /> : <SupportEleve C={C} student={student} />;
}

function SupportEleve({ C, student }) {
  const [type, setType] = useState("bug");
  const [message, setMessage] = useState("");
  const [envoi, setEnvoi] = useState(false);
  const [mesTickets, setMesTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const keys = await listTickets();
    const tous = await Promise.all(keys.map((k) => loadTicket(k)));
    const miens = tous.filter((t) => t && normalizeKey(t.auteur) === normalizeKey(student.name));
    miens.sort((a, b) => b.createdAt - a.createdAt);
    setMesTickets(miens);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const envoyer = async () => {
    if (!message.trim()) return;
    setEnvoi(true);
    const ticket = {
      id: `${normalizeKey(student.name)}-${Date.now()}`,
      auteur: student.name,
      type,
      message: message.trim(),
      reponseAdmin: "",
      resolu: false,
      createdAt: Date.now(),
    };
    await saveTicket(ticket);
    setMessage("");
    setEnvoi(false);
    refresh();
  };

  return (
    <div>
      <Eyebrow C={C}>Aide & contact</Eyebrow>
      <SectionTitle C={C}>Support</SectionTitle>

      <Card C={C} className="p-5 max-w-2xl mb-6">
        <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.gold }}>Nouveau message</div>
        <div className="flex flex-wrap gap-2 mb-3">
          {TYPES_TICKET.map((t) => {
            const active = type === t.id;
            return (
              <button key={t.id} onClick={() => setType(t.id)} className="text-xs px-3 py-1.5 rounded-full font-semibold"
                style={{ border: `1px solid ${active ? colorFor(C, t.couleur) : C.line}`, background: active ? colorFor(C, t.couleur) : "transparent", color: active ? "#fff" : C.ink }}>
                {t.label}
              </button>
            );
          })}
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={4}
          placeholder="Décris le bug, ton idée d'amélioration, ou ta question…"
          className="w-full px-3 py-2.5 rounded-md text-sm outline-none resize-none mb-3"
          style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
        />
        <button onClick={envoyer} disabled={!message.trim() || envoi} className="px-4 py-2 rounded-md text-sm font-semibold"
          style={{ background: !message.trim() ? C.line : C.navy, color: !message.trim() ? C.slate : "#fff" }}>
          {envoi ? "Envoi…" : "Envoyer à l'admin"}
        </button>
      </Card>

      <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.gold }}>Mes messages</div>
      {loading ? (
        <div className="text-sm" style={{ color: C.slate }}>Chargement…</div>
      ) : mesTickets.length === 0 ? (
        <div className="text-sm" style={{ color: C.slate }}>Tu n'as encore rien envoyé.</div>
      ) : (
        <div className="flex flex-col gap-3 max-w-2xl">
          {mesTickets.map((t) => {
            const badge = badgeStatut(t, C);
            const typeInfo = TYPES_TICKET.find((tt) => tt.id === t.type);
            return (
              <Card C={C} key={t.id} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold" style={{ color: colorFor(C, typeInfo?.couleur) }}>{typeInfo?.label}</span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: badge.bg, color: badge.color }}>{badge.texte}</span>
                </div>
                <div className="text-sm mb-2" style={{ color: C.ink }}>{t.message}</div>
                {t.reponseAdmin && (
                  <div className="p-3 rounded-md mt-2" style={{ background: `${C.gold}12`, border: `1px solid ${C.line}` }}>
                    <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.gold }}>Réponse de l'admin</div>
                    <div className="text-sm" style={{ color: C.ink }}>{t.reponseAdmin}</div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function SupportAdmin({ C }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState("tous");
  const [reponses, setReponses] = useState({});

  const refresh = async () => {
    setLoading(true);
    const keys = await listTickets();
    const tous = await Promise.all(keys.map((k) => loadTicket(k)));
    const valides = tous.filter(Boolean).sort((a, b) => b.createdAt - a.createdAt);
    setTickets(valides);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const envoyerReponse = async (t) => {
    const texte = reponses[t.id];
    if (!texte || !texte.trim()) return;
    const maj = { ...t, reponseAdmin: texte.trim() };
    await saveTicket(maj);
    refresh();
  };

  const toggleResolu = async (t) => {
    const maj = { ...t, resolu: !t.resolu };
    await saveTicket(maj);
    refresh();
  };

  const filtres = [
    { id: "tous", label: "Tous" },
    { id: "nouveau", label: "Nouveaux" },
    { id: "repondu", label: "Répondus" },
    { id: "resolu", label: "Résolus" },
  ];

  const visibles = tickets.filter((t) => {
    if (filtre === "tous") return true;
    if (filtre === "nouveau") return !t.reponseAdmin && !t.resolu;
    if (filtre === "repondu") return t.reponseAdmin && !t.resolu;
    if (filtre === "resolu") return t.resolu;
    return true;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
        <div>
          <Eyebrow C={C}>{tickets.length} message(s) reçu(s)</Eyebrow>
          <SectionTitle C={C}>Support — messages des élèves</SectionTitle>
        </div>
        <button onClick={refresh} className="text-sm px-4 py-2 rounded-md font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
          Rafraîchir
        </button>
      </div>

      <div className="flex flex-wrap gap-2 mb-5">
        {filtres.map((f) => {
          const active = filtre === f.id;
          return (
            <button key={f.id} onClick={() => setFiltre(f.id)} className="text-xs px-3 py-1.5 rounded-full font-semibold"
              style={{ border: `1px solid ${active ? C.navy : C.line}`, background: active ? C.navy : "transparent", color: active ? "#fff" : C.ink }}>
              {f.label}
            </button>
          );
        })}
      </div>

      {loading ? (
        <div className="text-sm" style={{ color: C.slate }}>Chargement…</div>
      ) : visibles.length === 0 ? (
        <div className="text-sm" style={{ color: C.slate }}>Aucun message dans cette catégorie.</div>
      ) : (
        <div className="flex flex-col gap-3 max-w-2xl">
          {visibles.map((t) => {
            const badge = badgeStatut(t, C);
            const typeInfo = TYPES_TICKET.find((tt) => tt.id === t.type);
            return (
              <Card C={C} key={t.id} className="p-4">
                <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                  <span className="text-sm font-bold" style={{ color: C.ink }}>{t.auteur}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: colorFor(C, typeInfo?.couleur) }}>{typeInfo?.label}</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: badge.bg, color: badge.color }}>{badge.texte}</span>
                  </div>
                </div>
                <div className="text-sm mb-3" style={{ color: C.ink }}>{t.message}</div>

                {t.reponseAdmin && (
                  <div className="p-3 rounded-md mb-3" style={{ background: `${C.gold}12`, border: `1px solid ${C.line}` }}>
                    <div className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: C.gold }}>Ta réponse actuelle</div>
                    <div className="text-sm" style={{ color: C.ink }}>{t.reponseAdmin}</div>
                  </div>
                )}

                <textarea
                  value={reponses[t.id] ?? t.reponseAdmin ?? ""}
                  onChange={(e) => setReponses((r) => ({ ...r, [t.id]: e.target.value }))}
                  rows={3}
                  placeholder="Écris ta réponse…"
                  className="w-full px-3 py-2 rounded-md text-sm outline-none resize-none mb-2"
                  style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
                />
                <div className="flex gap-2 flex-wrap">
                  <button onClick={() => envoyerReponse(t)} className="text-sm px-3 py-2 rounded-md font-semibold" style={{ background: C.navy, color: "#fff" }}>
                    Envoyer la réponse
                  </button>
                  <button onClick={() => toggleResolu(t)} className="text-sm px-3 py-2 rounded-md font-semibold" style={{ border: `1px solid ${t.resolu ? C.line : C.gold}`, color: t.resolu ? C.ink : C.gold }}>
                    {t.resolu ? "Rouvrir" : "Marquer comme résolu"}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

function AdminTab({ C }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openName, setOpenName] = useState(null);
  const [pinDrafts, setPinDrafts] = useState({});
  const [pinErrors, setPinErrors] = useState({});
  const [pinSaved, setPinSaved] = useState({});
  const [confirmingDelete, setConfirmingDelete] = useState(null);
  const [importStatus, setImportStatus] = useState("");
  const [creationOuverte, setCreationOuverte] = useState(false);
  const [nouveauNom, setNouveauNom] = useState("");
  const [nouveauPin, setNouveauPin] = useState("");
  const [nouveauPinConfirm, setNouveauPinConfirm] = useState("");
  const [creationErreur, setCreationErreur] = useState("");
  const [creationSucces, setCreationSucces] = useState("");

  const refresh = async () => {
    setLoading(true);
    const rawKeys = await listStudents();
    const entries = await Promise.all(rawKeys.map(async (k) => ({ rawKey: k, data: await rawGetStudent(k) })));
    const valid = entries.filter((e) => e.data);

    // Regroupe par nom normalisé pour repérer d'éventuels doublons hérités
    const groupes = {};
    valid.forEach((e) => {
      const cle = normalizeKey(e.data.name);
      if (!groupes[cle]) groupes[cle] = [];
      groupes[cle].push(e);
    });

    const gagnants = [];
    for (const cle in groupes) {
      const membres = groupes[cle];
      if (membres.length === 1) {
        gagnants.push(membres[0].data);
        continue;
      }
      // Doublon détecté : on garde la clé déjà normalisée en priorité, sinon la plus récente
      const canonique = membres.find((m) => m.rawKey === cle);
      const conserve = canonique || [...membres].sort((a, b) => (b.data.createdAt || 0) - (a.data.createdAt || 0))[0];
      gagnants.push(conserve.data);
      for (const m of membres) {
        if (m !== conserve) await rawDeleteStudent(m.rawKey);
      }
    }

    gagnants.sort((a, b) => a.name.localeCompare(b.name));
    setRows(gagnants);
    setLoading(false);
  };

  useEffect(() => {
    refresh();
  }, []);

  const handleSavePin = async (r) => {
    const draft = pinDrafts[r.name] || "";
    if (!/^\d{4}$/.test(draft)) {
      setPinErrors((e) => ({ ...e, [r.name]: "Le code doit contenir 4 chiffres." }));
      return;
    }
    const updated = { ...r, pin: draft };
    await saveStudent(updated);
    setPinErrors((e) => ({ ...e, [r.name]: "" }));
    setPinSaved((s) => ({ ...s, [r.name]: true }));
    setTimeout(() => setPinSaved((s) => ({ ...s, [r.name]: false })), 2000);
    refresh();
  };

  const handleApprouver = async (r) => {
    const updated = { ...r, approuve: true };
    await saveStudent(updated);
    refresh();
  };

  const handleRefuser = async (r) => {
    await deleteStudent(r.name);
    refresh();
  };

  const handleCreerCompte = async () => {
    const nom = nouveauNom.trim();
    if (!nom) {
      setCreationErreur("Entre un prénom.");
      return;
    }
    if (normalizeKey(nom) === normalizeKey(ADMIN_NAME)) {
      setCreationErreur("Ce prénom est réservé à l'administrateur.");
      return;
    }
    if (!/^\d{4}$/.test(nouveauPin)) {
      setCreationErreur("Le code doit contenir 4 chiffres.");
      return;
    }
    if (nouveauPin !== nouveauPinConfirm) {
      setCreationErreur("Les deux codes ne correspondent pas.");
      return;
    }
    const existant = await loadStudent(nom);
    if (existant) {
      setCreationErreur(`Une session "${existant.name}" existe déjà pour ce prénom.`);
      return;
    }
    const record = defaultStudent(nom, nouveauPin);
    const ok = await saveStudent(record);
    if (!ok) {
      setCreationErreur("Échec de la création, réessaie.");
      return;
    }
    setCreationErreur("");
    setCreationSucces(`Session "${nom}" créée avec le code ${nouveauPin}.`);
    setNouveauNom("");
    setNouveauPin("");
    setNouveauPinConfirm("");
    setTimeout(() => setCreationSucces(""), 4000);
    refresh();
  };

  const handleDelete = async (name) => {
    await deleteStudent(name);
    setConfirmingDelete(null);
    if (openName === name) setOpenName(null);
    refresh();
  };

  const handleExport = async () => {
    const names = await listStudents();
    const data = await Promise.all(names.map((n) => loadStudent(n)));
    const json = JSON.stringify(data.filter(Boolean), null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gpx-revision-sauvegarde-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleImportFile = async (e) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setImportStatus("Import en cours…");
    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      const list = Array.isArray(parsed) ? parsed : [parsed];
      let ok = 0;
      for (const record of list) {
        if (record && record.name) {
          const saved = await saveStudent(record);
          if (saved) ok++;
        }
      }
      setImportStatus(`${ok} session(s) restaurée(s).`);
      refresh();
    } catch (err) {
      setImportStatus("Fichier invalide, import annulé.");
    }
    setTimeout(() => setImportStatus(""), 4000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-3 flex-wrap gap-3">
        <div>
          <Eyebrow C={C}>{rows.filter((r) => r.approuve !== false).length} session(s) validée(s){rows.some((r) => r.approuve === false) ? ` — ${rows.filter((r) => r.approuve === false).length} en attente` : ""}</Eyebrow>
          <SectionTitle C={C}>Sessions élèves</SectionTitle>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={refresh} className="text-sm px-4 py-2 rounded-md font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
            Rafraîchir
          </button>
          <button onClick={() => { setCreationOuverte((v) => !v); setCreationErreur(""); }} className="text-sm px-4 py-2 rounded-md font-semibold" style={{ background: C.navy, color: "#fff" }}>
            {creationOuverte ? "Fermer" : "Créer un compte élève"}
          </button>
          <button onClick={handleExport} className="text-sm px-4 py-2 rounded-md font-semibold" style={{ border: `1px solid ${C.gold}`, color: C.gold }}>
            Exporter la sauvegarde
          </button>
          <label className="text-sm px-4 py-2 rounded-md font-semibold cursor-pointer" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
            Importer une sauvegarde
            <input type="file" accept="application/json" onChange={handleImportFile} className="hidden" />
          </label>
        </div>
      </div>

      {creationOuverte && (
        <Card C={C} className="p-4 mb-4 max-w-xl">
          <div className="text-xs font-bold uppercase tracking-wide mb-3" style={{ color: C.gold }}>Nouveau compte élève</div>
          <div className="flex flex-col gap-3">
            <div>
              <div className="text-[11px] mb-1" style={{ color: C.slate }}>Prénom + première lettre du nom</div>
              <input
                value={nouveauNom}
                onChange={(e) => setNouveauNom(e.target.value)}
                placeholder="Ex : Camille B."
                className="w-full px-3 py-2 rounded-md text-sm outline-none"
                style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
              />
            </div>
            <div className="flex gap-3 flex-wrap">
              <div>
                <div className="text-[11px] mb-1" style={{ color: C.slate }}>Code (4 chiffres)</div>
                <input
                  value={nouveauPin}
                  onChange={(e) => setNouveauPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  inputMode="numeric"
                  placeholder="••••"
                  className="px-3 py-2 rounded-md text-sm outline-none tracking-[0.3em] w-28"
                  style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
                />
              </div>
              <div>
                <div className="text-[11px] mb-1" style={{ color: C.slate }}>Confirme le code</div>
                <input
                  value={nouveauPinConfirm}
                  onChange={(e) => setNouveauPinConfirm(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  inputMode="numeric"
                  placeholder="••••"
                  className="px-3 py-2 rounded-md text-sm outline-none tracking-[0.3em] w-28"
                  style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
                />
              </div>
            </div>
            {creationErreur && <div className="text-xs" style={{ color: C.red }}>{creationErreur}</div>}
            {creationSucces && <div className="text-xs" style={{ color: C.gold }}>{creationSucces}</div>}
            <button onClick={handleCreerCompte} className="px-4 py-2 rounded-md text-sm font-semibold self-start" style={{ background: C.navy, color: "#fff" }}>
              Créer la session
            </button>
          </div>
        </Card>
      )}
      {importStatus && (
        <div className="text-xs mb-4" style={{ color: C.gold }}>{importStatus}</div>
      )}

      {!loading && rows.some((r) => r.approuve === false) && (
        <Card C={C} className="p-4 mb-5 max-w-3xl" style={{ borderColor: C.red, borderWidth: 1, borderStyle: "solid" }}>
          <div className="text-xs font-bold uppercase tracking-wide mb-3 flex items-center gap-2" style={{ color: C.red }}>
            <Users size={14} /> Demandes en attente de validation ({rows.filter((r) => r.approuve === false).length})
          </div>
          <div className="flex flex-col gap-2">
            {rows.filter((r) => r.approuve === false).map((r) => (
              <div key={r.name} className="flex items-center justify-between gap-3 p-3 rounded-md flex-wrap" style={{ background: `${C.red}0A` }}>
                <div>
                  <span className="font-semibold text-sm" style={{ color: C.ink }}>{r.name}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleApprouver(r)} className="text-xs px-3 py-1.5 rounded-md font-bold flex items-center gap-1" style={{ background: C.navy, color: "#fff" }}>
                    <Check size={12} /> Valider
                  </button>
                  <button onClick={() => handleRefuser(r)} className="text-xs px-3 py-1.5 rounded-md font-semibold" style={{ border: `1px solid ${C.red}`, color: C.red }}>
                    Refuser
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {loading ? (
        <div className="text-sm" style={{ color: C.slate }}>Chargement…</div>
      ) : rows.filter((r) => r.approuve !== false).length === 0 ? (
        <div className="text-sm" style={{ color: C.slate }}>Aucune session validée pour l'instant.</div>
      ) : (
        <div className="flex flex-col gap-2 max-w-3xl">
          {rows.filter((r) => r.approuve !== false).map((r) => {
            const open = openName === r.name;
            const avancements = MATIERES.map((m) => ({ ...m, avancement: avancementDe(m.nom, r.acquis) }));
            const moyenne = Math.round(avancements.reduce((s, m) => s + m.avancement, 0) / avancements.length) || 0;
            return (
              <Card C={C} key={r.name} className="p-4">
                <button onClick={() => setOpenName(open ? null : r.name)} className="w-full flex items-center justify-between text-left">
                  <div className="flex items-center gap-4">
                    <span className="font-bold" style={{ color: C.ink }}>
                      {r.name} {r.isAdmin && <span style={{ color: C.gold }} className="text-xs">(admin)</span>}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded font-bold tracking-widest" style={{ background: `${C.gold}20`, color: C.gold }}>
                      code protégé
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold" style={{ color: C.slate }}>{moyenne}% en moyenne</span>
                    <ChevronRight size={16} style={{ color: C.slate, transform: open ? "rotate(90deg)" : "none" }} />
                  </div>
                </button>

                {open && (
                  <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${C.line}` }}>
                    <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.gold }}>Avancement par matière</div>
                    <div className="flex flex-col gap-2 mb-4">
                      {avancements.map((m) => (
                        <div key={m.nom}>
                          <div className="flex justify-between text-xs mb-1">
                            <span style={{ color: C.ink }}>{m.nom}</span>
                            <span style={{ color: C.slate }}>{m.avancement}%</span>
                          </div>
                          <ProgressBar C={C} value={m.avancement} color={colorFor(C, m.couleur)} />
                        </div>
                      ))}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.gold }}>Points pratiques</div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-5">
                      {["tir", "course", "natation", "gtpi"].map((k) => (
                        <div key={k} className="text-xs" style={{ color: C.slate }}>
                          {k} : <span style={{ color: C.ink }} className="font-semibold">{r.pratique?.[k] || "—"}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: C.gold }}>Gestion de la session</div>
                    <div className="flex items-end gap-2 mb-3 flex-wrap">
                      <div>
                        <div className="text-[11px] mb-1" style={{ color: C.slate }}>Nouveau code (4 chiffres)</div>
                        <input
                          value={pinDrafts[r.name] ?? ""}
                          onChange={(e) => setPinDrafts((d) => ({ ...d, [r.name]: e.target.value.replace(/\D/g, "").slice(0, 4) }))}
                          placeholder="••••"
                          inputMode="numeric"
                          className="px-3 py-2 rounded-md text-sm outline-none tracking-[0.3em] w-28"
                          style={{ border: `1px solid ${C.line}`, background: C.bg, color: C.ink }}
                        />
                      </div>
                      <button onClick={() => handleSavePin(r)} className="text-sm px-3 py-2 rounded-md font-semibold" style={{ background: C.navy, color: "#fff" }}>
                        Enregistrer
                      </button>
                      {pinSaved[r.name] && <span className="text-xs" style={{ color: C.gold }}>Code mis à jour ✓</span>}
                    </div>
                    {pinErrors[r.name] && <div className="text-xs mb-3" style={{ color: C.red }}>{pinErrors[r.name]}</div>}

                    {confirmingDelete === r.name ? (
                      <div className="flex items-center gap-2 p-3 rounded-md" style={{ background: `${C.red}10`, border: `1px solid ${C.red}` }}>
                        <span className="text-xs flex-1" style={{ color: C.ink }}>
                          Supprimer définitivement la session de {r.name} ? Toutes ses données seront perdues.
                        </span>
                        <button onClick={() => handleDelete(r.name)} className="text-xs px-3 py-1.5 rounded-md font-bold" style={{ background: C.red, color: "#fff" }}>
                          Confirmer
                        </button>
                        <button onClick={() => setConfirmingDelete(null)} className="text-xs px-3 py-1.5 rounded-md font-semibold" style={{ border: `1px solid ${C.line}`, color: C.ink }}>
                          Annuler
                        </button>
                      </div>
                    ) : (
                      <button onClick={() => setConfirmingDelete(r.name)} className="text-xs px-3 py-2 rounded-md font-semibold" style={{ border: `1px solid ${C.red}`, color: C.red }}>
                        Supprimer cette session
                      </button>
                    )}
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- APP ----------------------------- */

export default function App() {
  const [dark, setDark] = useState(false);
  const [tab, setTab] = useState("dashboard");
  const [studentName, setStudentName] = useState(null);
  const [student, setStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [cibleFiche, setCibleFiche] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);
  const examEnCoursRef = useRef(false);
  const C = dark ? DARK : LIGHT;

  const demanderConfirmation = (message, onConfirm, confirmLabel) => {
    setConfirmModal({ message, onConfirm, confirmLabel });
  };

  const changerOngletProtege = (nouvelOnglet) => {
    if (!examEnCoursRef.current) {
      setTab(nouvelOnglet);
      return;
    }
    demanderConfirmation(
      "Tu as un examen blanc en cours. Changer d'onglet abandonnera ta progression actuelle. Continuer ?",
      () => setTab(nouvelOnglet),
      "Changer d'onglet"
    );
  };

  const persist = async (data) => {
    const ok = await saveStudent(data);
    if (!ok) {
      setSaveError(true);
      setTimeout(() => setSaveError(false), 4000);
    }
  };

  const enterSession = (data) => {
    setStudent(data);
    setStudentName(data.name);
    setTab("dashboard");
  };

  const naviguerVersFiche = (docTitre, sectionNumero, ficheIndex) => {
    const aller = () => {
      setCibleFiche({ docTitre, sectionNumero, ficheIndex });
      setTab("fiches");
    };
    if (!examEnCoursRef.current) {
      aller();
      return;
    }
    demanderConfirmation(
      "Tu as un examen blanc en cours. Changer d'onglet abandonnera ta progression actuelle. Continuer ?",
      aller,
      "Changer d'onglet"
    );
  };

  if (!student) {
    return <Login key={dark} C={C} onEnter={enterSession} />;
  }

  const safeTab = tab === "admin" && !student.isAdmin ? "dashboard" : tab;


  const navSections = student.isAdmin
    ? [...NAV_SECTIONS, { label: "Administration", items: [{ id: "admin", label: "Sessions élèves", icon: Users }] }]
    : NAV_SECTIONS;

  const SidebarContent = (
    <>
      <div className="flex items-center justify-between mb-6 px-1">
        <div className="flex items-center gap-3">
          <Stamp C={C} size={38} />
          <div>
            <div className="text-white font-extrabold text-sm leading-tight">GPX RÉVISION</div>
            <div className="text-[11px]" style={{ color: C.goldSoft }}>SENS — 281ème promo</div>
          </div>
        </div>
        <button onClick={() => setSidebarOpen(false)} className="md:hidden">
          <X size={20} style={{ color: C.goldSoft }} />
        </button>
      </div>

      <div className="px-3 py-2 rounded-md mb-6 flex items-center justify-between" style={{ background: "rgba(255,255,255,0.06)" }}>
        <span className="text-sm font-semibold" style={{ color: "#fff" }}>
          {studentName} {student.isAdmin && <span style={{ color: C.goldSoft }} className="text-xs">(admin)</span>}
        </span>
        <button
          onClick={() => {
            const seDeconnecter = () => { definirJetonAuth(null); setStudent(null); setStudentName(null); setTab("dashboard"); };
            if (!examEnCoursRef.current) { seDeconnecter(); return; }
            demanderConfirmation("Tu as un examen blanc en cours. Te déconnecter abandonnera ta progression actuelle. Continuer ?", seDeconnecter, "Se déconnecter");
          }}
          title="Changer de session"
        >
          <LogOut size={14} style={{ color: C.goldSoft }} />
        </button>
      </div>

      <div className="flex-1 flex flex-col gap-6 overflow-auto">
        {navSections.map((section) => (
          <div key={section.label}>
            <div className="text-[10px] font-bold uppercase tracking-[0.15em] px-2 mb-2" style={{ color: C.goldSoft, opacity: 0.7 }}>{section.label}</div>
            <div className="flex flex-col gap-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = tab === item.id;
                return (
                  <button key={item.id} onClick={() => { changerOngletProtege(item.id); setSidebarOpen(false); }} className="flex items-center gap-3 px-3 py-2.5 md:py-2 rounded-md text-sm font-semibold text-left transition-colors"
                    style={{ background: active ? C.gold : "transparent", color: active ? C.navy : "#E7E6DF" }}>
                    <Icon size={16} />
                    {item.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <button onClick={() => setDark((d) => !d)} className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold mt-4 flex-shrink-0" style={{ border: `1px solid ${C.goldSoft}`, color: C.goldSoft }}>
        {dark ? <Sun size={15} /> : <Moon size={15} />}
        {dark ? "Mode clair" : "Mode sombre"}
      </button>
    </>
  );

  return (
    <div className="w-full h-full flex flex-col md:flex-row" style={{ background: C.bg, minHeight: 640 }}>
      {/* Barre mobile / tablette */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 flex-shrink-0" style={{ background: C.sidebar }}>
        <div className="flex items-center gap-2">
          <Stamp C={C} size={30} />
          <span className="text-white font-extrabold text-sm">GPX RÉVISION</span>
        </div>
        <button onClick={() => setSidebarOpen(true)}>
          <Menu size={22} style={{ color: C.goldSoft }} />
        </button>
      </div>

      {/* Tiroir mobile */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="w-72 max-w-[85vw] h-full flex flex-col p-5 overflow-auto" style={{ background: C.sidebar }}>
            {SidebarContent}
          </div>
          <div className="flex-1" style={{ background: "rgba(0,0,0,0.5)" }} onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Sidebar fixe desktop / tablette large / TV */}
      <div className="hidden md:flex w-56 lg:w-64 flex-shrink-0 flex-col p-5 overflow-auto" style={{ background: C.sidebar }}>
        {SidebarContent}
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-auto">
        <div className="w-full max-w-6xl mx-auto">
          {safeTab === "dashboard" && <Dashboard C={C} student={student} onNaviguerVersFiche={naviguerVersFiche} />}
          {safeTab === "fiches" && <DocumentDPGDPS C={C} student={student} cibleFiche={cibleFiche} onCibleConsommee={() => setCibleFiche(null)} />}
          {safeTab === "articles" && <ArticlesLoi C={C} student={student} />}
          {safeTab === "examens" && <ExamensBlancs C={C} student={student} onExamEnCoursChange={(v) => { examEnCoursRef.current = v; }} onDemanderConfirmation={demanderConfirmation} />}
          {safeTab === "pv" && <EntrainementPV C={C} student={student} />}
          {safeTab === "exemple-pv" && <ExemplePV C={C} student={student} />}
          {safeTab === "support" && <SupportTab C={C} student={student} />}
          {safeTab === "admin" && <AdminTab C={C} student={student} />}
        </div>
      </div>

      {saveError && (
        <div
          className="fixed bottom-4 right-4 left-4 sm:left-auto sm:max-w-sm px-4 py-3 rounded-md text-sm font-semibold z-50"
          style={{ background: C.red, color: "#fff" }}
        >
          La sauvegarde a échoué. Vérifie ta connexion et réessaie.
        </div>
      )}

      <ConfirmDialog C={C} data={confirmModal} onClose={() => setConfirmModal(null)} />
    </div>
  );
}
