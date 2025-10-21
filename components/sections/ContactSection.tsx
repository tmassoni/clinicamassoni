'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  CONTACT_WHATSAPP_NUMBER,
  CONTACT_WHATSAPP_FORMATTED,
  CONTACT_PHONE_FORMATTED,
  CONTACT_EMAIL,
  CLINIC_ADDRESS_FULL,
  CLINIC_HOURS_FORMATTED,
  CLINIC_COORDINATES,
} from '@/lib/constants'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Send,
  CheckCircle2,
} from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
})

type FormData = z.infer<typeof formSchema>

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      message: '',
    },
  })

  async function onSubmit(data: FormData) {
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    console.log('Form data:', data)

    setIsSuccess(true)
    setIsSubmitting(false)

    // Reset form after 3 seconds
    setTimeout(() => {
      form.reset()
      setIsSuccess(false)
    }, 3000)
  }

  return (
    <section
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 bg-gradient-to-b from-white to-[#C8CFD3]/10 overflow-hidden"
      id="contato"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(4,43,72,0.03),transparent_60%)] pointer-events-none" />

      <div className="container relative z-10 px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16">
          <Badge variant="primary" size="lg" className="mb-4">
            Entre em Contato
          </Badge>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#042B48] mb-6">
            Agende sua{' '}
            <span className="bg-gradient-to-r from-[#3C576A] to-[#042B48] bg-clip-text text-transparent">
              Consulta
            </span>
          </h2>

          <p className="text-lg sm:text-xl text-[#6A7E8B] leading-relaxed">
            Estamos prontos para cuidar do seu sorriso
          </p>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Contact Form - Left Side (60%) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl border border-[#C8CFD3]/50 p-8 sm:p-10 lg:p-12 shadow-xl">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#042B48] mb-3">
                    Mensagem Enviada!
                  </h3>
                  <p className="text-[#6A7E8B]">
                    Entraremos em contato em breve.
                  </p>
                </div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-[#042B48] mb-2">
                    Envie sua mensagem
                  </h3>
                  <p className="text-[#6A7E8B] mb-8">
                    Preencha o formulário abaixo e retornaremos o mais breve
                    possível
                  </p>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="space-y-6"
                    >
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#042B48] font-semibold">
                              Nome Completo
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Seu nome"
                                className="h-12 rounded-xl border-[#C8CFD3] focus:border-[#042B48] focus:ring-[#042B48]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <div className="grid sm:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#042B48] font-semibold">
                                Email
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="email"
                                  placeholder="seu@email.com"
                                  className="h-12 rounded-xl border-[#C8CFD3] focus:border-[#042B48] focus:ring-[#042B48]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-[#042B48] font-semibold">
                                Telefone
                              </FormLabel>
                              <FormControl>
                                <Input
                                  type="tel"
                                  placeholder="(45) 99999-9999"
                                  className="h-12 rounded-xl border-[#C8CFD3] focus:border-[#042B48] focus:ring-[#042B48]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#042B48] font-semibold">
                              Mensagem
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Conte-nos como podemos ajudar..."
                                className="min-h-[150px] rounded-xl border-[#C8CFD3] focus:border-[#042B48] focus:ring-[#042B48] resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Enviar Mensagem
                          </>
                        )}
                      </Button>
                    </form>
                  </Form>
                </>
              )}
            </div>
          </div>

          {/* Contact Info - Right Side (40%) */}
          <div className="lg:col-span-2 space-y-6">
            {/* WhatsApp Card */}
            <a
              href={`https://wa.me/${CONTACT_WHATSAPP_NUMBER.replace(
                /\D/g,
                ''
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-3xl p-8 text-white transition-all duration-300 hover:shadow-2xl hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-medium opacity-90 mb-1">
                      WhatsApp
                    </p>
                    <p className="text-xl font-bold mb-2">
                      {CONTACT_WHATSAPP_FORMATTED}
                    </p>
                    <p className="text-sm opacity-90">
                      Clique para conversar agora
                    </p>
                  </div>
                </div>
              </div>
            </a>

            {/* Phone Card */}
            <div className="bg-white rounded-3xl border border-[#C8CFD3]/50 p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#042B48]/5 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-[#042B48]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6A7E8B] mb-1">
                    Telefone
                  </p>
                  <a
                    href={`tel:${CONTACT_PHONE_FORMATTED.replace(/\D/g, '')}`}
                    className="text-lg font-bold text-[#042B48] hover:text-[#3C576A] transition-colors"
                  >
                    {CONTACT_PHONE_FORMATTED}
                  </a>
                </div>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl border border-[#C8CFD3]/50 p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#042B48]/5 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-[#042B48]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#6A7E8B] mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-lg font-bold text-[#042B48] hover:text-[#3C576A] transition-colors truncate block"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
            </div>

            {/* Address Card */}
            <div className="bg-white rounded-3xl border border-[#C8CFD3]/50 p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#042B48]/5 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#042B48]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6A7E8B] mb-1">
                    Endereço
                  </p>
                  <p className="text-sm font-semibold text-[#042B48] leading-relaxed">
                    {CLINIC_ADDRESS_FULL}
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-3xl border border-[#C8CFD3]/50 p-6 shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-2xl bg-[#042B48]/5 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-[#042B48]" />
                </div>
                <div>
                  <p className="text-sm font-medium text-[#6A7E8B] mb-2">
                    Horário de Atendimento
                  </p>
                  <div className="space-y-1 text-sm text-[#042B48]">
                    <p className="font-semibold">
                      {CLINIC_HOURS_FORMATTED.weekdays}
                    </p>
                    <p className="text-[#6A7E8B]">
                      {CLINIC_HOURS_FORMATTED.saturday}
                    </p>
                    <p className="text-[#6A7E8B]">
                      {CLINIC_HOURS_FORMATTED.sunday}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Google Maps */}
        <div className="rounded-3xl overflow-hidden shadow-2xl border border-[#C8CFD3]/50">
          <div className="relative aspect-[16/9] sm:aspect-[21/9] bg-[#C8CFD3]/20">
            <iframe
              src={`https://www.google.com/maps?q=${CLINIC_COORDINATES.latitude},${CLINIC_COORDINATES.longitude}&hl=pt-BR&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
