import React, { } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import BookApp_logo from '../assets/png/BookApp_logo.png';
import { Row } from 'simple-flexbox';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flex: 1,
        background: '#ECECE5',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    alignLogo: {
        justifyContent: 'center',
        alignItems: 'center',
    }
}));

export default function Cgu() {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <Box>
                <Row className={classes.alignLogo}>
                    <img src={BookApp_logo} width={50} height={50} />
                    <h1>Politique de confidentialité pour BookWorm</h1>
                </Row>
                <p>A BookWorm, accessible à partir de <a href='https://admin-bookapp.herokuapp.com/'>https://admin-bookapp.herokuapp.com/</a>, l'une de nos principales priorités est la confidentialité de nos visiteurs. Ce document de politique de confidentialité contient les types d'informations qui sont collectées et enregistrées par BookWorm et la façon dont nous les utilisons.</p>

                <p>Si vous avez des questions supplémentaires ou si vous souhaitez plus d'informations sur notre politique de confidentialité, n'hésitez pas à nous contacter. Notre politique de confidentialité a été générée à l'aide de<p><a href="https://www.gdprprivacynotice.com/">Générateur de politique de confidentialité GDPR de GDPRPrivacyNotice.com</a></p>.

                    <h2>Règlement général sur la protection des données (RGPD)</h2>
                    <p>Nous sommes un contrôleur de données de vos informations.</p>

                    <p>La base juridique deBookWorm pour la collecte et l'utilisation des informations personnelles décrites dans cette Politique de confidentialité dépend des Informations personnelles que nous collectons et du contexte spécifique dans lequel nous collectons les informations :</p>
                    <ul>
                        <li>BookWorm a besoin d'exécuter un contrat avec vous</li>.
                        <li>Vous avez donné à BookWorm la permission de le faire</li>.
                        <li>Le traitement de vos informations personnelles est dans l'intérêt légitime de BookWorm</li>.
                        <li>BookWorm doit se conformer à la loi</li>.
                    </ul>

                    <p>BookWorm ne conservera vos informations personnelles que le temps nécessaire aux fins énoncées dans la présente politique de confidentialité. Nous conserverons et utiliserons vos informations dans la mesure où cela est nécessaire pour nous conformer à nos obligations légales, résoudre les litiges et appliquer nos politiques.</p>

                    <p>Si vous êtes un résident de l'Espace économique européen (EEE), vous disposez de certains droits en matière de protection des données. Si vous souhaitez être informé des informations personnelles que nous détenons à votre sujet et si vous voulez qu'elles soient supprimées de nos systèmes, veuillez nous contacter.</p>
                    <p>Dans certaines circonstances, vous disposez des droits de protection des données suivants :</p>
                    <ul>
                        <li>Le droit d'accéder, de mettre à jour ou de supprimer les informations que nous avons sur vous.</li>
                        <li>Le droit de rectification.</li>
                        <li>Le droit d'opposition.</li>
                        <li>Le droit de restriction.</li>
                        <li>Le droit à la portabilité des données</li>.
                        <li>Le droit de retirer son consentement</li>.
                    </ul>

                    <h2>Fichiers journaux</h2>

                    <p>BookWorm suit une procédure standard d'utilisation de fichiers journaux. Ces fichiers enregistrent les visiteurs lorsqu'ils visitent des sites web. Toutes les sociétés d'hébergement le font et une partie de l'analytique des services d'hébergement. Les informations collectées par les fichiers journaux comprennent les adresses de protocole Internet (IP), le type de navigateur, le fournisseur d'accès Internet (FAI), l'horodatage, les pages de renvoi/de sortie et éventuellement le nombre de clics. Ces données ne sont pas liées à des informations permettant d'identifier une personne. Elles servent à analyser les tendances, à administrer le site, à suivre les déplacements des utilisateurs sur le site et à recueillir des informations démographiques.</p>

                    <h2>Cookies et balises Web</h2>

                    <p>Comme tout autre site web, BookWorm utilise des " cookies ". Ces cookies sont utilisés pour stocker des informations, y compris les préférences des visiteurs, et les pages du site web que le visiteur a consultées ou visitées. Ces informations sont utilisées pour optimiser l'expérience des utilisateurs en personnalisant le contenu de nos pages Web en fonction du type de navigateur des visiteurs et/ou d'autres informations.</p>

                    <p>Pour des informations plus générales sur les cookies, veuillez lire</p><a href="https://www.privacypolicyonline.com/what-are-cookies/">"What Are Cookies"</a></p>



                <h2>Politiques de confidentialité</h2>

                <p>Vous pouvez consulter cette liste pour trouver la politique de confidentialité de chacun des partenaires publicitaires de BookWorm.</p>

                <p>Les serveurs publicitaires tiers ou les réseaux publicitaires utilisent des technologies comme les cookies, le JavaScript ou les balises Web qui sont utilisées dans leurs publicités et liens respectifs qui apparaissent sur BookWorm, qui sont envoyés directement au navigateur des utilisateurs. Ils reçoivent automatiquement votre adresse IP lorsque cela se produit. Ces technologies sont utilisées pour mesurer l'efficacité de leurs campagnes publicitaires et/ou pour personnaliser le contenu publicitaire que vous voyez sur les sites Web que vous visitez.</p>

                <p>Notez que BookWorm n'a aucun accès ou contrôle sur ces cookies qui sont utilisés par des annonceurs tiers.</p>

                <h2>Politiques de confidentialité des tiers</h2>

                <p>La politique de confidentialité de BookWorm ne s'applique pas aux autres annonceurs ou sites web. Ainsi, nous vous conseillons de consulter les politiques de confidentialité respectives de ces serveurs publicitaires tiers pour obtenir des informations plus détaillées. Cela peut inclure leurs pratiques et des instructions sur la façon de refuser certaines options. </p>

                <p>Vous pouvez choisir de désactiver les cookies via les options de votre navigateur individuel. Pour connaître des informations plus détaillées sur la gestion des cookies avec des navigateurs web spécifiques, vous pouvez les trouver sur les sites web respectifs des navigateurs.</p>

                <h2>Information sur les enfants</h2>

                <p>Une autre partie de notre priorité est d'ajouter une protection pour les enfants lorsqu'ils utilisent Internet. Nous encourageons les parents et les tuteurs à observer, à participer et/ou à surveiller et à guider leur activité en ligne.</p> <p>Il n'y a pas d'autres moyens de protéger les enfants.</p>

                <p>BookWorm ne collecte pas sciemment d'informations personnelles identifiables auprès d'enfants de moins de 13 ans. Si vous pensez que votre enfant a fourni ce type d'informations sur notre site Internet, nous enc...</p>

                <h2>Information pour les enfants</h2>

                <p>Une autre partie de notre priorité est d'ajouter la protection des enfants lors de l'utilisation d'internet. Nous encourageons les parents et les tuteurs à observer, à participer et/ou à surveiller et à guider leur activité en ligne.</p>

                <p>BookWorm ne collecte pas sciemment d'informations personnelles identifiables auprès d'enfants de moins de 13 ans. Si vous pensez que votre enfant a fourni ce type d'informations sur notre site Internet, nous vous encourageons vivement à nous contacter immédiatement et nous ferons tout notre possible pour supprimer rapidement ces informations de nos dossiers.</p>

                <h2>Politique de confidentialité en ligne uniquement</h2>

                <p>Notre politique de confidentialité s'applique uniquement à nos activités en ligne et est valable pour les visiteurs de notre site web en ce qui concerne les informations qu'ils ont partagées et/ou collectées dans BookWorm. Cette politique n'est pas applicable aux informations collectées hors ligne ou via des canaux autres que ce site web.</p>

                <h2>Consentement</h2>

                <p>En utilisant notre site web, vous consentez par la présente à notre politique de confidentialité et acceptez ses termes.</p>
            </Box>
        </div>
    );
}