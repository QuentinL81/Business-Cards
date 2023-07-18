import axios from 'axios';

// Axios configuration
axios.defaults.baseURL = 'http://localhost:3000'; // URL de l'API

function saveCard(digitalData) {

    const formData = {
        colorPrimary: digitalData.colorPrimary,
        colorSecondary: digitalData.colorSecondary,
        fileLinkBackground: digitalData.fileLinkBackground,
        fileLinkProfile: digitalData.fileLinkProfile,
        first_name: digitalData.first_name,
        last_name: digitalData.last_name,
        mobile: digitalData.mobile,
        business_phone: digitalData.business_phone,
        email: digitalData.email,
        compagny: digitalData.compagny,
        position: digitalData.position,
        job_id: digitalData.job_id,
        department: digitalData.department,
        address: digitalData.address,
        resume: digitalData.resume,
        site_name: digitalData.site_name,
        site_url: digitalData.site_url,
        fileLinkDownload: digitalData.fileLinkDownload,
        facebook: digitalData.facebook,
        twitter: digitalData.twitter,
        linkedin: digitalData.linkedin,
        instagram: digitalData.instagram,
        skype: digitalData.skype,
        github: digitalData.github,
        slack: digitalData.slack,
        youtube: digitalData.youtube,
        fileLinkLoader: digitalData.fileLinkLoader,
      };    

    axios.post('/API/savecards', formData) // endpoint d'enregistrement de cartes back-end
    .then(response => {
      // Gérer la réponse du serveur après l'envoi réussi
      console.log(response.data);
      // Perform other actions
    })
    .catch(error => {
      console.log(error);
      // Perform error handling
    });
}
  
export default saveCard;