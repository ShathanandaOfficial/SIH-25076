const express = require('express');
const router = express.Router();

// Government schemes and subsidies routes
router.get('/', (req, res) => {
    res.json({ message: 'Schemes routes - Government schemes and subsidies' });
});

// GET /api/schemes/list - Get list of available schemes
router.get('/list', (req, res) => {
    // Implementation for getting schemes list
    const { category, state, beneficiaryType, status } = req.query;
    
    res.json({ 
        message: 'Get schemes list',
        data: {
            schemes: [
                {
                    id: 1,
                    name: 'PM-KISAN',
                    fullName: 'Pradhan Mantri Kisan Samman Nidhi',
                    category: 'income_support',
                    description: 'Direct income support to farmers',
                    benefit: '₹6,000 per year in 3 installments',
                    eligibility: 'All landholding farmers',
                    status: 'active',
                    applicationDeadline: null,
                    launchedBy: 'Central Government'
                },
                {
                    id: 2,
                    name: 'PMFBY',
                    fullName: 'Pradhan Mantri Fasal Bima Yojana',
                    category: 'insurance',
                    description: 'Crop insurance scheme',
                    benefit: 'Coverage against crop loss',
                    eligibility: 'All farmers (loanee and non-loanee)',
                    status: 'active',
                    applicationDeadline: 'Before sowing season',
                    launchedBy: 'Central Government'
                },
                {
                    id: 3,
                    name: 'KCC',
                    fullName: 'Kisan Credit Card',
                    category: 'credit',
                    description: 'Credit facility for farmers',
                    benefit: 'Low interest agricultural loan',
                    eligibility: 'Farmers with land ownership/tenancy',
                    status: 'active',
                    applicationDeadline: null,
                    launchedBy: 'Central Government'
                }
            ],
            totalSchemes: 45,
            filters: { category, state, beneficiaryType, status }
        }
    });
});

// GET /api/schemes/:id - Get specific scheme details
router.get('/:id', (req, res) => {
    // Implementation for getting specific scheme details
    const { id } = req.params;
    
    res.json({ 
        message: 'Get scheme details',
        data: {
            id: parseInt(id),
            name: 'PM-KISAN',
            fullName: 'Pradhan Mantri Kisan Samman Nidhi',
            description: 'Central Sector Scheme providing income support to all landholding farmers',
            objective: 'To supplement financial needs of farmers in procuring various inputs to ensure proper crop health and appropriate yields',
            benefits: {
                amount: '₹6,000 per year',
                installments: '3 equal installments of ₹2,000 each',
                paymentMode: 'Direct Benefit Transfer (DBT)',
                frequency: 'Every 4 months'
            },
            eligibility: {
                criteria: [
                    'All landholding farmers (individual/family)',
                    'Cultivable land holding in their names',
                    'Both small and marginal farmers'
                ],
                exclusions: [
                    'Institutional land holders',
                    'Income tax payees',
                    'Government employees',
                    'Pensioners with monthly pension above ₹10,000'
                ]
            },
            documents: [
                'Aadhaar Card',
                'Bank Account Details',
                'Land ownership papers',
                'Mobile number'
            ],
            applicationProcess: {
                online: 'www.pmkisan.gov.in',
                offline: 'Village Revenue Officer/Patwari',
                steps: [
                    'Fill application form',
                    'Submit required documents',
                    'Verification by local officials',
                    'Approval and benefit transfer'
                ]
            },
            timeline: {
                application: 'Anytime',
                verification: '15-30 days',
                firstPayment: 'Within 2 months of approval'
            },
            contactInfo: {
                helpline: '155261 / 1800115526',
                email: 'pmkisan-ict@gov.in',
                website: 'www.pmkisan.gov.in'
            }
        }
    });
});

// GET /api/schemes/categories - Get scheme categories
router.get('/categories', (req, res) => {
    // Implementation for getting scheme categories
    res.json({ 
        message: 'Get scheme categories',
        data: {
            categories: [
                {
                    id: 'income_support',
                    name: 'Income Support',
                    description: 'Direct financial assistance to farmers',
                    schemeCount: 8
                },
                {
                    id: 'insurance',
                    name: 'Insurance',
                    description: 'Crop and livestock insurance schemes',
                    schemeCount: 5
                },
                {
                    id: 'credit',
                    name: 'Credit & Loans',
                    description: 'Agricultural credit and loan schemes',
                    schemeCount: 12
                },
                {
                    id: 'subsidy',
                    name: 'Subsidies',
                    description: 'Input subsidies for seeds, fertilizers, equipment',
                    schemeCount: 15
                },
                {
                    id: 'technology',
                    name: 'Technology',
                    description: 'Modern farming technology adoption schemes',
                    schemeCount: 7
                }
            ]
        }
    });
});

// POST /api/schemes/check-eligibility - Check eligibility for schemes
router.post('/check-eligibility', (req, res) => {
    // Implementation for checking scheme eligibility
    const { 
        farmerId,
        landHolding, 
        annualIncome, 
        category, 
        state, 
        district,
        cropTypes,
        farmingExperience 
    } = req.body;
    
    res.json({ 
        message: 'Check scheme eligibility',
        data: {
            farmerId,
            eligibleSchemes: [
                {
                    schemeId: 1,
                    name: 'PM-KISAN',
                    eligibilityScore: 100,
                    status: 'eligible',
                    estimatedBenefit: '₹6,000/year',
                    applicationStatus: 'not_applied'
                },
                {
                    schemeId: 2,
                    name: 'PMFBY',
                    eligibilityScore: 95,
                    status: 'eligible',
                    estimatedBenefit: 'Crop insurance coverage',
                    applicationStatus: 'not_applied'
                },
                {
                    schemeId: 15,
                    name: 'Soil Health Card',
                    eligibilityScore: 85,
                    status: 'partially_eligible',
                    estimatedBenefit: 'Free soil testing',
                    note: 'Available in your district'
                }
            ],
            ineligibleSchemes: [
                {
                    schemeId: 25,
                    name: 'Large Farmer Equipment Subsidy',
                    reason: 'Land holding below minimum requirement',
                    minimumRequirement: '5 acres'
                }
            ],
            totalEligible: 12,
            totalChecked: 45
        }
    });
});

// POST /api/schemes/apply - Apply for a scheme
router.post('/apply', (req, res) => {
    // Implementation for scheme application
    const { 
        farmerId, 
        schemeId, 
        documents, 
        personalDetails,
        bankDetails,
        landDetails 
    } = req.body;
    
    res.json({ 
        message: 'Apply for scheme',
        data: {
            applicationId: `APP${Date.now()}`,
            farmerId,
            schemeId,
            status: 'submitted',
            submissionDate: new Date().toISOString(),
            trackingNumber: `TRACK${Date.now()}`,
            nextSteps: [
                'Document verification by local official',
                'Field verification (if required)',
                'Approval by district collector',
                'Benefit disbursement'
            ],
            estimatedProcessingTime: '30-45 days',
            contactPerson: {
                name: 'Block Development Officer',
                phone: '+91-9876543210',
                office: 'Block Development Office'
            }
        }
    });
});

// GET /api/schemes/applications/:farmerId - Get farmer's applications
router.get('/applications/:farmerId', (req, res) => {
    // Implementation for getting farmer's applications
    const { farmerId } = req.params;
    const { status, page = 0, limit = 10 } = req.query;
    
    res.json({ 
        message: 'Get farmer applications',
        data: {
            farmerId,
            applications: [
                {
                    applicationId: 'APP1672891234567',
                    schemeId: 1,
                    schemeName: 'PM-KISAN',
                    status: 'approved',
                    appliedDate: '2024-01-15T10:30:00Z',
                    approvedDate: '2024-02-10T14:20:00Z',
                    benefit: '₹2,000 (1st installment received)',
                    nextPayment: '2024-05-15'
                },
                {
                    applicationId: 'APP1672891234568',
                    schemeId: 2,
                    schemeName: 'PMFBY',
                    status: 'under_review',
                    appliedDate: '2024-03-01T09:15:00Z',
                    expectedDecision: '2024-03-30',
                    documents: 'Verification pending'
                }
            ],
            pagination: {
                total: 5,
                page: parseInt(page),
                limit: parseInt(limit),
                totalPages: 1
            }
        }
    });
});

// GET /api/schemes/notifications - Get scheme notifications
router.get('/notifications', (req, res) => {
    // Implementation for getting scheme notifications
    const { state, district, category } = req.query;
    
    res.json({ 
        message: 'Get scheme notifications',
        data: {
            notifications: [
                {
                    id: 1,
                    type: 'new_scheme',
                    title: 'New Organic Farming Promotion Scheme Launched',
                    message: 'Government launches new scheme for organic farming with ₹50,000 subsidy',
                    date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                    category: 'subsidy',
                    actionRequired: true,
                    deadline: '2024-06-30'
                },
                {
                    id: 2,
                    type: 'deadline_reminder',
                    title: 'PMFBY Application Deadline Approaching',
                    message: 'Only 15 days left to apply for crop insurance under PMFBY',
                    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                    category: 'insurance',
                    actionRequired: true,
                    deadline: '2024-04-15'
                }
            ],
            filters: { state, district, category }
        }
    });
});

module.exports = router;