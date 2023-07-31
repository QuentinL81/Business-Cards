import axios from 'axios';

// Axios configuration
axios.defaults.baseURL = 'http://localhost:3000'; // URL de l'API

function saveCard(digitalData) {

    const formData = {
        // Colors
        color_primary: digitalData.color_primary,
        color_secondary: digitalData.color_secondary,
        // Images
        file_link_background: digitalData.file_link_background,
        file_link_profile: digitalData.file_link_profile,
        file_link_download: digitalData.file_link_download,
        file_link_loader: digitalData.file_link_loader,
        // User
        first_name: digitalData.first_name,
        last_name: digitalData.last_name,
        mobile: digitalData.mobile,
        business_phone: digitalData.business_phone,
        email: digitalData.email,
        company: digitalData.company,
        position: digitalData.position,
        job_id: digitalData.job_id,
        department: digitalData.department,
        address: digitalData.address,
        resume: digitalData.resume,
        // URL
        site_name: digitalData.site_name,
        site_url: digitalData.site_url,
        // Social Networks
        facebook: digitalData.facebook,
        twitter: digitalData.twitter,
        linkedin: digitalData.linkedin,
        instagram: digitalData.instagram,
        skype: digitalData.skype,
        github: digitalData.github,
        slack: digitalData.slack,
        youtube: digitalData.youtube,
        behance: digitalData.behance,
        whatsapp: digitalData.whatsapp,
    
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