# AIPASSCNI DATA EXTRACTOR Library

## Description

La bibliothèque d'extraction fournit des outils pour extraire des données à partir de documents d'identité camerounais, notamment les passeports et les cartes nationales d'identité (CNI). Elle utilise Tesseract.js pour la reconnaissance optique de caractères (OCR) et des modèles génératifs pour traiter et structurer les données extraites.

## Fonctionnalités

- Extraction des données des passeports camerounais.
- Extraction des données des CNI camerounaises.
- Gestion des erreurs courantes, y compris les erreurs de type de fichier non pris en charge et les erreurs liées aux clés API.

## Prérequis

- Node.js 20.x ou version ultérieure
- NPM ou Yarn
- Une clé API valide pour les services de génération de contenu (ex. : Google Generative AI)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/your-username/extraction-library.git
   cd extraction-library
   ```

2. Installez les dépendances :

   ```bash
   npm install
   # ou
   yarn install
   ```

3. Configurez la clé API :

   Assurez-vous que la clé API est définie dans votre environnement. Par exemple, ajoutez la ligne suivante à votre fichier `.env` :

   ```
   AIPASSCNI_API_KEY=your-api-key-here
   ```

## Utilisation

### Extraction des données du passeport

Pour extraire les données d'un passeport camerounais, utilisez la fonction `extractPassportData`. Voici un exemple d'utilisation :

```typescript
import { extractPassportData } from './src/cmr/passportExtractor'
import GeminiModel from './src/aiModels/geminiModel'

const model = new GeminiModel()
const passportImagePath = './images/passport1.jpg'

extractPassportData(passportImagePath, model)
  .then((data) => console.log('Passport data:', data))
  .catch((error) => console.error('Error extracting passport data:', error))
```

### Extraction des données de la CNI

Pour extraire les données d'une CNI camerounaise, utilisez la fonction `extractCniData`. Voici un exemple d'utilisation :

```typescript
import { extractCniData } from './src/cmr/cniExtractor'
import GeminiModel from './src/aiModels/geminiModel'

const model = new GeminiModel()
const frontImagePath = './images/cni11.jpg'
const backImagePath = './images/cni12.jpg'

extractCniData(frontImagePath, backImagePath, model)
  .then((data) => console.log('CNI data:', data))
  .catch((error) => console.error('Error extracting CNI data:', error))
```

## Licence

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

## Contact

Pour toute question ou problème, veuillez contacter [txchrixo@gmail.com](mailto:txchrixo@gmail.com).
