"use client";
import { FaEdit } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ProfileUser } from "@/utils/types/User/profile";
import ProfileEditDataModal from "../../_modals/Edit";
import ProfileChangePasswordModal from "../../_modals/Password";
import ProfileInviteModal from "../../_modals/Invite";
import { useApp } from "@/context/AppContext";

export default function ProfileActionsSection({ user }: { user: ProfileUser }) {
  const t = useTranslations("pages.main.profile.actions");
  const [editModal, setEditModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  const [inviteModal, setInviteModal] = useState(false);
  const {openOTP} = useApp()
  return (
    <>
      <ProfileEditDataModal
        isOpen={editModal}
        onClose={() => setEditModal(false)}
        user={user}
      />
      <ProfileChangePasswordModal
        isOpen={passwordModal}
        onClose={() => setPasswordModal(false)}
      />
      <ProfileInviteModal
        isOpen={inviteModal}
        onClose={() => setInviteModal(false)}
        code={user?.invite_code}
      />
      <div className="w-full px-2.5 grid grid-cols-2 gap-2.5 text-white font-medium mt-8">
        <button onClick={() => setInviteModal(true)} className="btn bg-gradient-primary">
          {t("invite_friend")}
        </button>
        <button onClick={() => openOTP()} disabled={user?.is_subscribed} className="btn bg-gradient-primary disabled:bg-gray-600 disabled:pointer-events-none">{t("subscribe")}</button>
        <button onClick={() => setPasswordModal(true)} className="btn bg-[#282828]">{t("change_password")}</button>
        <button onClick={() => setEditModal(true)} className="btn bg-[#282828] flex-center gap-2">
          <span>
            <FaEdit size={18} />
          </span>{" "}
          {t("edit_data")}
        </button>
      </div>
    </>
  );
}
