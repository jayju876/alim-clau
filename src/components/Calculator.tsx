import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator as CalculatorIcon, AlertTriangle, Mail, Printer, FileDown } from "lucide-react";
import { toast } from "sonner";
import { states, getStateBySlug } from "@/data/states";

interface CalculatorProps {
  state?: string;
}

type Estimate = {
  monthly: number;
  yearly: number;
  temporaryMonthly: number;
  longTermMonthly: number;
  suggestedDurationMonths: number;
  selectedState: string;
};

const Calculator = ({ state = "General" }: CalculatorProps) => {
  const defaultState = states.find((item) => item.name === state)?.slug || "general";
  const [selectedState, setSelectedState] = useState(defaultState);
  const [payerIncome, setPayerIncome] = useState("");
  const [recipientIncome, setRecipientIncome] = useState("");
  const [marriageDuration, setMarriageDuration] = useState("");
  const [children, setChildren] = useState("");
  const [childSupport, setChildSupport] = useState("");
  const [estimate, setEstimate] = useState<Estimate | null>(null);

  const activeState = selectedState === "general" ? undefined : getStateBySlug(selectedState);
  const activeStateName = activeState?.name || state || "US";

  const calculateAlimony = () => {
    const payer = parseFloat(payerIncome);
    const recipient = parseFloat(recipientIncome);
    const duration = parseFloat(marriageDuration);
    const numChildren = parseInt(children) || 0;
    const monthlyChildSupport = parseFloat(childSupport) || 0;

    if (!payer || !recipient || !duration) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (payer <= recipient) {
      toast.error("Payer income must be higher than recipient income");
      return;
    }

    const incomeDifference = payer - recipient;
    const guidelineFactor = activeState?.factor || 0.3;
    const durationMultiplier = Math.min(duration / 120, 1);
    const childAdjustment = Math.min(numChildren * 0.035, 0.14);
    const childSupportAdjustment = monthlyChildSupport * 0.35;

    const rawMonthly = ((incomeDifference * guidelineFactor * durationMultiplier) / 12) - childSupportAdjustment - ((incomeDifference * childAdjustment) / 12);
    const cappedMonthly = activeState?.cap ? Math.min(rawMonthly, activeState.cap) : rawMonthly;
    const monthlyEstimate = Math.max(0, cappedMonthly);

    setEstimate({
      monthly: monthlyEstimate,
      yearly: monthlyEstimate * 12,
      temporaryMonthly: Math.max(0, monthlyEstimate * 1.15),
      longTermMonthly: Math.max(0, monthlyEstimate * 0.9),
      suggestedDurationMonths: Math.max(6, Math.round(duration * 0.45)),
      selectedState: activeStateName
    });
    toast.success("Alimony estimate calculated");
  };

  const resetCalculator = () => {
    setPayerIncome("");
    setRecipientIncome("");
    setMarriageDuration("");
    setChildren("");
    setChildSupport("");
    setEstimate(null);
  };

  const money = (value: number) => value.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  });

  const emailResults = () => {
    if (!estimate) return;
    const body = [
      `${estimate.selectedState} alimony estimate`,
      `Estimated monthly alimony: ${money(estimate.monthly)}`,
      `Estimated yearly alimony: ${money(estimate.yearly)}`,
      `Temporary support estimate: ${money(estimate.temporaryMonthly)} per month`,
      `Long-term support estimate: ${money(estimate.longTermMonthly)} per month`,
      "This calculator provides estimated alimony figures based on publicly available guidelines and should not be considered legal advice."
    ].join("\n");
    window.location.href = `mailto:?subject=${encodeURIComponent("Alimony calculator results")}&body=${encodeURIComponent(body)}`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CalculatorIcon className="h-6 w-6 text-legal-blue" />
          {activeStateName} Alimony Calculator
        </CardTitle>
        <CardDescription>
          Enter annual income in USD to estimate temporary and long-term spousal support.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="state-selector">State</Label>
          <Select value={selectedState} onValueChange={setSelectedState}>
            <SelectTrigger id="state-selector">
              <SelectValue placeholder="Select a US state" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General US estimate</SelectItem>
              {states.map((item) => (
                <SelectItem key={item.code} value={item.slug}>{item.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="payer-income">Payer Annual Income *</Label>
            <Input
              id="payer-income"
              type="number"
              placeholder="$75,000"
              value={payerIncome}
              onChange={(e) => setPayerIncome(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="recipient-income">Recipient Annual Income *</Label>
            <Input
              id="recipient-income"
              type="number"
              placeholder="$35,000"
              value={recipientIncome}
              onChange={(e) => setRecipientIncome(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="marriage-duration">Marriage Duration (months) *</Label>
            <Input
              id="marriage-duration"
              type="number"
              placeholder="60"
              value={marriageDuration}
              onChange={(e) => setMarriageDuration(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="children">Number of Children</Label>
            <Select value={children} onValueChange={setChildren}>
              <SelectTrigger>
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">0</SelectItem>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="child-support">Monthly Child Support Paid</Label>
          <Input
            id="child-support"
            type="number"
            inputMode="decimal"
            placeholder="$800"
            value={childSupport}
            onChange={(e) => setChildSupport(e.target.value)}
          />
        </div>

        <div className="flex gap-3">
          <Button onClick={calculateAlimony} className="flex-1">
            Calculate Alimony
          </Button>
          <Button variant="outline" onClick={resetCalculator}>
            Reset
          </Button>
        </div>

        {estimate !== null && (
          <Card className="bg-trust-green/10 border-trust-green/20">
            <CardContent className="pt-6">
              <div id="alimony-results" className="space-y-5">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-trust-green mb-2">
                    Estimated Monthly Alimony
                  </h3>
                  <p className="text-3xl font-bold text-foreground">{money(estimate.monthly)}</p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Estimated for {estimate.selectedState}; yearly total {money(estimate.yearly)}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-background p-3">
                    <p className="text-sm text-muted-foreground">Temporary support</p>
                    <p className="font-semibold">{money(estimate.temporaryMonthly)}/mo</p>
                  </div>
                  <div className="rounded-lg bg-background p-3">
                    <p className="text-sm text-muted-foreground">Long-term support</p>
                    <p className="font-semibold">{money(estimate.longTermMonthly)}/mo</p>
                  </div>
                  <div className="rounded-lg bg-background p-3">
                    <p className="text-sm text-muted-foreground">Estimated duration</p>
                    <p className="font-semibold">{estimate.suggestedDurationMonths} months</p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button variant="outline" onClick={() => window.print()} className="flex-1">
                    <Printer className="h-4 w-4 mr-2" />
                    Print Results
                  </Button>
                  <Button variant="outline" onClick={() => window.print()} className="flex-1">
                    <FileDown className="h-4 w-4 mr-2" />
                    Save PDF
                  </Button>
                  <Button variant="outline" onClick={emailResults} className="flex-1">
                    <Mail className="h-4 w-4 mr-2" />
                    Email Results
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-yellow-800 mb-1">Important Disclaimer</p>
              <p className="text-yellow-700">
                This calculator provides estimated alimony figures based on publicly available guidelines and should not be considered legal advice.
                Actual awards depend on judicial discretion, specific evidence, and current state law.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
