'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  category: string
  description: string | null
  client?: string | null
  loc?: string | null
  image_url: string
  images?: string[]
  featured: boolean
  created_at: string
}

export default function AdminDashboard() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // حالات البحث والترتيب
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'title' | 'featured'>('newest')

  // حالة المشروع الجاري تعديله
  const [editingProject, setEditingProject] = useState<Project | null>(null)

  // حالات النموذج
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('صوامع ومطاحن')
  const [description, setDescription] = useState('')
  const [client, setClient] = useState('')
  const [loc, setLoc] = useState('')
  const [featured, setFeatured] = useState(false)
  
  // إدارة وترتيب الصور القديمة والجديدة
  const [existingImages, setExistingImages] = useState<string[]>([])
  const [imageFiles, setImageFiles] = useState<File[]>([])

  const supabase = createClient()
  const router = useRouter()

  // جلب قائمة المشاريع
  const fetchProjects = useCallback(async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('خطأ في جلب المشاريع:', error)
    } else {
      setProjects(data || [])
    }
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // التصفية والترتيب الديناميكي
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        const query = searchQuery.trim().toLowerCase()
        if (!query) return true
        return (
          project.title.toLowerCase().includes(query) ||
          project.category.toLowerCase().includes(query) ||
          (project.client && project.client.toLowerCase().includes(query)) ||
          (project.loc && project.loc.toLowerCase().includes(query)) ||
          (project.description && project.description.toLowerCase().includes(query))
        )
      })
      .sort((a, b) => {
        if (sortBy === 'newest') {
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        }
        if (sortBy === 'oldest') {
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        }
        if (sortBy === 'title') {
          return a.title.localeCompare(b.title, 'ar')
        }
        if (sortBy === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
        }
        return 0
      })
  }, [projects, searchQuery, sortBy])

  // بدء التعديل وتعبئة كافة البيانات
  const handleStartEdit = (project: Project) => {
    setEditingProject(project)
    setTitle(project.title)
    setCategory(project.category)
    setDescription(project.description || '')
    setClient(project.client || '')
    setLoc(project.loc || '')
    setFeatured(project.featured)

    const imgs = project.images && project.images.length > 0 
      ? project.images 
      : (project.image_url ? [project.image_url] : [])
    setExistingImages(imgs)
    setImageFiles([])

    setError('')
    setSuccess('')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // تحريك صورة قديمة للأمام أو الخلف (إعادة ترتيب)
  const moveExistingImage = (index: number, direction: 'left' | 'right') => {
    const newImgs = [...existingImages]
    const targetIndex = direction === 'left' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= newImgs.length) return

    const temp = newImgs[index]
    newImgs[index] = newImgs[targetIndex]
    newImgs[targetIndex] = temp
    setExistingImages(newImgs)
  }

  // حذف صورة واحدة من الصور القديمة
  const handleRemoveExistingImage = (urlToRemove: string) => {
    if (existingImages.length === 1 && imageFiles.length === 0) {
      alert('يجب أن يحتوي المشروع على صورة واحدة على الأقل!')
      return
    }
    setExistingImages(existingImages.filter((img) => img !== urlToRemove))
  }

  // إلغاء التعديل
  const handleCancelEdit = () => {
    setEditingProject(null)
    setTitle('')
    setCategory('صوامع ومطاحن')
    setDescription('')
    setClient('')
    setLoc('')
    setFeatured(false)
    setExistingImages([])
    setImageFiles([])
    setError('')
    setSuccess('')
  }

  // حفظ المشروع (إضافة أو تعديل)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!editingProject && imageFiles.length === 0) {
      setError('يرجى اختيار صورة واحدة على الأقل للمشروع')
      return
    }

    if (editingProject && existingImages.length === 0 && imageFiles.length === 0) {
      setError('يرجى الإبقاء على صورة واحدة أو رفع صورة جديدة')
      return
    }

    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const newlyUploadedUrls: string[] = []

      // رفع الصور الجديدة إن وجدت
      if (imageFiles.length > 0) {
        for (const file of imageFiles) {
          const fileExt = file.name.split('.').pop()
          const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`

          const { error: uploadError } = await supabase.storage
            .from('project-images')
            .upload(fileName, file)

          if (uploadError) {
            throw new Error(`فشل رفع الصورة (${file.name}): ${uploadError.message}`)
          }

          const { data: publicUrlData } = supabase.storage
            .from('project-images')
            .getPublicUrl(fileName)

          newlyUploadedUrls.push(publicUrlData.publicUrl)
        }
      }

      // دمج الصور مع الترتيب المعدل
      const finalImages = editingProject 
        ? [...existingImages, ...newlyUploadedUrls]
        : newlyUploadedUrls

      const finalMainImageUrl = finalImages[0] || ''

      const projectPayload = {
        title,
        category,
        description: description || null,
        client: client || null,
        loc: loc || null,
        image_url: finalMainImageUrl,
        images: finalImages,
        featured,
      }

      if (editingProject) {
        const { error: updateError } = await supabase
          .from('projects')
          .update(projectPayload)
          .eq('id', editingProject.id)

        if (updateError) throw new Error(`فشل تحديث البيانات: ${updateError.message}`)
        setSuccess('تم تحديث البيانات وإعادة ترتيب الصور بنجاح!')
      } else {
        const { error: insertError } = await supabase
          .from('projects')
          .insert([projectPayload])

        if (insertError) throw new Error(`فشل حفظ البيانات: ${insertError.message}`)
        setSuccess('تم إضافة المشروع ومجموعة الصور بنجاح!')
      }

      handleCancelEdit()
      fetchProjects()
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'حدث خطأ غير متوقع'
      setError(errorMessage)
    } finally {
      setSubmitting(false)
    }
  }

  // حذف مشروع بالكامل
  const handleDeleteProject = async (project: Project) => {
    if (!confirm('هل أنت تأكد من رغبتك في حذف هذا المشروع؟')) return

    try {
      const { error: deleteDbError } = await supabase
        .from('projects')
        .delete()
        .eq('id', project.id)

      if (deleteDbError) throw deleteDbError

      const urlsToDelete = project.images && project.images.length > 0 
        ? project.images 
        : [project.image_url]

      const fileNames = urlsToDelete
        .map((url) => url.split('/').pop())
        .filter((name): name is string => Boolean(name))

      if (fileNames.length > 0) {
        await supabase.storage.from('project-images').remove(fileNames)
      }

      if (editingProject?.id === project.id) {
        handleCancelEdit()
      }

      setProjects(projects.filter((p) => p.id !== project.id))
    } catch (err) {
      console.error('فشل الحذف:', err)
      alert('حدث خطأ أثناء محاولة الحذف')
    }
  }

  // تسجيل الخروج
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      window.location.href = '/admin/login'
    } catch (err) {
      console.error('خطأ أثناء تسجيل الخروج:', err)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10" dir="rtl">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* الهيدر وزر الخروج */}
        <div className="flex justify-between items-center border-b border-slate-800 pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white">لوحة إدارة المشاريع</h1>
            <p className="text-slate-400 text-sm mt-1">شركة العهد الصناعي للمقاولات العامة</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 px-4 py-2 rounded-lg text-sm font-medium transition"
          >
            تسجيل الخروج
          </button>
        </div>

        {/* شبكة العرض */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* قسم النموذج */}
          <div className="lg:col-span-1 bg-slate-900 border border-slate-800 p-6 rounded-2xl h-fit space-y-6">
            <div className="flex justify-between items-center border-b border-slate-800 pb-3">
              <h2 className="text-xl font-bold text-amber-500">
                {editingProject ? 'تعديل بيانات المشروع' : 'إضافة مشروع جديد'}
              </h2>
              {editingProject && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="text-xs text-slate-400 hover:text-white underline transition"
                >
                  إلغاء التعديل
                </button>
              )}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg">
                {error}
              </div>
            )}

            {success && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm p-3 rounded-lg">
                {success}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">عنوان المشروع *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="مثال: تنفيذ صومعة أسرابيا"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">نوع المشروع *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition"
                >
                  <option value="صوامع ومطاحن">صوامع ومطاحن</option>
                  <option value="خطوط إنتاج وأعمال MEBJ">خطوط إنتاج وأعمال MEBJ</option>
                  <option value="أحواض كيماويات">أحواض كيماويات</option>
                  <option value="أرضيات صناعية">أرضيات صناعية</option>
                  <option value="مستودعات وهناجر">مستودعات وهناجر</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">العميل / الشركة المالكة</label>
                <input
                  type="text"
                  value={client}
                  onChange={(e) => setClient(e.target.value)}
                  placeholder="مثال: شركة النصر للصوامع"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">الموقع الجغرافي (اللوكيشن)</label>
                <input
                  type="text"
                  value={loc}
                  onChange={(e) => setLoc(e.target.value)}
                  placeholder="مثال: الشرقية، مصر"
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">وصف أو تفاصيل المشروع</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="اكتب تفاصيل مختصرة..."
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-amber-500 transition resize-none"
                />
              </div>

              {/* تحريك وإعادة ترتيب الصور الحالية عند التعديل */}
              {editingProject && existingImages.length > 0 && (
                <div className="space-y-2 border-t border-b border-slate-800 py-3">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-semibold text-slate-300">
                      ترتيب الصور الحالية (الأولى هي الغلاف الرئيسي):
                    </label>
                    <span className="text-[11px] text-amber-400 font-medium">
                      {existingImages.length} صور
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {existingImages.map((src, i) => (
                      <div key={src} className="relative aspect-square rounded-lg overflow-hidden border border-slate-700 bg-slate-950 group">
                        <Image src={src} alt="" fill className="object-cover" sizes="100px" />
                        
                        {/* شارة الصورة الرئيسية */}
                        {i === 0 && (
                          <span className="absolute top-1 right-1 bg-amber-500 text-slate-950 text-[9px] font-black px-1.5 py-0.5 rounded shadow">
                            غلاف
                          </span>
                        )}

                        {/* زر الحذف */}
                        <button
                          type="button"
                          onClick={() => handleRemoveExistingImage(src)}
                          className="absolute top-1 left-1 bg-red-600/90 text-white rounded-full w-4 h-4 flex items-center justify-center text-[9px] font-bold opacity-80 hover:opacity-100 transition"
                          title="حذف"
                        >
                          ✕
                        </button>

                        {/* أزرار التحريك والتوجيه */}
                        <div className="absolute bottom-1 inset-x-1 flex justify-between gap-1 opacity-90">
                          <button
                            type="button"
                            disabled={i === 0}
                            onClick={() => moveExistingImage(i, 'left')}
                            className="bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white text-[10px] w-full py-0.5 rounded border border-slate-700 transition disabled:opacity-30"
                            title="تحريك للأمام"
                          >
                            ▶
                          </button>
                          <button
                            type="button"
                            disabled={i === existingImages.length - 1}
                            onClick={() => moveExistingImage(i, 'right')}
                            className="bg-slate-900/90 hover:bg-amber-500 hover:text-slate-950 text-white text-[10px] w-full py-0.5 rounded border border-slate-700 transition disabled:opacity-30"
                            title="تحريك للخلف"
                          >
                            ◀
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">
                  {editingProject ? 'إضافة صور جديدة للمشروع (اختياري)' : 'صور المشروع (يمكن اختيار عدة صور) *'}
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  required={!editingProject && existingImages.length === 0}
                  onChange={(e) => setImageFiles(Array.from(e.target.files || []))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 file:mr-4 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-amber-500 file:text-slate-950 hover:file:bg-amber-600 transition"
                />
                {imageFiles.length > 0 && (
                  <p className="text-xs text-amber-400 mt-1.5 font-medium">
                    سيتم رفع وترتيب {imageFiles.length} صور جديدة
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 rounded"
                />
                <label htmlFor="featured" className="text-sm text-slate-300">
                  عرض المشروع في الصفحة الرئيسية (مميز)
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {submitting
                    ? 'جاري الحفظ...'
                    : editingProject
                    ? 'تحديث وتثبيت الترتيب'
                    : 'إضافة المشروع'}
                </button>
                {editingProject && (
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium px-4 py-3 rounded-lg transition"
                  >
                    إلغاء
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* قسم عرض المشاريع */}
          <div className="lg:col-span-2 space-y-6">
            
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-2/3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="ابحث بالاسم، الفئة، العميل، أو الموقع..."
                  className="w-full bg-slate-950 border border-slate-800 text-white rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 transition pr-10"
                />
                <span className="absolute left-3 top-2.5 text-slate-500 text-sm">🔍</span>
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto">
                <span className="text-xs text-slate-400 whitespace-nowrap">الترتيب:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-950 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 transition w-full md:w-auto"
                >
                  <option value="newest">الأحدث أولاً</option>
                  <option value="oldest">الأقدّم أولاً</option>
                  <option value="title">أبجدياً (حسب العنوان)</option>
                  <option value="featured">المشاريع المميزة أولاً</option>
                </select>
              </div>
            </div>

            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold text-white">
                المشاريع ({filteredProjects.length} من {projects.length})
              </h2>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-xs text-amber-400 hover:underline"
                >
                  مسح البحث
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12 text-slate-500">جاري تحميل المشاريع...</div>
            ) : filteredProjects.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-400 space-y-2">
                <p className="font-bold text-lg">لا توجد نتائج مطابقة لـ "{searchQuery}"</p>
                <p className="text-sm text-slate-500">جرب البحث بكلمة مختلفة أو قم بإعادة ضبط التصفية.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={`bg-slate-900 border rounded-xl overflow-hidden flex flex-col justify-between group transition ${
                      editingProject?.id === project.id
                        ? 'border-amber-500 ring-2 ring-amber-500/20'
                        : 'border-slate-800'
                    }`}
                  >
                    <div className="relative h-48 w-full bg-slate-950">
                      <Image
                        src={project.image_url}
                        alt={project.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2 flex gap-1.5">
                        {project.featured && (
                          <span className="bg-amber-500 text-slate-950 text-xs font-bold px-2.5 py-1 rounded-full shadow">
                            مميز
                          </span>
                        )}
                        <span className="bg-slate-950/80 backdrop-blur text-white text-xs font-medium px-2.5 py-1 rounded-full border border-slate-700">
                          {project.images?.length || 1} صور
                        </span>
                      </div>
                    </div>

                    <div className="p-4 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-xs text-amber-400 font-medium">{project.category}</span>
                        <h3 className="text-lg font-bold text-white mt-1">{project.title}</h3>
                        
                        {(project.client || project.loc) && (
                          <div className="flex flex-wrap gap-3 text-xs text-slate-400 mt-2 bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                            {project.client && <span>👤 <strong className="text-slate-300">العميل:</strong> {project.client}</span>}
                            {project.loc && <span>📍 <strong className="text-slate-300">الموقع:</strong> {project.loc}</span>}
                          </div>
                        )}

                        {project.description && (
                          <p className="text-sm text-slate-400 line-clamp-2 mt-2">
                            {project.description}
                          </p>
                        )}
                      </div>

                      <div className="pt-4 border-t border-slate-800/80 flex justify-between items-center">
                        <button
                          onClick={() => handleStartEdit(project)}
                          className="bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 text-xs px-3 py-1.5 rounded-lg border border-amber-500/20 font-medium transition"
                        >
                          تعديل وترتيب الصور
                        </button>
                        <button
                          onClick={() => handleDeleteProject(project)}
                          className="bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs px-3 py-1.5 rounded-lg border border-red-500/20 transition"
                        >
                          حذف المشروع
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  )
}