// constructor
const Card = require("../models/card.model");

    exports.ToCardModel = (card) => {
        let model = new Card();
        model.id = card.id;
        // User
        model.first_name = card.first_name || '';
        model.last_name = card.last_name || '';
        model.mobile = card.mobile || '';
        model.business_phone = card.business_phone || '';
        model.email = card.email || '';
        model.company = card.company || '';
        model.position = card.position || '';
        model.job_id = card.job_id || '';
        model.department = card.department || '';
        model.address = card.address || '';
        model.resume = card.resume || '';
        // Colors
        model.color_primary = card.color_primary || '';
        model.color_secondary = card.color_secondary || '';
        model.qr_code = card.qr_code || '';
        // Files
        model.file_link_profil = card.file_link_profil,
        model.file_link_background = card.file_link_background ,
        model.file_link_download = card.file_link_download,
        model.file_link_loader = card.file_link_loader,
        // Social networks
        model.facebook = card.facebook || '';
        model.twitter = card.twitter || '';
        model.linkedin = card.linkedin || '';
        model.instagram = card.instagram || '';
        model.skype = card.skype || '';
        model.github = card.github || '';
        model.slack = card.slack || '';
        model.github = card.github || '';
        model.youtube = card.youtube || '';
        model.github = card.github || '';
        model.youtube = card.youtube || '';
        model.behance = card.behance || '';
        model.whatsapp = card.whatsapp || '';
        // URL
        model.site_name = card.site_name || '';
        model.site_url = card.site_url || '';

        return model;
    };


    exports.ToCardApi = (card) => {
        let apiCard = new Card();
        apiCard.id = card.id;
        // User
        apiCard.first_name = card.first_name || '';
        apiCard.last_name = card.last_name || '';
        apiCard.mobile = card.mobile || '';
        apiCard.business_phone = card.business_phone || '';
        apiCard.email = card.email || '';
        apiCard.company = card.company || '';
        apiCard.position = card.position || '';
        apiCard.job_id = card.job_id || '';
        apiCard.department = card.department || '';
        apiCard.address = card.address || '';
        apiCard.resume = card.resume || '';
        // Colors
        apiCard.color_primary = card.color_primary || '';
        apiCard.color_secondary = card.color_secondary || '';
        apiCard.qr_code = card.qr_code || '';
        // Files
        apiCard.file_link_background = card.file_link_background || Buffer.alloc(0),
        apiCard.file_link_profil = card.file_link_profil || Buffer.alloc(0),
        apiCard.file_link_download = card.file_link_download || Buffer.alloc(0),
        apiCard.file_link_loader = card.file_link_loader || Buffer.alloc(0),

        apiCard.file_profil = card.file_link_profil,
        apiCard.file_background = card.file_link_background,
        apiCard.file_download = card.file_link_download,

        // Social Networks
        apiCard.facebook = card.facebook || '';
        apiCard.twitter = card.twitter || '';
        apiCard.linkedin = card.linkedin || '';
        apiCard.instagram = card.instagram || '';
        apiCard.skype = card.skype || '';
        apiCard.github = card.github || '';
        apiCard.slack = card.slack || '';
        apiCard.github = card.github || '';
        apiCard.youtube = card.youtube || '';
        apiCard.behance = card.behance || '';
        apiCard.whatsapp = card.whatsapp || '';
        // URL
        apiCard.site_name = card.site_name || '';
        apiCard.site_url = card.site_url || '';
        return apiCard;
    };

    exports.ToCardsApi = (cardModels) => {
        let cards = cardModels.map(cardModel => {
            return this.ToCardApi(cardModel);
        })
        return cards;
    };


