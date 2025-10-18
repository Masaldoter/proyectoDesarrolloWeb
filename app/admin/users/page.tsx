"use client";

import Link from "next/link";
import { useAdminContext } from "@/components/admin/admin-context";
import { VerifyUserDialog } from "@/components/admin/verify-user-dialog";
import { deleteUser } from "@/lib/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
// import { SwitchUserDialog } from "@/components/admin/switch-user-dialog";

export default function AdminUsersPage() {
  const { selectedUser, isUserVerified } = useAdminContext();

  const onDelete = async () => {
    if (!selectedUser) return;
    if (!confirm(`¿Eliminar al usuario "${selectedUser.name}"? Esta acción no se puede deshacer.`)) return;
    try {
      await deleteUser(selectedUser.id);
      toast.success("Usuario eliminado");
      // Limpia selección local
      try { localStorage.removeItem("selectedAdminUser"); localStorage.removeItem("verifiedAdminUserId"); } catch {}
      // Redirige a crear o deja la página para seleccionar otro
      location.href = "/admin/users";
    } catch (e: any) {
      toast.error(e?.message || "No se pudo eliminar");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Usuarios</h1>
        <Button asChild>
          <Link href="/admin/users/new">Nuevo usuario</Link>
        </Button>
      </div>
      <div className="space-y-3">
        {selectedUser ? (
          isUserVerified ? (
            <div className="flex flex-wrap gap-3">
              {/* Editar cualquier usuario: requiere verificación si no está verificado */}
              <VerifyUserDialog>
                <Button asChild variant="secondary">
                  <Link href={`/admin/users/${selectedUser.id}`}>Editar usuario</Link>
                </Button>
              </VerifyUserDialog>
              {/* Eliminar usuario: requiere verificación si no está verificado */}
              <VerifyUserDialog>
                <Button variant="destructive" onClick={onDelete}>Eliminar usuario</Button>
              </VerifyUserDialog>
              <Button asChild>
                <Link href="/admin/users/new">Nuevo usuario</Link>
              </Button>
              {/* Botón 'Administrar otro usuario' removido a solicitud */}
            </div>
          ) : (
            <p className="text-muted-foreground">
              Verifica las credenciales del usuario seleccionado para editar su perfil. Mientras tanto, puedes dar de alta un nuevo usuario.
            </p>
          )
        ) : (
          <p className="text-muted-foreground">
            Selecciona primero un portafolio para administrar. Aun así, puedes crear un <Link className="underline" href="/admin/users/new">nuevo usuario</Link>.
          </p>
        )}
      </div>
    </div>
  );
}
