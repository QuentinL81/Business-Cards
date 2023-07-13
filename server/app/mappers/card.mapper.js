
// constructor
const Card = require("../models/card.model");

    exports.ToCardModel = (card) => {
        let model = new Card();
        model.id = card.id;
        model.first_name = card.firstName || '';
        model.last_name = card.lastName || '';
        model.mobile = card.mobile || '';
        model.business_phone = card.businessPhone || '';
        model.email = card.email || '';
        model.company = card.company || '';
        model.position = card.position || '';
        model.job_id = card.jobId || '';
        model.department = card.department || '';
        model.address = card.address || '';
        model.resume = card.resume || '';
        model.color_primary = card.colorPrimary || '';
        model.color_secondary = card.colorSecondary || '';
        model.file_link_profil = card.fileLinkProfil || '';
        model.file_link_background = card.fileLinkBackground || '';
        model.file_link_download = card.fileLinkDownload || '';
        model.file_link_loader = card.fileLinkLoader || '';
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

        model.site_name = card.siteName || '';
        model.site_url = card.siteUrl || '';

        return model;
    };


    exports.ToCardApi = (card) => {
        let apiCard = new Card();
        apiCard.id = card.id;
        apiCard.firstName = card.first_name || '';
        apiCard.lastName = card.last_name || '';
        apiCard.mobile = card.mobile || '';
        apiCard.businessPhone = card.business_phone || '';
        apiCard.email = card.email || '';
        apiCard.company = card.company || '';
        apiCard.position = card.position || '';
        apiCard.jobId = card.job_id || '';
        apiCard.department = card.department || '';
        apiCard.address = card.address || '';
        apiCard.resume = card.resume || '';
        apiCard.colorPrimary = card.color_primary || '';
        apiCard.colorSecondary = card.color_secondary || '';
        apiCard.fileLinkProfil = card.file_link_profil || '';
        apiCard.fileLinkBackground = card.file_link_background || '';
        apiCard.fileLinkDownload = card.file_link_download || '';
        apiCard.fileLinkLoader = card.file_link_loader || '';
        apiCard.facebook = card.facebook || '';
        apiCard.twitter = card.twitter || '';
        apiCard.linkedin = card.linkedin || '';
        apiCard.instagram = card.instagram || '';
        apiCard.skype = card.skype || '';
        apiCard.github = card.github || '';
        apiCard.slack = card.slack || '';
        apiCard.github = card.github || '';
        apiCard.youtube = card.youtube || '';

        apiCard.siteName = card.site_name || '';
        apiCard.siteUrl = card.site_url || '';
        return apiCard;
    };

    exports.ToCardsApi = (cardModels) => {
        let cards = cardModels.map(cardModel => {
            return this.ToCardApi(cardModel);
        })
        return cards;
    };


