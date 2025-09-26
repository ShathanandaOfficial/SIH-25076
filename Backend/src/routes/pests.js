const express = require('express');
const router = express.Router();

// Pest identification and treatment routes
router.get('/', (req, res) => {
    res.json({ message: 'Pests routes - Pest identification and treatment' });
});

// GET /api/pests/list - Get list of common pests
router.get('/list', (req, res) => {
    // Implementation for getting pest list
    const { crop, region, season } = req.query;
    
    res.json({ 
        message: 'Get pests list',
        data: {
            pests: [
                {
                    id: 1,
                    name: 'Stem Borer',
                    scientificName: 'Scirpophaga incertulas',
                    affectedCrops: ['Rice', 'Wheat'],
                    severity: 'high',
                    season: 'kharif',
                    symptoms: ['Dead hearts', 'White ears', 'Tunneling in stems']
                },
                {
                    id: 2,
                    name: 'Aphids',
                    scientificName: 'Aphis gossypii',
                    affectedCrops: ['Cotton', 'Tomato', 'Potato'],
                    severity: 'moderate',
                    season: 'all-season',
                    symptoms: ['Curled leaves', 'Sticky honeydew', 'Yellowing']
                },
                {
                    id: 3,
                    name: 'Bollworm',
                    scientificName: 'Helicoverpa armigera',
                    affectedCrops: ['Cotton', 'Tomato', 'Chickpea'],
                    severity: 'high',
                    season: 'kharif',
                    symptoms: ['Holes in bolls', 'Damaged fruits', 'Larvae presence']
                }
            ],
            filters: { crop, region, season }
        }
    });
});

// GET /api/pests/:id - Get specific pest information
router.get('/:id', (req, res) => {
    // Implementation for getting specific pest details
    const { id } = req.params;
    
    res.json({ 
        message: 'Get pest details',
        data: {
            id: parseInt(id),
            name: 'Stem Borer',
            scientificName: 'Scirpophaga incertulas',
            description: 'A major pest of rice that causes significant yield losses',
            lifecycle: {
                egg: '7-10 days',
                larva: '25-35 days',
                pupa: '7-10 days',
                adult: '7-10 days'
            },
            identification: {
                eggs: 'Flat, scale-like, yellowish eggs in masses',
                larva: 'Yellowish-white caterpillars with brown head',
                adult: 'Yellowish-brown moths with dark markings'
            },
            damage: {
                type: 'Boring',
                symptoms: ['Dead hearts in vegetative stage', 'White ears in reproductive stage'],
                economicThreshold: '2-5% dead hearts'
            },
            management: {
                cultural: ['Use resistant varieties', 'Proper water management', 'Remove stubbles'],
                biological: ['Release Trichogramma wasps', 'Encourage natural enemies'],
                chemical: ['Cartap hydrochloride', 'Chlorantraniliprole', 'Fipronil']
            }
        }
    });
});

// POST /api/pests/identify - Identify pest from image/symptoms
router.post('/identify', (req, res) => {
    // Implementation for pest identification
    const { symptoms, crop, imageUrl, location } = req.body;
    
    res.json({ 
        message: 'Identify pest',
        data: {
            possiblePests: [
                {
                    name: 'Stem Borer',
                    confidence: 85,
                    matchedSymptoms: ['Dead hearts', 'Tunneling'],
                    recommendation: 'Apply Cartap hydrochloride 4G @ 25 kg/ha'
                },
                {
                    name: 'Leaf Folder',
                    confidence: 60,
                    matchedSymptoms: ['Folded leaves'],
                    recommendation: 'Spray Chlorantraniliprole 0.4ml/l'
                }
            ],
            analysisId: Date.now(),
            timestamp: new Date().toISOString()
        }
    });
});

// GET /api/pests/treatments - Get treatment options
router.get('/treatments', (req, res) => {
    // Implementation for getting treatment options
    const { pestId, crop, severity } = req.query;
    
    res.json({ 
        message: 'Get treatment options',
        data: {
            pestId,
            crop,
            severity,
            treatments: [
                {
                    type: 'chemical',
                    name: 'Chlorantraniliprole',
                    dosage: '0.4ml per liter',
                    application: 'Foliar spray',
                    timing: 'Early morning or evening',
                    frequency: 'Once every 15 days',
                    precautions: ['Use protective gear', 'Avoid spraying during flowering']
                },
                {
                    type: 'biological',
                    name: 'Trichogramma wasps',
                    dosage: '50,000 wasps per hectare',
                    application: 'Release in field',
                    timing: 'Early crop stage',
                    frequency: 'Weekly for 6 weeks',
                    precautions: ['Avoid pesticides 15 days before and after release']
                }
            ]
        }
    });
});

// POST /api/pests/report - Report pest outbreak
router.post('/report', (req, res) => {
    // Implementation for reporting pest outbreak
    const { 
        farmerId, 
        pestId, 
        crop, 
        location, 
        severity, 
        affectedArea, 
        description,
        images 
    } = req.body;
    
    res.json({ 
        message: 'Report pest outbreak',
        data: {
            reportId: Date.now(),
            farmerId,
            pestId,
            crop,
            location,
            severity,
            affectedArea,
            status: 'reported',
            reportDate: new Date().toISOString(),
            estimatedResponse: '24-48 hours'
        }
    });
});

// GET /api/pests/forecast - Get pest forecast
router.get('/forecast', (req, res) => {
    // Implementation for pest forecast
    const { location, crop, timeframe } = req.query;
    
    res.json({ 
        message: 'Get pest forecast',
        data: {
            location,
            crop,
            timeframe,
            forecast: [
                {
                    pest: 'Stem Borer',
                    riskLevel: 'high',
                    peakPeriod: 'Next 2-3 weeks',
                    weatherFactors: ['High humidity', 'Moderate temperature'],
                    prevention: 'Monitor regularly and apply preventive measures'
                },
                {
                    pest: 'Brown Plant Hopper',
                    riskLevel: 'moderate',
                    peakPeriod: 'Next 4-5 weeks',
                    weatherFactors: ['Continuous rains expected'],
                    prevention: 'Maintain proper drainage'
                }
            ]
        }
    });
});

// GET /api/pests/alerts - Get pest alerts for region
router.get('/alerts', (req, res) => {
    // Implementation for getting pest alerts
    const { location, radius } = req.query;
    
    res.json({ 
        message: 'Get pest alerts',
        data: {
            location,
            radius: radius || '50km',
            alerts: [
                {
                    id: 1,
                    pest: 'Fall Army Worm',
                    crop: 'Maize',
                    severity: 'high',
                    affectedArea: '500 hectares',
                    distance: '15km',
                    reportedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    action: 'immediate'
                }
            ]
        }
    });
});

module.exports = router;