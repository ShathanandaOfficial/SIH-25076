const mongoose = require('mongoose');

const schemeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true
    },
    shortCode: String,
    description: {
        type: String,
        required: true
    },
    objective: String,
    category: {
        type: String,
        enum: ['income_support', 'insurance', 'credit', 'subsidy', 'technology', 'marketing', 'infrastructure'],
        required: true
    },
    launchedBy: {
        type: String,
        enum: ['central_government', 'state_government', 'joint'],
        required: true
    },
    launchDate: Date,
    status: {
        type: String,
        enum: ['active', 'inactive', 'suspended', 'closed'],
        default: 'active'
    },
    benefits: {
        monetaryBenefit: {
            amount: String,
            frequency: String,
            installments: Number
        },
        nonMonetaryBenefit: [String],
        coverage: String
    },
    eligibility: {
        criteria: [String],
        targetBeneficiaries: [String],
        exclusions: [String],
        landRequirement: {
            minimum: Number,
            maximum: Number,
            unit: String
        },
        incomeLimit: {
            minimum: Number,
            maximum: Number
        },
        ageLimit: {
            minimum: Number,
            maximum: Number
        },
        geographicScope: [String]
    },
    application: {
        process: [String],
        requiredDocuments: [String],
        applicationFee: Number,
        onlinePortal: String,
        offlineProcess: String,
        deadline: {
            type: String,
            seasonal: Boolean
        }
    },
    implementation: {
        nodal_ministry: String,
        implementing_agency: String,
        monitoring_mechanism: String
    },
    budget: {
        totalAllocation: Number,
        yearlyAllocation: Number,
        utilization: Number,
        beneficiaryCount: Number
    },
    timeline: {
        applicationPeriod: String,
        processingTime: String,
        disbursementSchedule: String
    },
    contactInfo: {
        helpline: String,
        email: String,
        website: String,
        address: String
    },
    performance: {
        targetBeneficiaries: Number,
        achievedBeneficiaries: Number,
        successRate: Number,
        impactAssessment: String
    },
    relatedSchemes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scheme'
    }],
    documents: [String],
    faqs: [{
        question: String,
        answer: String
    }],
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Index for better search performance
schemeSchema.index({ name: 'text', fullName: 'text', description: 'text' });
schemeSchema.index({ category: 1, status: 1 });
schemeSchema.index({ launchedBy: 1 });
schemeSchema.index({ 'eligibility.geographicScope': 1 });
schemeSchema.index({ status: 1, 'application.deadline': 1 });

module.exports = mongoose.model('Scheme', schemeSchema);