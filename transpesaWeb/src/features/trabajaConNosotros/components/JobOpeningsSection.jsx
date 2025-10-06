"use client"

import { useState, useEffect } from "react"
import { useTranslation, Trans } from "react-i18next"
import useApi from "@/hooks/useApi"

const JobCard = ({ job, onApply }) => {
  const { t } = useTranslation()

  return (
    <div className="bg-white border rounded-md shadow-sm border-t-4 border-red-600 p-6">
      <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-12">
        <div className="md:col-span-7">
          <h3 className="text-lg font-bold text-gray-800">{job.title}</h3>
          <ul className="mt-3 list-disc list-inside space-y-1 text-sm text-gray-600">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
        <div className="md:col-span-2 text-left md:text-center">
          <p className="text-xs font-semibold text-gray-500 uppercase">{t("jobsCardDateLabel")}</p>
          <p className="font-medium text-gray-800">{job.publicationDate}</p>
        </div>
        <div className="md:col-span-3 flex justify-start md:justify-end">
          <button
            onClick={() => onApply(job)}
            className="w-full md:w-auto rounded-md bg-red-600 px-6 py-3 text-sm font-bold text-white text-center shadow-sm hover:bg-red-700 transition-colors"
          >
            {t("jobsCardApplyButton")}
          </button>
        </div>
      </div>
    </div>
  )
}

export default function JobOpeningsSection({ onJobSelect }) {
  const { t } = useTranslation()
  const api = useApi()
  const [jobOpenings, setJobOpenings] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadJobs = async () => {
      if (loading) return

      setLoading(true)
      try {
        const data = await api.get("/jobs")
        setJobOpenings(data)
      } catch (error) {
        console.error("Error al cargar los puestos de trabajo:", error)
      } finally {
        setLoading(false)
      }
    }
    loadJobs()
  }, [])

  const handleApply = (job) => {
    if (onJobSelect) {
      onJobSelect(job)
    }
  }

  return (
    <section className="bg-gray-50 py-16 sm:py-20">
      <div className="container mx-auto max-w-5xl px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl sm:text-4xl font-bold">
          <Trans i18nKey="jobsMainTitle">
            <span className="text-red-600" />
          </Trans>
        </h2>
        <div className="space-y-6">
          {jobOpenings.length > 0 ? (
            jobOpenings.map((job) => <JobCard key={job.id} job={job} onApply={handleApply} />)
          ) : (
            <p className="text-center text-gray-500">{t("jobsNoOpenings")}</p>
          )}
        </div>
      </div>
    </section>
  )
}
