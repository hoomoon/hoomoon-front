"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Mail,
  Phone,
  Globe,
  Key,
  Shield,
  CreditCard,
  AlertTriangle,
  ChevronLeft,
  Eye,
  EyeOff,
  Check,
  Lock,
  Calendar,
  Hash,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function PerfilPage() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showPin, setShowPin] = useState(false)
  const [emailEditing, setEmailEditing] = useState(false)
  const [phoneEditing, setPhoneEditing] = useState(false)
  const [pixType, setPixType] = useState("cpf")

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center gap-2">
        <Link href="/dashboard" className="flex items-center text-muted-foreground hover:text-white">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Voltar ao Dashboard
        </Link>
      </div>

      <h1 className="mb-8 text-3xl font-bold text-white">Perfil do Usuário</h1>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Seção 1: Dados Pessoais */}
        <Card className="border border-[#66e0cc]/20 bg-[#0a0a0a] shadow-lg">
          <CardHeader className="border-b border-[#66e0cc]/10 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <User className="h-5 w-5 text-[#66e0cc]" />
              Dados Pessoais
            </CardTitle>
            <CardDescription className="text-muted-foreground">Suas informações pessoais e de contato</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Nome completo */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2 text-sm font-medium text-white">
                <User className="h-4 w-4 text-[#66e0cc]" />
                Nome completo
              </Label>
              <Input
                id="name"
                value="João Silva Oliveira"
                readOnly
                className="border-[#66e0cc]/20 bg-[#111111] text-white focus-visible:ring-[#66e0cc]"
              />
            </div>

            {/* E-mail */}
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-white">
                <Mail className="h-4 w-4 text-[#66e0cc]" />
                E-mail
              </Label>
              <div className="flex gap-2">
                <Input
                  id="email"
                  value="joao.silva@exemplo.com"
                  readOnly={!emailEditing}
                  className="border-[#66e0cc]/20 bg-[#111111] text-white focus-visible:ring-[#66e0cc]"
                />
                <Button
                  variant={emailEditing ? "default" : "outline"}
                  size="sm"
                  className={
                    emailEditing
                      ? "bg-[#66e0cc] text-black hover:bg-[#66e0cc]/80"
                      : "border-[#66e0cc]/20 text-white hover:bg-[#66e0cc]/10"
                  }
                  onClick={() => setEmailEditing(!emailEditing)}
                >
                  {emailEditing ? (
                    <>
                      <Check className="mr-1 h-4 w-4" />
                      Salvar
                    </>
                  ) : (
                    "Editar"
                  )}
                </Button>
              </div>
            </div>

            {/* Telefone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium text-white">
                <Phone className="h-4 w-4 text-[#66e0cc]" />
                Telefone
              </Label>
              <div className="flex gap-2">
                <Input
                  id="phone"
                  value="+55 (11) 98765-4321"
                  readOnly={!phoneEditing}
                  className="border-[#66e0cc]/20 bg-[#111111] text-white focus-visible:ring-[#66e0cc]"
                />
                <Button
                  variant={phoneEditing ? "default" : "outline"}
                  size="sm"
                  className={
                    phoneEditing
                      ? "bg-[#66e0cc] text-black hover:bg-[#66e0cc]/80"
                      : "border-[#66e0cc]/20 text-white hover:bg-[#66e0cc]/10"
                  }
                  onClick={() => setPhoneEditing(!phoneEditing)}
                >
                  {phoneEditing ? (
                    <>
                      <Check className="mr-1 h-4 w-4" />
                      Salvar
                    </>
                  ) : (
                    "Editar"
                  )}
                </Button>
              </div>
            </div>

            {/* País */}
            <div className="space-y-2">
              <Label htmlFor="country" className="flex items-center gap-2 text-sm font-medium text-white">
                <Globe className="h-4 w-4 text-[#66e0cc]" />
                País
              </Label>
              <Select defaultValue="brasil">
                <SelectTrigger
                  id="country"
                  className="border-[#66e0cc]/20 bg-[#111111] text-white focus:ring-[#66e0cc]"
                >
                  <SelectValue placeholder="Selecione seu país" />
                </SelectTrigger>
                <SelectContent className="border-[#66e0cc]/20 bg-[#0a0a0a] text-white">
                  <SelectGroup>
                    <SelectLabel>Países</SelectLabel>
                    <SelectItem value="brasil">🇧🇷 Brasil</SelectItem>
                    <SelectItem value="portugal">🇵🇹 Portugal</SelectItem>
                    <SelectItem value="eua">🇺🇸 Estados Unidos</SelectItem>
                    <SelectItem value="espanha">🇪🇸 Espanha</SelectItem>
                    <SelectItem value="coreia">🇰🇷 Coreia do Sul</SelectItem>
                    <SelectItem value="china">🇨🇳 China</SelectItem>
                    <SelectItem value="india">🇮🇳 Índia</SelectItem>
                    <SelectItem value="vietna">🇻🇳 Vietnã</SelectItem>
                    <SelectItem value="russia">🇷🇺 Rússia</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* ID do usuário */}
            <div className="space-y-2">
              <Label htmlFor="userId" className="flex items-center gap-2 text-sm font-medium text-white">
                <Hash className="h-4 w-4 text-[#66e0cc]" />
                ID do usuário
              </Label>
              <Input
                id="userId"
                value="HOO-78945612"
                readOnly
                className="border-[#66e0cc]/20 bg-[#111111] text-white focus-visible:ring-[#66e0cc]"
              />
            </div>

            {/* Data de cadastro */}
            <div className="space-y-2">
              <Label htmlFor="registerDate" className="flex items-center gap-2 text-sm font-medium text-white">
                <Calendar className="h-4 w-4 text-[#66e0cc]" />
                Data de cadastro
              </Label>
              <Input
                id="registerDate"
                value="15/03/2023"
                readOnly
                className="border-[#66e0cc]/20 bg-[#111111] text-white focus-visible:ring-[#66e0cc]"
              />
            </div>
          </CardContent>
        </Card>

        {/* Seção 2: Segurança */}
        <Card className="border border-[#66e0cc]/20 bg-[#0a0a0a] shadow-lg">
          <CardHeader className="border-b border-[#66e0cc]/10 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <Shield className="h-5 w-5 text-[#66e0cc]" />
              Segurança
            </CardTitle>
            <CardDescription className="text-muted-foreground">Configurações de segurança da sua conta</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
            {/* Alterar Senha */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-sm font-medium text-white">
                <Key className="h-4 w-4 text-[#66e0cc]" />
                Alterar Senha
              </Label>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Senha atual"
                    className="border-[#66e0cc]/20 bg-[#111111] pr-10 text-white focus-visible:ring-[#66e0cc]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-white"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Nova senha"
                    className="border-[#66e0cc]/20 bg-[#111111] pr-10 text-white focus-visible:ring-[#66e0cc]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-white"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirmar nova senha"
                    className="border-[#66e0cc]/20 bg-[#111111] pr-10 text-white focus-visible:ring-[#66e0cc]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>

                <Button className="w-full bg-[#66e0cc] text-black hover:bg-[#66e0cc]/80">Atualizar Senha</Button>
              </div>
            </div>

            <Separator className="my-4 bg-[#66e0cc]/10" />

            {/* Ativar 2FA */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2 text-sm font-medium text-white">
                  <Shield className="h-4 w-4 text-[#66e0cc]" />
                  Autenticação de dois fatores (2FA)
                </Label>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                        <AlertCircle className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs bg-[#0a0a0a] text-white">
                      <p>
                        A autenticação de dois fatores adiciona uma camada extra de segurança à sua conta, exigindo um
                        código gerado pelo Google Authenticator além da sua senha.
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center justify-between rounded-lg border border-[#66e0cc]/20 bg-[#111111] p-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-full bg-[#66e0cc]/10 p-2">
                    <Lock className="h-5 w-5 text-[#66e0cc]" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Google Authenticator</p>
                    <p className="text-sm text-muted-foreground">Proteja sua conta com 2FA</p>
                  </div>
                </div>
                <Button className="bg-[#66e0cc] text-black hover:bg-[#66e0cc]/80">Ativar</Button>
              </div>
            </div>

            <Separator className="my-4 bg-[#66e0cc]/10" />

            {/* Alterar chave Pix */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-sm font-medium text-white">
                <CreditCard className="h-4 w-4 text-[#66e0cc]" />
                Chave Pix
              </Label>

              <RadioGroup value={pixType} onValueChange={setPixType} className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="cpf" id="cpf" className="border-[#66e0cc] text-[#66e0cc]" />
                  <Label htmlFor="cpf" className="text-white">
                    CPF
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="email" id="email" className="border-[#66e0cc] text-[#66e0cc]" />
                  <Label htmlFor="email" className="text-white">
                    E-mail
                  </Label>
                </div>
              </RadioGroup>

              <div className="space-y-3">
                <Input
                  placeholder={pixType === "cpf" ? "123.456.789-00" : "seu.email@exemplo.com"}
                  className="border-[#66e0cc]/20 bg-[#111111] text-white focus-visible:ring-[#66e0cc]"
                />
                <Button className="w-full bg-[#66e0cc] text-black hover:bg-[#66e0cc]/80">Atualizar Chave Pix</Button>
              </div>
            </div>

            <Separator className="my-4 bg-[#66e0cc]/10" />

            {/* PIN de segurança */}
            <div className="space-y-4">
              <Label className="flex items-center gap-2 text-sm font-medium text-white">
                <Key className="h-4 w-4 text-[#66e0cc]" />
                PIN de segurança
              </Label>

              <div className="space-y-3">
                <div className="relative">
                  <Input
                    type={showPin ? "text" : "password"}
                    placeholder="PIN de 4 dígitos"
                    maxLength={4}
                    className="border-[#66e0cc]/20 bg-[#111111] pr-10 text-white focus-visible:ring-[#66e0cc]"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-white"
                    onClick={() => setShowPin(!showPin)}
                  >
                    {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
                <Button className="w-full bg-[#66e0cc] text-black hover:bg-[#66e0cc]/80">Atualizar PIN</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Seção 3: Ações */}
        <Card className="border border-[#66e0cc]/20 bg-[#0a0a0a] shadow-lg md:col-span-2">
          <CardHeader className="border-b border-[#66e0cc]/10 pb-4">
            <CardTitle className="flex items-center gap-2 text-xl font-bold">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Ações
            </CardTitle>
            <CardDescription className="text-muted-foreground">Ações críticas relacionadas à sua conta</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col items-center justify-between gap-4 rounded-lg border border-red-500/20 bg-red-500/5 p-6 sm:flex-row">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-red-500/10 p-2">
                  <AlertTriangle className="h-6 w-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Exclusão de conta</h3>
                  <p className="text-sm text-muted-foreground">
                    Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
                  </p>
                </div>
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="shrink-0">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Solicitar exclusão
                  </Button>
                </DialogTrigger>
                <DialogContent className="border-red-500/20 bg-[#0a0a0a] text-white sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-red-500">Confirmar exclusão de conta</DialogTitle>
                    <DialogDescription className="text-muted-foreground">
                      Esta ação é irreversível. Todos os seus dados serão permanentemente excluídos.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center gap-4 rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                      <AlertTriangle className="h-6 w-6 text-red-500" />
                      <p className="text-sm">Digite "EXCLUIR" para confirmar a exclusão da sua conta.</p>
                    </div>
                    <Input
                      placeholder="Digite EXCLUIR"
                      className="border-red-500/20 bg-[#111111] text-white focus-visible:ring-red-500"
                    />
                  </div>
                  <DialogFooter>
                    <Button variant="ghost" className="text-white hover:bg-[#111111]">
                      Cancelar
                    </Button>
                    <Button variant="destructive">Confirmar exclusão</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
