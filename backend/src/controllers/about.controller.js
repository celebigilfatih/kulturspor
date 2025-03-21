const About = require('../models/About');

// Hakkımızda bilgilerini getir
exports.getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    
    // Eğer veri yoksa varsayılan değerlerle oluştur
    if (!about) {
      about = await About.create({
        title: 'Hakkımızda',
        content: 'Football School olarak, genç yetenekleri keşfederek, onları sadece futbolda değil, hayatın her alanında başarılı bireyler olarak yetiştirmek için çalışıyoruz. Türkiye\'nin en prestijli futbol akademisi olarak, yetiştirdiğimiz sporcularla dünya futbolunda söz sahibi olmayı hedefliyoruz.',
        trainers: []
      });
    }

    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Hakkımızda bilgilerini güncelle
exports.updateAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    
    if (!about) {
      about = new About(req.body);
    } else {
      Object.assign(about, req.body);
    }
    
    about.updatedAt = new Date();
    await about.save();
    
    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eğitmen ekle
exports.addTrainer = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'Hakkımızda sayfası bulunamadı' });
    }

    about.trainers.push(req.body);
    about.updatedAt = new Date();
    await about.save();

    res.status(201).json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eğitmen güncelle
exports.updateTrainer = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'Hakkımızda sayfası bulunamadı' });
    }

    const trainerIndex = about.trainers.findIndex(
      trainer => trainer._id.toString() === req.params.trainerId
    );

    if (trainerIndex === -1) {
      return res.status(404).json({ message: 'Eğitmen bulunamadı' });
    }

    about.trainers[trainerIndex] = {
      ...about.trainers[trainerIndex],
      ...req.body
    };

    about.updatedAt = new Date();
    await about.save();

    res.status(200).json(about);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eğitmen sil
exports.deleteTrainer = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'Hakkımızda sayfası bulunamadı' });
    }

    about.trainers = about.trainers.filter(
      trainer => trainer._id.toString() !== req.params.trainerId
    );

    about.updatedAt = new Date();
    await about.save();

    res.status(200).json({ message: 'Eğitmen başarıyla silindi' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}; 