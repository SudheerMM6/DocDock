import { createElement } from "react";
import { useNavigate } from "react-router-dom";
import { IconStethoscope, IconCalendar, IconUserCheck, IconArrowRight } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { assets } from "../assets/assets";

const FeatureItem = ({ icon, title, description }) => (
  <div className="p-6 bg-[var(--color-canvas-white)] rounded-card border border-[var(--border)]">
    <div className="w-10 h-10 rounded-lg bg-[var(--surface)] flex items-center justify-center mb-4">
      {createElement(icon, { className: "w-5 h-5 text-[var(--ink)]" })}
    </div>
    <h3 className="font-semibold text-[var(--ink)] text-lg mb-2">{title}</h3>
    <p className="text-[var(--ink-secondary)] text-sm leading-relaxed">{description}</p>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[var(--color-canvas-white)]">
      <Section size="lg">
        <Container>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[var(--ink)] leading-[1.05] tracking-[-0.03em]">
                Healthcare appointments, simplified.
              </h1>
              <p className="text-lg text-[var(--ink-secondary)] max-w-lg leading-relaxed">
                Browse doctor profiles, choose an available slot, and manage appointments from one account.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button variant="primary" size="lg" onClick={() => navigate("/doctors")}>
                  Book appointment
                  <IconArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate("/doctors")}>
                  See doctors
                </Button>
              </div>
            </div>

            <div className="relative aspect-square lg:aspect-auto lg:h-[500px] rounded-card border border-[var(--border)] overflow-hidden bg-[var(--surface)]">
              <img
                src={assets.appointment_img}
                alt="Doctor pointing toward booking options"
                className="w-full h-full object-contain p-4"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section size="md" className="bg-[var(--surface)]">
        <Container>
          <div className="text-center mb-10">
            <p className="text-sm text-[var(--ink-secondary)] uppercase tracking-wider mb-3">How it works</p>
            <h2 className="text-3xl md:text-4xl font-bold text-[var(--ink)] tracking-[-0.02em]">Three steps to book care</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <FeatureItem
              icon={IconStethoscope}
              title="Connect"
              description="Browse doctors by speciality and compare experience, fees, and availability."
            />
            <FeatureItem
              icon={IconCalendar}
              title="Book"
              description="Pick a date and time from the available slots, then confirm the appointment."
            />
            <FeatureItem
              icon={IconUserCheck}
              title="Manage"
              description="Track appointments, update your profile, and complete payment through Razorpay."
            />
          </div>
        </Container>
      </Section>

      <Section size="md">
        <Container>
          <div className="bg-[var(--ink)] rounded-card p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-[-0.02em]">
              Ready to book your appointment?
            </h2>
            <p className="text-white/70 max-w-lg mx-auto mt-4 mb-8">
              Start with the doctor list and book a slot that works for you.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/doctors")}
              className="bg-white text-[var(--ink)] border-white hover:bg-[var(--surface)]"
            >
              Get started
              <IconArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </Container>
      </Section>
    </div>
  );
};

export default LandingPage;
