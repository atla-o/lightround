export const gcp = {
  projectId: process.env.GOOGLE_CLOUD_PROJECT || process.env.GCP_PROJECT_ID || "devo-holding",
  organization: "atla-o.com",
  folder: "Devo",
  region: process.env.GCP_REGION || "us-west1",
  firestoreDatabase: process.env.FIRESTORE_DATABASE || "(default)",
  cloudRunService: process.env.CLOUD_RUN_SERVICE || "lightround-web",
  collections: {
    lpNotes: "lightround_lp_notes",
  },
} as const
