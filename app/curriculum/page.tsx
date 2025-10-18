"use client"

import { useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"

export default function CurriculumMaskedPage() {
  const router = useRouter()
  const search = useSearchParams()

  useEffect(() => {
    const q = search.get("id")
    if (q) {
      const idNum = Number(q)
      if (Number.isFinite(idNum) && idNum > 0) {
        localStorage.setItem("selectedUserId", String(idNum))
        router.replace(`/curriculum/${idNum}`)
        return
      }
    }
    const saved = Number(localStorage.getItem("selectedUserId") || "")
    if (Number.isFinite(saved) && saved > 0) {
      router.replace(`/curriculum/${saved}`)
    } else {
      localStorage.setItem("selectedUserId", "1")
      router.replace(`/curriculum/1`)
    }
  }, [router, search])

  return <div className="max-w-4xl mx-auto px-4 py-10 text-muted-foreground">Cargando curriculum…</div>
}
