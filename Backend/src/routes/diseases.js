const express = require('express');
const router = express.Router();

// Disease identification and treatment routes
router.get('/', (req, res) => {
    res.json({ message: 'Diseases routes - Disease identification and treatment' });
});

// GET /api/diseases/list - Get list of common diseases
router.get('/list', (req, res) => {
    // Implementation for getting disease list
    const { crop, type, region } = req.query;
    
    res.json({ 
        message: 'Get diseases list',
        data: {
            diseases: [
                {
                    id: 1,
                    name: 'Blast',
                    scientificName: 'Pyricularia oryzae',
                    type: 'fungal',
                    affectedCrops: ['Rice'],
                    severity: 'high',
                    symptoms: ['Spindle-shaped lesions', 'Gray centers with brown margins']
                },
                {
                    id: 2,
                    name: 'Late Blight',
                    scientificName: 'Phytophthora infestans',
                    type: 'fungal',
                    affectedCrops: ['Potato', 'Tomato'],
                    severity: 'high',
                    symptoms: ['Dark water-soaked lesions', 'White moldy growth']
                },
                {
                    id: 3,
                    name: 'Bacterial Wilt',
                    scientificName: 'Ralstonia solanacearum',
                    type: 'bacterial',
                    affectedCrops: ['Tomato', 'Potato', 'Eggplant'],
                    severity: 'very high',
                    symptoms: ['Wilting', 'Yellowing leaves', 'Brown vascular tissue']
                }
            ],
            filters: { crop, type, region }
        }
    });
});

// GET /api/diseases/:id - Get specific disease information
router.get('/:id', (req, res) => {
    // Implementation for getting specific disease details
    const { id } = req.params;
    
    res.json({ 
        message: 'Get disease details',
        data: {
            id: parseInt(id),
            name: 'Blast',
            scientificName: 'Pyricularia oryzae',
            type: 'fungal',
            description: 'Most destructive disease of rice causing significant yield losses',
            pathogen: {
                type: 'Fungus',
                favorableConditions: ['High humidity (85-95%)', 'Temperature 20-30°C', 'Long wet periods']
            },
            symptoms: {
                leaves: 'Spindle-shaped lesions with gray centers and brown margins',
                neck: 'Grayish-brown lesions that girdle the neck',
                panicle: 'Infected panicles become grayish-brown and sterile'
            },
            lifecycle: {
                primary: 'Infected seeds and plant debris',
                secondary: 'Conidia spread by wind and rain splash',
                favorable: 'Cool nights, warm days, high humidity'
            },
            management: {
                cultural: [
                    'Use resistant varieties',
                    'Balanced fertilization (avoid excess nitrogen)',
                    'Proper spacing for air circulation',
                    'Remove infected plant debris'
                ],
                biological: [
                    'Trichoderma viride application',
                    'Pseudomonas fluorescens seed treatment'
                ],
                chemical: [
                    'Tricyclazole 75% WP @ 0.6g/l',
                    'Propiconazole 25% EC @ 1ml/l',
                    'Azoxystrobin 23% SC @ 1ml/l'
                ]
            }
        }
    });
});

// POST /api/diseases/identify - Identify disease from image/symptoms
router.post('/identify', (req, res) => {
    // Implementation for disease identification
    const { symptoms, crop, imageUrl, location, plantPart } = req.body;
    
    res.json({ 
        message: 'Identify disease',
        data: {
            possibleDiseases: [
                {
                    name: 'Blast',
                    confidence: 90,
                    matchedSymptoms: ['Spindle-shaped lesions', 'Gray centers'],
                    recommendation: 'Apply Tricyclazole immediately',
                    severity: 'high'
                },
                {
                    name: 'Brown Spot',
                    confidence: 65,
                    matchedSymptoms: ['Brown lesions'],
                    recommendation: 'Improve drainage and apply fungicide',
                    severity: 'moderate'
                }
            ],
            analysisId: Date.now(),
            timestamp: new Date().toISOString(),
            recommendedAction: 'Immediate treatment required'
        }
    });
});

// GET /api/diseases/treatments - Get treatment options
router.get('/treatments', (req, res) => {
    // Implementation for getting treatment options
    const { diseaseId, crop, severity, stage } = req.query;
    
    res.json({ 
        message: 'Get treatment options',
        data: {
            diseaseId,
            crop,
            severity,
            stage,
            treatments: [
                {
                    type: 'preventive',
                    method: 'cultural',
                    practices: [
                        'Use certified disease-free seeds',
                        'Maintain proper plant spacing',
                        'Avoid overhead irrigation',
                        'Remove infected plant debris'
                    ]
                },
                {
                    type: 'curative',
                    method: 'chemical',
                    fungicides: [
                        {
                            name: 'Tricyclazole 75% WP',
                            dosage: '0.6g per liter',
                            application: 'Foliar spray',
                            timing: 'At first symptom appearance',
                            interval: '15 days'
                        },
                        {
                            name: 'Propiconazole 25% EC',
                            dosage: '1ml per liter',
                            application: 'Foliar spray',
                            timing: 'Preventive or curative',
                            interval: '10-15 days'
                        }
                    ]
                }
            ]
        }
    });
});

// POST /api/diseases/report - Report disease outbreak
router.post('/report', (req, res) => {
    // Implementation for reporting disease outbreak
    const { 
        farmerId, 
        diseaseId, 
        crop, 
        location, 
        severity, 
        affectedArea, 
        symptoms,
        images,
        plantStage 
    } = req.body;
    
    res.json({ 
        message: 'Report disease outbreak',
        data: {
            reportId: Date.now(),
            farmerId,
            diseaseId,
            crop,
            location,
            severity,
            affectedArea,
            plantStage,
            status: 'reported',
            reportDate: new Date().toISOString(),
            urgency: severity === 'high' ? 'immediate' : 'normal',
            estimatedResponse: severity === 'high' ? '6-12 hours' : '24-48 hours'
        }
    });
});

// GET /api/diseases/forecast - Get disease forecast
router.get('/forecast', (req, res) => {
    // Implementation for disease forecast
    const { location, crop, timeframe } = req.query;
    
    res.json({ 
        message: 'Get disease forecast',
        data: {
            location,
            crop,
            timeframe,
            forecast: [
                {
                    disease: 'Blast',
                    riskLevel: 'high',
                    probability: '85%',
                    peakPeriod: 'Next 1-2 weeks',
                    weatherFactors: ['High humidity forecast', 'Cool nights expected'],
                    prevention: 'Apply preventive fungicide spray'
                },
                {
                    disease: 'Brown Spot',
                    riskLevel: 'moderate',
                    probability: '60%',
                    peakPeriod: 'Next 3-4 weeks',
                    weatherFactors: ['Intermittent rains'],
                    prevention: 'Improve field drainage'
                }
            ]
        }
    });
});

// GET /api/diseases/resistance - Get disease resistance information
router.get('/resistance', (req, res) => {
    // Implementation for getting resistance information
    const { crop, disease } = req.query;
    
    res.json({ 
        message: 'Get disease resistance information',
        data: {
            crop,
            disease,
            resistantVarieties: [
                {
                    variety: 'Pusa Basmati 1121',
                    resistance: 'Moderate resistant to Blast',
                    geneSource: 'Pi54 gene',
                    recommendation: 'Suitable for blast-prone areas'
                },
                {
                    variety: 'IR64',
                    resistance: 'Field resistant',
                    geneSource: 'Multiple minor genes',
                    recommendation: 'Good for general cultivation'
                }
            ],
            breedingPrograms: [
                'Development of blast-resistant varieties using marker-assisted selection',
                'Pyramiding of resistance genes for durable resistance'
            ]
        }
    });
});

module.exports = router;