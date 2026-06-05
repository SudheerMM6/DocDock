import React from 'react'
import { assets } from '../assets/assets'
import { PageHeader } from '../components/layout/PageHeader'
import { Container } from '../components/layout/Container'
import { Section } from '../components/layout/Section'
import { Button } from '../components/ui/button'

const Contact = () => {
  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <PageHeader
        title="Contact us"
        subtitle="Project and support information for the appointment workflow"
      />

      <Section size="sm">
        <Container>
          <div className="flex flex-col md:flex-row gap-8 lg:gap-10">
            <img
              className="w-full md:w-[360px] md:h-auto object-cover rounded-card border border-[var(--border)]"
              src={assets.contact_image}
              alt="Doctor consultation"
            />

            <div className="flex-1 flex flex-col justify-center gap-6">
              <div>
                <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-2">Support</p>
                <p className="text-[var(--ink)] text-lg font-medium">Appointment and account help</p>
                <p className="text-[var(--ink-secondary)]">
                  Patients can manage bookings from the appointments page after login.
                </p>
              </div>

              <p className="text-[var(--ink-secondary)] text-sm max-w-xl">
                This portfolio version does not include a public support inbox. In a production version,
                this page would connect to email or ticketing.
              </p>

              <div className="pt-6 border-t border-[var(--border)]">
                <p className="font-mono text-xs text-[var(--ink-secondary)] uppercase tracking-wider mb-2">Project</p>
                <p className="font-semibold text-[var(--ink)] text-lg">DocDock appointment booking</p>
                <p className="text-[var(--ink-secondary)] mt-2 max-w-sm leading-relaxed">
                  The source code includes setup and deployment notes for local review.
                </p>
                <Button variant="outline" className="mt-4" onClick={() => window.location.href = '/doctors'}>
                  View doctors
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  )
}

export default Contact
